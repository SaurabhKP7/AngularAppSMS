import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { HomeComponent } from './home/home.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { StudentpageComponent } from './studentpage/studentpage.component';
import { StudentregisterComponent } from './studentregister/studentregister.component';

const routes: Routes = [
  {path: '', redirectTo: '/app-home', pathMatch: 'full'},
  { path : "app-home", component : HomeComponent},
  { path : "app-studentlogin", component : StudentloginComponent},
  { path : "app-adminlogin", component : AdminloginComponent},
  { path : "app-adminpage", component : AdminpageComponent},
  { path : "app-studentpage", component : StudentpageComponent},
  { path : "app-studentpage/:id", component : StudentpageComponent},
  { path : "app-studentregister", component : StudentregisterComponent},
  { path : "app-studentregister/:id", component : StudentregisterComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
