import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
  pageNo: any;

  constructor(private http: HttpClient) { }

  operator_create(data: any):Observable<any> {
    return this.http.post('operators', data);
  }
  operator_get(pageNo): Observable<any> {
    return this.http.get('operators?page='+pageNo+'&&per_page='+10);
  }
  operator_put(data: any, id: any):Observable<any> {
    return this.http.put('operators/' + id, data);
  }
  operator_delete(id: any) {
    return this.http.delete('operators/' + id);
  }
  

  component_create(data: any):Observable<any> {
    return this.http.post('components', data);
  }
  component_get(): Observable<any> {
    return this.http.get('components');
  }
  component_put(data: any, id: any):Observable<any> {
    return this.http.put('components/' + id, data);
  }
  component_delete(id: any) {
    return this.http.delete('components/' + id);
  }
  

}
