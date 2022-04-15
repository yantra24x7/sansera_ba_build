import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }


  getmachines():Observable<any>{
     return this.http.get('machine_list')
  }
  line(data):Observable<any>{
  return this.http.get('report_filters?line=' +data)
}
get_rreport(id):Observable<any>{
  return this.http.get('re_route_cards?id=' +id)
}

put_rreport(data: any):Observable<any> {
  return this.http.put('re_reports',data);
}



// user_put(data: any, id: any):Observable<any> {
//   return this.http.put('users/' + id, data);
// }
// http://3.7.120.8:3000//api/v1/re_route_cards?id=6080e7545ba6f005abd7f006


//http://3.7.120.8:3000//api/v1/operator_filters?machine_name=VALVE-C63&&shift_num=all&&from_date=04/16/2021-04/16/2021
// http://3.7.120.8:3000//api/v1/report_filters?line=ELECTRICAL
// Line and machine filtere
  getmodule():Observable<any>{
    return this.http.get('module_filters')
 }

 operat(register):Observable<any>{
   return this.http.get('operator_filters?machine_name=' + register.machine_name +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date)
 }
  getshift(data):Observable<any>{
    return this.http.get('shifts?module=' +data)
  }
  getshifteff():Observable<any>{
    return this.http.get('shifts')
  }
  overall_report(register):Observable<any>{
    return this.http.get('overall_report?machine_name=' + register.machine_name +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date + '&&select_type=' + register.type)
  }
  first_page_loading():Observable<any>{
    return this.http.get('previous_shift')
  }
  overallll_report(register):Observable<any>{
    return this.http.get('overall_report?machine_name=' + register.machine_name +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.from_date )
  }
  overall_report_ing(register):Observable<any>{
    return this.http.get('overall_report?machine_name=' + register.machine_name +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date )
  }
  overallls_report(register):Observable<any>{
    return this.http.get('overall_report?machine_name=' + register.machine_name +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date + '&&select_type=' + 'Shiftwise')
  }
  overall_report_op(register):Observable<any>{
    return this.http.get('overall_report?machine_name=' + register.machine_name +'&&module='+ register.module +'&&shift_num=' +register.shift_num +'&&from_date='+ register.date + '&&select_type=' + register.type + '&&operator_id=' + register.operator)
  }
  alarmoverall_report(register):Observable<any>{
    return this.http.post('alarm_reports',register)
  }

}


