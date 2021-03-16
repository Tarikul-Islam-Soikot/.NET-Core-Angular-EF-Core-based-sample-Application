import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';
import { ApiService, PubSubService } from '../app.api.service';
import { NotificationService } from '../app.notification.service';
import { PostDto } from '../home/Response';
import { SelectableSettings } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-demo-picker',
  templateUrl: './demo-picker.component.html',
})

export class DemoPickerComponent implements OnInit {

  public _getAllPostSubscriber$: Subscription;
  subscribers: any = {};
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  taggedSelection: number[] = [];

  public postList: PostDto[];
  public selectedPosts: PostDto[];
  @Output() myOutput: EventEmitter<PostDto[]> = new EventEmitter();
  public checkboxOnly = false;
  public selectableSettings: SelectableSettings;

  constructor(public apiService: ApiService,
    public notificationService: NotificationService,
    public pubService: PubSubService) {

    this.setSelectableSettings();
  }

  ngOnInit() {

    this.search();
  }

  public setSelectableSettings(): void {

    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: 'single',
    };
  }

  public search(): void {

      this.subscribers.getAllPost
        = this.apiService.httpGet<PostDto[]>('Post/GetAllPost')
          .subscribe(
            (x) => { this.postList = x; },
            (error) => {
              this.notificationService.showError(error);
              console.log(error);
            },
            () => {
              if (this.postList !== null && this.postList !== undefined)
                this.loadGrid();
            });
  }

  public loadGrid(): void {
    this.gridView = {
      data: this.postList.slice(this.skip, this.skip + this.pageSize),
      total: this.postList.length
    };
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGrid();
  }

  OnSelectClick(): void {
    this.selectedPosts = [];

    if (this.taggedSelection.length > 0) {
      this.taggedSelection.forEach(item => {
        this.selectedPosts.push(this.postList.find(x => x.postID == item));
      })
    }

    this.myOutput.emit(this.selectedPosts);
    this.pubService.publish('demo-picker');
  }

  OnCancelClick(): void {

    this.selectedPosts = undefined;
    this.pubService.publish('demo-picker');
  }
}
