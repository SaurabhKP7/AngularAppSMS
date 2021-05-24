import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { FeeService } from '../fee.service';
import { StudentService } from '../student.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-studentpage',
  templateUrl: './studentpage.component.html',
  styleUrls: ['./studentpage.component.css']
})
export class StudentpageComponent implements OnInit {

  public studentId : any;
  public teacherId : any;
  public courseId : any;
  public feeId : any;

  public student : any = {};
  public teacher : any = {};
  public course : any = {};
  public fee : any = {};

  public key : any = [];

  constructor(
    public studentAPI : StudentService,
    public teacherAPI : TeacherService,
    public courseAPI : CourseService,
    public feeAPI : FeeService,
    public router : Router,
    public aroute : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.studentId = this.aroute.snapshot.params['sid'];
    this.teacherId = this.aroute.snapshot.params['tid'];
    this.courseId = this.aroute.snapshot.params['cid'];
    this.feeId = this.aroute.snapshot.params['fid'];

    this.getStudent();
    this.getTeacher();
    this.getCourse();
    this.getFee();
  }

  logout() {
    if(window.confirm('Are you sure you want to Logout?')){
      this.router.navigate(["app-home"]);
    }
  }


  updateStudent() {
    this.studentAPI.updateStudent(this.student).subscribe();
    window.location.reload();
  }

  getStudent() {
    this.studentAPI.getStudent(this.studentId).subscribe((data: {}) => {

      this.student = data[0];
  });
  }

  getCourse() {
    this.courseAPI.getCourse(this.courseId).subscribe((data: {}) => {

      this.course = data[0];
  });
  }
  getTeacher() {
    this.teacherAPI.getTeacher(this.teacherId).subscribe((data: {}) => {

      this.teacher = data[0];
  });
  }
  getFee() {
    this.feeAPI.getFee(this.feeId).subscribe((data: {}) => {

      this.fee = data[0];
  });
  }

}
