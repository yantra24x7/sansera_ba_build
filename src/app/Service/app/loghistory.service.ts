import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LogService { 
    pageNo: any;
 
  constructor(private http:HttpClient,) { }
  getlog(id,pageNo):Observable<any>{
    return this.http.get('log_activity?id='+id+'&&page='+pageNo+'&&per_page='+10 )
 } 
}
