import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private http:HttpClient) { }


  alarm_history(pageNo,search):Observable<any> {
    return this.http.get('alarm_histories?page='+pageNo+'&&per_page='+20 + '&&search=' + search);
  }
  alarm_historyl(pageNo):Observable<any> {
    return this.http.get('alarm_histories?page='+pageNo+'&&per_page='+20 );
  }

  alarm_history4():Observable<any> {
    return this.http.get('alarm_histories');
  }

  god():Observable<any>{
    return this.http.get('kpy_dashboard')

}
}

// ?page=' +pageNo+'&&per_page='+20