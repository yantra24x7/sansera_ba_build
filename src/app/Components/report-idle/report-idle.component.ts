import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { ReportIldeService } from '../../Service/app/report-ilde.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ExportService } from '../shared/export.service';
import Swal from 'sweetalert2';    
import { map } from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

declare var gtag;
declare var Highcharts: any;

@Component({ 
  selector: 'app-report-idle',
  templateUrl: './report-idle.component.html',
  styleUrls: ['./report-idle.component.scss']
})
export class ReportIdleComponent implements OnInit {

  rolename:any;
  g_report:any;
  time:any;
  loop:any;
  totl:any;
  dates:any;
  date:any;
  data:any;
  chartlist: boolean;
  reportList: boolean;
  chart_pie:any;
  no_data:any;
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
  shift_response: any;
  login: FormGroup;
  get_report: any;
  first_loading: any;
  daterangepicker:any;
  get_duration:any;
  startDate:any;
  status: string;
myLoader = false;
fiesr_date:any;
 export_excel: any[] = [];
  new_date: string;
  new_date1: any;
  module_response:any;
  chart_loop:any;
  mac_response:any;
  reportblock:any;
  constructor(private exportService: ExportService,private nav:NavbarService,private service:ReportIldeService,private fb:FormBuilder  ) { 
    this.nav.show()
  }

   toSeconds = hours => {
    let a = hours.split(':');
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return seconds;
  }

  toHoursMinutesSeconds = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    // let result = `${minutes
    //   .toString()
    //   .padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
    // if (!!hours) {
    let result = `${hours.toString()}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
   
    return result;
  };

  getsplit(val){
    
    this.reportblock = val;
    
    

    this.service.line(this.reportblock).subscribe(res => {
      this.mac_response=res;
      this.login.patchValue({
        machine_name: this.mac_response[0],
      })
    
   
      })

      this.service.getshift(this.reportblock).subscribe(res => {
        this.shift_response = res;
        this.login.patchValue({
          shift_num: this.shift_response[0].shift_no,
        })
      })
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
        this.service.line(this.module_response[0]).subscribe(res => {
          this.mac_response=res;
      
          this.login.patchValue({
            machine_name: this.mac_response[0],
          })
      this.service.getmachines().subscribe(res => {
        this.machine_response = res;
        // this.login.patchValue({
        //   machine_name: this.machine_response[0],
        // })
        this.service.getshift(this.module_response[0]).subscribe(res => {
          this.shift_response = res;
          this.login.patchValue({
            shift_num: this.shift_response[0].shift_no,
          })
          this.service.first_page_loading().subscribe(res => {
            this.first_loading = res;
            this.fiesr_date = new DatePipe('en-US').transform(res.from_date, 'yyyy-MM-dd');

            this.login.patchValue({
              // date : [this.first_loading]
              date : this.fiesr_date

            })
  
            this.myLoader = false;

            this.logintest('true');
          })
        })
      })
      })
      })


    



  }

  chart(){
    this.chartlist = true;
    this.reportList = false;
    this.login.value.date = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');
    let volko_chart = {
      "module":this.login.value.line,
   "machine": this.login.value.machine_name,
   "shift": this.login.value.shift_num,
   "date": this.login.value.date + '-' + this.login.value.date
 }

   this.service.Idle_chart(volko_chart).subscribe(res => {
     this.chart_pie = res;
     Highcharts.chart('comparepie2', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Idle Reason chart' 
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      credits: {
           enabled: false
           },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          }
        }
      },
      series: [{
        name: 'Share',
        data: this.chart_pie

        // this.chart_pie
          //  { name: 'Internet Explorer', y: 11.84 },
          //  { name: 'Firefox', y: 10.85 },
          // { name: 'Edge', y: 4.67 },
          // { name: 'Safari', y: 4.18 },
          // { name: 'Other', y: 7.05 }
        
      }]
    });
   })

  }
      export(){
   let register = {
    "machine": this.login.value.machine_name,
    "shift": this.login.value.shift_num,
    "date": this.login.value.date
      }
  this.service.overall_report(register).subscribe(res => {
    this.no_data = res;
    this.myLoader = false;

    this.g_report = res[0];
    this.get_report = res[0].data;
    this.totl = res[0].total;   
     if(this.get_report.length==0){
      Swal.fire('Exporting!, No Data Found')
    }else{
      Swal.fire('Download Successfully')

    for(var i=0;i<this.get_report.length;i++){

      this.export_excel.push({
         "S.No": i+1,
         "Date": this.g_report.date || '---',
         "Shift": this.g_report.shift_no || '---',
         "Machine Name": this.g_report.machine_name || '---',
         "Reason":this.get_report[i].idle_reason || '---',
         "Start Time": this.get_report[i].idle_start || '---',
         "End Time": this.get_report[i].idle_end || '---',
         "Duration": this.toHoursMinutesSeconds(this.get_report[i].time) || '---',
         

      });
    }
      this.exportService.exportAsExcelFile(this.export_excel, 'Idle Reason Report');
  }
  })

 }  
 addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  this.date = event.value;
}
  logintest(s) { 
    this.reportList = true;
    this.chartlist = false;
    this.status = s;
    this.login.value.date = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');
         let register = {
           "module":this.login.value.line,
        "machine": this.login.value.machine_name,
        "shift": this.login.value.shift_num,
        "date": this.login.value.date + '-' + this.login.value.date
      }
 this.myLoader = true;

      this.service.overall_report(register).subscribe(res => {
        this.no_data = res;
        this.myLoader = false;

        this.g_report = res[0];
        this.get_report = res[0].data;
        this.totl = res[0].total;
        if(this.totl == '0'){
          Swal.fire("No Idle Reason Report Found")
          let datas = this.totl;
        }

        

     



         


        this.get_duration = this.toHoursMinutesSeconds(res[0].total);
        this.data = []

        for(let i in this.get_report){

          this.chart_loop = this.toHoursMinutesSeconds(this.get_report[i].time);
          this.data.push(this.chart_loop);

     



        
        }

      })
    
  }

 
}
