import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
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

  myDate : any = new Date();
  
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
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//  }

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
  public courses : Array<any> = []; //Teacher List
  public fees : any = []; //Teacher List

  startTimer() {
    console.log("hii")
    this.subscription = interval(1000)
    .subscribe(x => { this.getTimeDifference(); });
  }
 


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

    // this.courses.forEach(c => {
    //   if(c.fee.feeAmount == 0) {
    //     delete this.courses[c];
    //   }
      
    // });

  }

  private subscription: Subscription;
  
  public dateNow = new Date();
  public dDay = new Date('May 28 2021 09:19:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public isVisible : boolean = true;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;


  private getTimeDifference () {
      this.timeDifference = this.dDay.getTime() - new  Date().getTime();
      if(this.timeDifference == 0) {
        this.isVisible = false;
        
        this.subscription.unsubscribe();
        this.updateFeeWhereZero();
        // window.location.reload();
        this.ngOnInit();
      }
      this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference) {
      this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
      this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
      this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
      this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  updateFeeWhereZero() {
    this.feeAPI.updateFeeZero().subscribe();
    // window.location.reload();
  }

 

}
