import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-studentpage',
  templateUrl: './studentpage.component.html',
  styleUrls: ['./studentpage.component.css']
})
export class StudentpageComponent implements OnInit {

  public studentId : any;
  public student : any = {};
  constructor(
    public studentAPI : StudentService,
    public router : Router,
    public aroute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.studentId = this.aroute.snapshot.params['id'];
    this.getStudent();

  }

  getStudent() {
    this.studentAPI.getStudent(this.studentId).subscribe((data: {}) => {

      this.student = data[0];
      console.log("Data : "+this.student.firstname);
  });
  }

}
