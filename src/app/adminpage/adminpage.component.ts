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

  myDate : any = new Date();
  constructor(
    public studentAPI : StudentService,
    public teacherAPI : TeacherService,
    public courseAPI : CourseService,
    public feeAPI : FeeService,
    public router : Router
  ) { }

  ngOnInit(): void {

  }

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

  @Input()
  studentDetails = {
    firstname : '',
    lastname : '',
    age : '',
    gender : '',
    phone : '',
    email : '',
    password : '',
    registerDate : '',
    course : {
      courseId : ''
    }
  }

  @Input()
  feeDetails = {
    feeAmount : '',
    paymentMode : ''
  }

  @Input()
  courseDetails = {
    courseName : '',
    course_duration_months : '',
    fee : {
      feeId : ''
    },
    teacher : {
      teacherId : ''
    }
  }


  public teachers : any = []; //Teacher List
  public students : any = []; //Teacher List
  public courses : any = []; //Teacher List
  public fees : any = []; //Teacher List

  public teacher : any  = {};
  public student : any  = {};
  public course : any  = {};
  public fee : any  = {};

  logout() {
    if(window.confirm('Are you sure you want to Logout?')){
      this.router.navigate(["app-home"]);
    }
  }

  validateStudent() {
    var course = this.studentDetails.course.courseId;
    if(course==""){
      alert("Please select a Course");
      return false;
    }
    else{
      return true;
    }

  }

  addTeacher() {
    // document.getElementById("listTeacherModal").classList.add("show");
    // alert("Teacher added!!!");
    // document.getElementById("openTeacherList").click();
    if(window.confirm('Are you sure, you want to Add Teacher?')){
      this.teacherAPI.addTeacher(this.teacherDetails).subscribe();
      this.getTeachers();
      document.getElementById("openTeacherList").click();
    }
  }
  getTeachers() {
    this.teacherAPI.getTeachers().subscribe(data => this.teachers = data);
    console.log("Teachers :" + this.teachers);
  }

  getTeacher(teacherId : any) {
    this.teacherAPI.getTeacher(teacherId).subscribe((data: {}) => {
      this.teacher = data[0];
      console.log("Teacher Record :"+this.teacher);
    });
  }

  updateTeacher() {
    console.log("Teacher : " +this.teacher);
    this.teacherAPI.updateTeacher(this.teacher).subscribe();

    document.getElementById("openTeacherList").click();
  }

  deleteTeacher(teacherId : any) {
    if(window.confirm('Are you sure, you want to delete?')){
      this.teacherAPI.deleteTeacher(teacherId).subscribe()
    }

    this.getTeachers();
    document.getElementById("openTeacherList").click();
  }

  //student

  addStudent() {
  
    if(this.validateStudent()){
      if(window.confirm('Are you sure, you want to add student?')){
        this.studentAPI.addStudent(this.studentDetails).subscribe();
        this.getStudents();
        document.getElementById("openStudentList").click();
      }
    }
  }

  getStudents(){
    this.studentAPI.getStudents().subscribe(data => this.students = data);
  }

  getStudent(studentId:any){
    this.studentAPI.getStudent(studentId).subscribe((data: {}) => {
        this.student = data[0];
        console.log(this.student);
    });
  }

  updateStudent(){
    this.studentAPI.updateStudent(this.student).subscribe();

    document.getElementById("openStudentList").click();
  }

  deleteStudent(studentId : any) {
    if(window.confirm('Are you sure, you want to delete?')){
        this.studentAPI.deleteStudent(studentId).subscribe()
        document.getElementById("openStudentList").click();
      }

    this.getStudents();
    document.getElementById("openStudentList").click();
  }

  // fee

  addFee() {
    if(window.confirm('Are you sure, you want to Add Fee?')){
      this.feeAPI.addFee(this.feeDetails).subscribe();
      this.getFees();
      document.getElementById("openFeeList").click();
    }
  }

  getFees(){
    this.feeAPI.getFees().subscribe(data => this.fees = data);
  }

  getFee(feeId:any){
    this.feeAPI.getFee(feeId).subscribe((data: {}) => {
        this.fee = data[0];
    });
  }

  updateFee(){
    this.feeAPI.updateFee(this.fee).subscribe();

    document.getElementById("openFeeList").click();
  }

  deleteFee(feeId : any) {
    if(window.confirm('Are you sure, you want to delete?')){
        this.feeAPI.deleteFee(feeId).subscribe()
        document.getElementById("openFeeList").click();
      }

    this.getFees();
    document.getElementById("openFeeList").click();
  }


  // course

  addCourse() {
    
    if(window.confirm('Are you sure, you want to Add Fee?')){
      this.courseAPI.addCourse(this.courseDetails).subscribe();
      this.getCourses();
      document.getElementById("openCourseList").click();
    }

  }

  getCourses(){
    this.courseAPI.getCourses().subscribe(data => this.courses = data);
  }

  getCourse(courseId : any){
    this.courseAPI.getCourse(courseId).subscribe((data: {}) => {
        this.course = data[0];
    });
  }

  updateCourse(){
    this.courseAPI.updateCourse(this.course).subscribe();

    document.getElementById("openCourseList").click();
  }

  deleteCourse(courseId : any) {
    if(window.confirm('Are you sure, you want to delete?')){
        this.courseAPI.deleteCourse(courseId).subscribe()
        document.getElementById("openCourseList").click();
      }

    this.getCourses();
    document.getElementById("openCourseList").click();
  }

 

  

}
