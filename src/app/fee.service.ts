import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  private BASE_URL : string = "http://localhost:8080/SMSProjSpringMVC";
  private SERVICE_URL : string = "/fee";
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


  getFees() : Observable<any> {
    return  this.http.get<any>(this.BASE_URL + this.SERVICE_URL + this.GET_URL);
  }

  getFee(feeId: any) : Observable<any> {
    return this.http.get<any>(this.BASE_URL + this.SERVICE_URL+this.SEARCH_URL+feeId);
  }

  addFee(fee : any) : Observable<any> {
    return this.http.post<any>(this.BASE_URL + this.SERVICE_URL + this.ADD_URL, JSON.stringify(fee), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }

  updateFee(fee : any) : Observable<any> {
    return this.http.put<any>(this.BASE_URL + this.SERVICE_URL + this.UPDATE_URL, JSON.stringify(fee), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }

  deleteFee(id : any) : Observable<any> {
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
