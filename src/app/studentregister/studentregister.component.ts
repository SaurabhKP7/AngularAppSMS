import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { FeeService } from '../fee.service';
import { StudentService } from '../student.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-studentregister',
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.css']
})
export class StudentregisterComponent implements OnInit {

  public courseId : any;
  constructor(
    public studentAPI : StudentService,
    public teacherAPI : TeacherService,
    public courseAPI : CourseService,
    public feeAPI : FeeService,
    public router : Router,
    public aroute : ActivatedRoute
  ) { }

  ngOnInit(): void {
   this.courseId = this.aroute.snapshot.params['id'];
   
    this.getTeachers();
    this.getFees();
    this.getCourses();
    this.getCourse();

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

  public teachers : any = []; //Teacher List
  public students : any = []; //Teacher List
  public courses : any = []; //Teacher List
  public fees : any = []; //Teacher List

  public course : any = {};

  addStudent() {
    
    if(window.confirm('Are you sure, you want to add student?')){
      this.studentAPI.addStudent(this.studentDetails).subscribe();
      alert(this.studentDetails.firstname + " " + this.studentDetails.lastname + " Added Successfully");
      this.router.navigate(["app-studentlogin"]);
    }
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

  getCourse(){


    this.courseAPI.getCourse(this.courseId).subscribe((data: {}) => {

        this.course = data[0];
        console.log("Data"+data);
    });
  }

}
