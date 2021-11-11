import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OeeService {

  constructor(private http:HttpClient) { }

  oee():Observable<any>{
    return this.http.get('oee_calculations')

  }
  operator():Observable<any>{
    return this.http.get('operator_list')
  }
  component():Observable<any>{
    return this.http.get('component_list')
  }
  componentById(id):Observable<any>{
    return this.http.get('components/'+id)
  }
 //machines():Observable<any>{
 //return this.http.get('machine_list')
 //}
 shift():Observable<any>{
 return this.http.get('shifts')
 }
 user_delete(id:any):Observable<any>{
 return this.http.delete('oee_calculations/'+id)
 }
 valuepost(val):Observable<any>{
 return this.http.post('oee_calculations',val)
 }
 machines():Observable<any>{
  return this.http.get('oee_machine_list')
  }

  shift_put(data: any, id: any):Observable<any> {
    return this.http.put('oee_calculations/' + id, data);
  } 

}