import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportIldeService {

  constructor(private http:HttpClient) { }

  getmachines():Observable<any>{
    return this.http.get('machine_list')
 }
 getshift(data):Observable<any>{
  return this.http.get('shifts?module=' +data)
}
 getmodule():Observable<any>{
  return this.http.get('module_filters')
} 
line(data):Observable<any>{
  return this.http.get('report_filters?line=' +data)
}
 overall_report(register):Observable<any>{
   return this.http.get('idle_reports?machine=' + register.machine +'&&module='+ register.module +'&&shift=' +register.shift +'&&date='+ register.date )
 }
 first_page_loading():Observable<any>{
   return this.http.get('previous_shift')
 }
 Idle_chart(chart):Observable<any>{
  return this.http.get('idle_report_chart?machine=' + chart.machine +'&&module='+ chart.module +'&&shift=' +chart.shift +'&&date='+ chart.date )
}
  
}
