import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OverallchartService {

  constructor(private http: HttpClient) { }


  getmachines():Observable<any>{
    return this.http.get('machine_list')
 }
 getshift():Observable<any>{
   return this.http.get('shifts')
 }
 get_overall_chart(register):Observable<any>{
  return this.http.get('overall_chart?machine_name=' + register.machine_name +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date)
}
first_page_loading():Observable<any>{
  return this.http.get('previous_shift')
}
}

// 192.168.0.237:4000/api/v1/overall_chart?from_date=20-2-2020&&to_date=28-2-2020&&machine_name=machine2&&shift_num=2