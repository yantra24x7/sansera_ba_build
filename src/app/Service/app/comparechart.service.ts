import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComparechartService {

  constructor(private http: HttpClient) {

    
   }
   line(data):Observable<any>{
    return this.http.get('report_filters?line=' +data)
  }

  line_rigt(data):Observable<any>{
    return this.http.get('report_filters?line=' +data)
  }
  operat(register):Observable<any>{
    return this.http.get('operator_filters?machine_name=' + register.machine_name +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date)
  }
  operating(register):Observable<any>{
    return this.http.get('operator_filters?machine_name=' + register.machine_name +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date)
  }
   getmodule():Observable<any>{
    return this.http.get('module_filters')
 }
 moduleget():Observable<any>{
  return this.http.get('module_filters')
}

   getmachines():Observable<any>{
    return this.http.get('machine_list')
 }
 getshift(data):Observable<any>{
  return this.http.get('shifts?module=' +data)
}
 machine_get():Observable<any>{
   return this.http.get('machine_list')
 }
 
 shift_get(data):Observable<any>{
  return this.http.get('shifts?module=' +data)
}
 overall_compare(register):Observable<any>{
  return this.http.get('compare_report?machine_name=' + register.machine_name +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date + '&&select_type=' + register.type)
}
overall_compare1(register):Observable<any>{
  return this.http.get('compare_report?machine_name=' + register.machine_name +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date + '&&select_type=' + register.type + '&&operator_id=' + register.operator)
}
overall_compare2(register):Observable<any>{
  return this.http.get('compare_report?machine_name=' + register.machine_name +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date + '&&select_type=' + 'Shiftwise' )
}
compare_chart(value):Observable<any>{
  return this.http.get('compare_report?machine_name=' + value.machine_name +'&&module='+ value.module +'&&shift_num=' +value.shift_num +'&&from_date='+ value.date + '&&select_type=' + value.type)
}
compare_chart1(value):Observable<any>{
  return this.http.get('compare_report?machine_name=' + value.machine_name +'&&module='+ value.module  +'&&shift_num=' +value.shift_num +'&&from_date='+ value.date + '&&select_type=' + value.type + '&&operator_id=' + value.operator)
}
compare_chart2(value):Observable<any>{
  return this.http.get('compare_report?machine_name=' + value.machine_name +'&&module='+ value.module +'&&shift_num=' +value.shift_num +'&&from_date='+ value.date + '&&select_type=' + 'Shiftwise')
}
first_page_loading():Observable<any>{
  return this.http.get('previous_shift')
}
right_first_page_loading():Observable<any>{
  return this.http.get('previous_shift')
}
}
// 192.168.0.237:4000/api/v1/compare_report?from_date=20-2-2020&&to_date=28-2-2020&&machine_name=machine2&&shift_num=2