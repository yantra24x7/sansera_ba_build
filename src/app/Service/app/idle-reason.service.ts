import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class IdleReasonService { 
    pageNo: any;
 
  constructor(private http:HttpClient,) { }
  getmodule():Observable<any>{
    return this.http.get('module_filters')
 }
 line(data):Observable<any>{
  return this.http.get('report_filters?line=' +data)
}

  getmachines():Observable<any>{
    return this.http.get('machine_list')
 }
 getshift(data):Observable<any>{
  return this.http.get('shifts?module=' +data)
}
 overall_report(register):Observable<any>{ 

 
   return this.http.get('overall_report?machine_name=' + register.machine_name  +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date)
 }
 first_page_loading():Observable<any>{
   return this.http.get('previous_shift')
 }

  
}
