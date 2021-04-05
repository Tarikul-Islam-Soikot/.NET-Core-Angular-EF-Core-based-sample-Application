import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentList',
  templateUrl: './studentList.component.html',
  styleUrls: ['./studentList.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public navigateToChildren(): void {
    this.router.navigate(["students/student"]);
  }
}
