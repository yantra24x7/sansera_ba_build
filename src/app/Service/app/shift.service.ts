import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http: HttpClient) { }

  shift_create(data: any):Observable<any> {
    return this.http.post('shifts', data);
  }
  shift_get(): Observable<any> {
    return this.http.get('shifts');
  }
  shift_put(data: any, id: any):Observable<any> {
    return this.http.put('shifts/' + id, data);
  }
  shift_delete(id: any) {
    return this.http.delete('shifts/' + id);
  }

  getmodule():Observable<any>{
    return this.http.get('module_filters')
 }
}
