import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
  user_create(data: any):Observable<any> {
    return this.http.post('user_signup', data);
  }
  user_get(pageNo): Observable<any> { 
    return this.http.get('users?page='+pageNo+'&&per_page='+10 );
  }
  user_put(data: any, id: any):Observable<any> {
    return this.http.put('users/' + id, data);
  }
  user_delete(id: any) {
    return this.http.delete('users/' + id);
  }
  role_get(): Observable<any> {
    return this.http.get('roles');
  }
}
