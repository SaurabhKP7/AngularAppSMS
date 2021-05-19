import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private BASE_URL : string = "http://localhost:8080/SMSProjSpringMVC";
  private SERVICE_URL : string = "/teacher";
  private GET_URL : string = "/getlist";
  private UPDATE_URL : string = "/update";
  private DELETE_URL : string = "/delete/";
  private SEARCH_URL : string = "/getrecord/";
  private ADD_URL : string = "/insert";

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  constructor(private http : HttpClient) { }


  getTeachers() : Observable<any> {
    return  this.http.get<any>(this.BASE_URL + this.SERVICE_URL + this.GET_URL);
  }

  getTeacher(teacherId: any) : Observable<any> {
    return this.http.get<any>(this.BASE_URL + this.SERVICE_URL + this.SEARCH_URL + teacherId);
  }

  addTeacher(teacher : any) : Observable<any> {
    return this.http.post<any>(this.BASE_URL + this.SERVICE_URL + this.ADD_URL, JSON.stringify(teacher), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }

  updateTeacher(teacher : any) : Observable<any> {
    return this.http.put<any>(this.BASE_URL + this.SERVICE_URL + this.UPDATE_URL, JSON.parse(JSON.stringify(teacher)), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }

  deleteTeacher(id : any) : Observable<any> {
    return this.http.delete<any>(this.BASE_URL + this.SERVICE_URL + this.DELETE_URL + id, this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code : ${error.status} \n  Error Message : ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);

  }
}
