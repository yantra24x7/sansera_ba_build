import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import {TrendchartService} from '../../Service/app/trendchart.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
declare var Highcharts: any;

@Component({
  selector: 'app-trendchart',
  templateUrl: './trendchart.component.html',
  styleUrls: ['./trendchart.component.scss']
})
export class TrendchartComponent implements OnInit {
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
    - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
    ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  machine_response: any;
  shift_response:any; 
  daterangepicker:any;
  ejs:any;
  test:FormGroup;
  get_report: any;
  first_loading: any;
  myLoader = false;
  status: string;
  new_date: any;
  new_date1:any;
  constructor(private nav: NavbarService,private service:TrendchartService,private datePipe: DatePipe,private fb:FormBuilder) {
    this.nav.show();
  }

  ngOnInit() {
      
    this.test = this. fb.group({
      machine_name:["",],
      shift_num:["",],
      date:["",],
    })
      
    this.service.getmachines().subscribe(res =>{
      this.machine_response=res;
      this.test.patchValue({
        machine_name:this.machine_response[0],
      })
      this.service.getshift().subscribe(res =>{
        this.shift_response=res;
        this.test.patchValue({
          shift_num:this.shift_response[0].shift_no,
        })
        this.service.first_page_loading().subscribe(res =>{
          this.first_loading = res;
          this.test.patchValue({
            date : [this.first_loading['from_date'],this.first_loading['to_date']]
          })
          // this.minDate = this.first_loading['from_date']
          // this.maxDate = this.first_loading['to_date']
          this.testfunc('true');
        })
      })
    })
  

   
  }
  testfunc(s){
    this.status=s;

    this.myLoader = true;

    if(this.status == 'true'){
      this.new_date = new DatePipe('en-US').transform(this.test.value.date[0], 'MM/dd/yyyy');
      this.new_date1 = new DatePipe('en-US').transform(this.test.value.date[1], 'MM/dd/yyyy');
      let register={
        "machine_name":this.test.value.machine_name,
        "shift_num":this.test.value.shift_num,
        "date":this.new_date + '-' + this.new_date1
      }
   
      this.service.trend_report(register).subscribe(res =>{
        this.myLoader = false;
        this.get_report = res;
      })
    }
  //   this.maxDate = this.datePipe.transform(this.maxDate);

  //   let register = this.test.value;
  //   console.log(register)
  //   if(this.status == 'true'){
  //      this.new_date=new DatePipe('en-US').transform(this.test.value.date[0],'MM/dd/yyyy');
  //      this.new_date1=new DatePipe('en-US').transform(this.test.value.date[1],'MM/dd/yyyy');


  //     let register={
  //       "machine_name":this.test.value.machine_name,
  //       "shift_num":this.test.value.shift_num,
  //       "date":this.new_date + '-' + this.new_date1
  //     }
  //   this.myLoader = false;
  //   console.log(this.test.value);
  //   // let register = this.test.value;
  //   // register.from_date = this.test.value.date;
  //   // register.to_date = this.test.value.date;
  //   this.service.trend_report(register).subscribe(res =>{
  //   console.log(res);
  //   this.myLoader = false;
  //  this.get_report = res;
  //   })
  // }
  // else{
  //   this.service.trend_report(register).subscribe(res =>{
  //     console.log(res);
  //     this.myLoader = false;
  //    this.get_report = res;
  //     })
  // }
  // }
}
}