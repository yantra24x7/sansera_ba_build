import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  
  getmachines():Observable<any> {
    return this.http.get('get_machine_status2')
  }
  machine_count():Observable<any> {
    return this.http.get('machine_count')
  }
  // getmachines1(live):Observable<any> {
  //   return this.http.get('get_machine_status2?live=' + live)
  // }
  getshift():Observable<any>{
    return this.http.get('shifts')
  }

  getshift2(date,shift):Observable<any>{
    return this.http.get('prev_dashboards?date=' + date + '&&shift_no=' + shift )
  }

  // http://3.7.120.8:3000/api/v1/prev_dashboards?date=02-08-2021&shift_no=3
  getmachines1(register):Observable<any>{
    return this.http.get('get_machine_status2?live=' + register)
  }
  andon():Observable<any>{
    return this.http.get('r_get_status')
  }
  form_line(line):Observable<any>{
    return this.http.get('line_wise_dashboards?line=' + line)
  }
  pie(line,name):Observable<any>{
    return this.http.get('live_machine_detail?line=' + line + '&&machine=' + name )
  }
}



