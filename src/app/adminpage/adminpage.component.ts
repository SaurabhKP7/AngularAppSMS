import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $ } from 'protractor';
import { delay } from 'rxjs/operators';
import { CourseService } from '../course.service';
import { FeeService } from '../fee.service';
import { StudentService } from '../student.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(
    public studentAPI : StudentService,
    public teacherAPI : TeacherService,
    public courseAPI : CourseService,
    public feeAPI : FeeService,
    public router : Router
  ) { }

  @Input()
  teacherDetails = {
    firstname : '',
    lastname : '',
    age : '',
    gender : '',
    phone : '',
    email : '',
    password : ''
  }


  public teachers : any = []; //Teacher List

  public teacher : any  = {};

  addTeacher() {
    this.teacherAPI.addTeacher(this.teacherDetails).subscribe();
    // document.getElementById("listTeacherModal").classList.add("show");
    document.getElementById("openTeacherList").click();
  }
  getTeachers() {
    this.teacherAPI.getTeachers().subscribe(data => this.teachers = data);
    console.log("Teachers :" + this.teachers);
  }

  getTeacher(teacherId : any) {
    this.teacherAPI.getTeacher(teacherId).subscribe((data: {}) => {
      this.teacher = data;
      console.log(data);
    });
  }

  updateTeacher() {
    console.log("Teacher : " +this.teacher);
    this.teacherAPI.updateTeacher(this.teacher).subscribe();

    document.getElementById("openTeacherList").click();
  }

  deleteTeacher(teacherId : any) {
    this.teacherAPI.deleteTeacher(teacherId).subscribe();
    
    document.getElementById("openTeacherList").click();
  }

  ngOnInit(): void {
  }

  

}
