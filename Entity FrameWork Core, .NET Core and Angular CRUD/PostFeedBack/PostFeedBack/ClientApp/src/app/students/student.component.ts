import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app.api.service';
import { NotificationService } from '../app.notification.service';
import { Email } from '../basic.classes/email';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public email: Email;
  constructor(public apiService: ApiService,
    public notificationService: NotificationService) { }

  ngOnInit() {
    this.email = new Email();
    this.email.from = "tarikulsoikot@gmail.com";
    this.email.to = "md.tarikul@brainstation23.com; tarikulsoikot@gmail.com";
    this.email.subject = "Hi";
    this.email.body = "Hello,\nTest Purpose"
  }

  Send() {
    console.log(this.email);

    this.apiService.httpPost<any>('Email/SentMail', this.email)
      .subscribe((response) => { console.log(response); },
        (error) => {
          this.notificationService.showError(error);
          console.log(error);
        },
        () => {
        });
  }

}
