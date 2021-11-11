import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }

  
  machine_get(): Observable<any> {
    return this.http.get('machines');
  }
  lines(data): Observable<any> {
    console.log(data)
    return this.http.post('machine_update', data);
  }
  getsetting(machine):Observable<any> {
    return this.http.get('notification_setting?machine=' + machine);
  }

  m_get_sett(machines):Observable<any> {
    return this.http.get('machine_sig_setting?L1Name=' + machines);
  }

  updateNotification(data): Observable<any> {
    return this.http.put('update_notification', data);
  }

  addNotification(data): Observable<any> {
    return this.http.post('add_notification_settings', data);
  }

  statusUpdate(params):Observable<any> {
    return this.http.get('change_status',params);
  }
  add_m_set_ing(datass): Observable<any> {
    return this.http.post('custome_sig_setting', datass);
  }
  man_get_sett(datassi): Observable<any> {
    return this.http.get('machine_setting_list?L1Name=' + datassi);
  }
  update_spindle(id: any,data: any, ):Observable<any> {
    return this.http.put('edit_settings?id=' + id, data);
  }
  update_axis(id: any,data1: any, ):Observable<any> {
    return this.http.put('edit_settings?id=' + id, data1);
  }
  update_macro_axis(ids: any,datap: any, ):Observable<any> {
    return this.http.put('edit_settings?id=' + ids, datap);
  }
}
