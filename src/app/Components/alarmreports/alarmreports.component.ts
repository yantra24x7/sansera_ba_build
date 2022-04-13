import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { NavbarService } from 'src/app/Nav/navbar.service';
import { ReportService } from 'src/app/Service/app/report.service';

@Component({
  selector: 'app-alarmreports',
  templateUrl: './alarmreports.component.html',
  styleUrls: ['./alarmreports.component.scss']
})
export class AlarmreportsComponent implements OnInit {
  login: FormGroup;
  rolename: string;
  myLoader: boolean=false;
  module_response: any;
  mac_response: any;
  shift_response: any;
  first_loading: any;
  dat1: any;
  dat2: any;

  sdate: string;
  edate: string;
  status: any;
  reportblock: any;
  date: any;
  reportList: boolean;
  no_data: any;
  constructor(public fb:FormBuilder,public nav:NavbarService, private service: ReportService,private datepipe: DatePipe) {
    this.nav.show();
   }

  ngOnInit() {
    this.rolename = localStorage.getItem('role_name');
    console.log(this.rolename);

  this.login = this.fb.group({
      line:[""],
      machine_name: [""],
      shift_num: [""],
      date: [""],
      

    })

    this.myLoader = true;

    this.service.getmodule().subscribe(res => {
      this.module_response = res;
      this.login.patchValue({
        line: this.module_response[0],

      })
      localStorage.setItem('MODULELOG', this.module_response[0]);
      let hadokmodule = localStorage.getItem('MODULELOG');
      this.service.line(this.module_response[0]).subscribe(res => {
        this.mac_response=res;
        // let data =  this.mac_response;
        // console.log(data)
        this.login.patchValue({
          machine_name: this.mac_response[0],
        })
        localStorage.setItem('MACHINE', this.mac_response[0]);
        let hadokmac = localStorage.getItem('MACHINE');
      this.service.getshift(this.module_response[0]).subscribe(res => {
        this.shift_response = res;
        this.login.patchValue({
          shift_num: this.shift_response[0].shift_no,
        })
        localStorage.setItem('SHHIFT', this.shift_response[0].shift_no);

        let hadok = localStorage.getItem('SHHIFT');
        this.service.first_page_loading().subscribe(res => {
          this.first_loading = res; 
          this.dat1 = new DatePipe('en-US').transform(this.first_loading.from_date, 'yyyy-MM-dd');
          this.dat2 = new DatePipe('en-US').transform(this.first_loading.to_date, 'yyyy-MM-dd');
          this.login.patchValue({
         


            date: {begin: this.datepipe.transform(this.dat1, 'yyyy-MM-dd'), end: this.datepipe.transform(this.dat2, 'yyyy-MM-dd')}
          })

         

          
          localStorage.setItem('SDATE', this.first_loading['from_date']);
          localStorage.setItem('EDATE', this.first_loading['to_date']);
          this.sdate = localStorage.getItem('SDATE');
          this.edate = localStorage.getItem('EDATE');
          this.myLoader = false;
          this.logintest('true');
        })
      })
      //})
    })
  })}
  logintest(s) {
    this.status = s;
   this.myLoader = true;

    // console.log(this.edate)
    if (this.status == 'true') {
      this.reportList=true
       this.myLoader=false
      console.log(this.login.value)
      this.no_data=[]

  }
}
getsplit(val){
    
  this.reportblock = val;
  
  
  localStorage.setItem('MODULELOG', this.reportblock);

  this.service.line(this.reportblock).subscribe(res => {
    this.mac_response=res;
    this.login.patchValue({
      machine_name: this.mac_response[0],
    })
    localStorage.setItem('MACHINE', this.mac_response[0]);
    let hadokmac = localStorage.getItem('MACHINE');
 
    })

    this.service.getshift(this.reportblock).subscribe(res => {
      this.shift_response = res;
      this.login.patchValue({
        shift_num: this.shift_response[0].shift_no,
      })
      localStorage.setItem('SHHIFT', this.shift_response[0].shift_no);

    })
  }


  getshift(shift){
    localStorage.setItem('SHHIFT',shift);

    let hadok = localStorage.getItem('SHHIFT');
  

   
}
  getm(val){
    
    localStorage.setItem('MACHINE', val);

    
    let hadokmac = localStorage.getItem('MACHINE');

  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
    this.sdate = new DatePipe('en-US').transform(this.date.begin, 'MM/dd/yyyy');
    this.edate= new DatePipe('en-US').transform(this.date.end, 'MM/dd/yyyy');
    localStorage.setItem('SDATE', this.sdate);
    localStorage.setItem('EDATE', this.edate);



  }
}
 