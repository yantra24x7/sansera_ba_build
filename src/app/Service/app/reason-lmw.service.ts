import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReasonLmwService {

  constructor(private http:HttpClient) { }

  idle_reason():Observable<any>{
    return this.http.get('idle_reasons')
  }
  post_api(val):Observable<any>{
    return this.http.post('idle_reasons',val)
  }
  put_api( id: any,data: any):Observable<any>{
    return this.http.put('idle_reasons/'+id,data)
  }
  delete_reason(id:any):Observable<any>{
    return this.http.delete('idle_reasons/'+id)
  }
}
