import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class ProductionService {

  constructor(private http:HttpClient) { }
  pageNo: any;
 
  namakkal(machine,pageNo):Observable<any>{
  return this.http.get('live_production_part?machine=' + machine +'&&page='+pageNo+'&&per_page='+10)
  }
 
  syncing(machine):Observable<any>{
    return this.http.get('sync_production_parts?machine_name=' + machine)
    }
  getmachines():Observable<any>{
    return this.http.get('tab_machine_list')
 }
 getshift():Observable<any>{
   return this.http.get('tab_shift_list')
 }
 overall_report(register,pageNo):Observable<any>{
   return this.http.get('live_production_part?machine=' + register.machine +'&&shift_num=' +register.shift_num +'&&date='+ register.date +'&&status='+ register.status +'&&page='+pageNo+'&&per_page='+10 )
 }
 accept(data){
   return this.http.put('production_results_remarks',data)
   
 }
 reject(data):Observable<any>{
  return this.http.put('production_results_remarks',data)
  
}
reject1(data):Observable<any>{
  return this.http.put('production_results_remarks',data)
}
accept1(data){
  return this.http.put('production_results_remarks',data)
  
}

//  first_page_loading():Observable<any>{
//   return this.http.get('previous_shift')
// }
}
