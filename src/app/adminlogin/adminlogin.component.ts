import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  emailID : any ;
  pass : any;

  email : any = "saurabh@gmail.com";
  password : any ="saurabh"

  adminlogin() {
    if(this.emailID == this.email && this.pass == this.password ) {
      this.router.navigate(["app-adminpage"]);
    }
    else {
      alert("Please enter Valid Credentials!!!!");
    }
  }

}
