import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {

  constructor(
    public studentAPI : StudentService,
    public router : Router
  ) { }

  ngOnInit(): void {
  }

  public email : any;
  public password : any;
  public studentData : any = {};

  validateStudent() {
    this.studentAPI.validateStudent(this.email, this.password).subscribe((data: {}) => {
       this.studentData = data;
       console.log("StudentData :" + this.studentData);

       if(this.studentData == null) {
        alert("Please Enter Correct Credentials!!!!!!!!");
        this.router.navigate(["app-studentlogin"]);
      }
      else{
        this.router.navigate([
          "app-studentpage",
           this.studentData.studentId,
           this.studentData.course.courseId, 
           this.studentData.course.teacher.teacherId,
           this.studentData.course.fee.feeId]);
      }
      });

   
  }

}
