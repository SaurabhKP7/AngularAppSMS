import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { FeeService } from '../fee.service';
import { StudentService } from '../student.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public studentAPI : StudentService,
    public teacherAPI : TeacherService,
    public courseAPI : CourseService,
    public feeAPI : FeeService,
    public router : Router
  ) { }

  ngOnInit(): void {
    
    this.getTeachers();
    this.getFees();
    this.getCourses();
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
    course : {
      courseId : ''
    }
  }

  public courseForModal : any = [];

  public teachers : any = []; //Teacher List
  public students : any = []; //Teacher List
  public courses : any = []; //Teacher List
  public fees : any = []; //Teacher List

  valueToModal(course : any) {
    this.courseForModal = course;
    console.log("Course :" + this.courseForModal);
  }

  getTeachers() {
    this.teacherAPI.getTeachers().subscribe(data => this.teachers = data);
    console.log("Teachers :" + this.teachers);
  }

  getFees(){
    this.feeAPI.getFees().subscribe(data => this.fees = data);
    console.log("Fees :" + this.fees);

  }

  getCourses(){
    this.courseAPI.getCourses().subscribe(data => this.courses = data);
    console.log("Courses :" + this.courses);

  }

  public countDownDate = new Date("June 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
  public x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = this.countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(this.x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);


}
