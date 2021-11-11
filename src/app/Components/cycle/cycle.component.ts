import { Component, OnInit ,AfterViewInit,  ViewChild, ViewChildren, ElementRef,   QueryList, HostListener} from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { ReportService } from '../../Service/app/report.service';
import { MatSort,MatTableDataSource,} from '@angular/material'; 
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from 'saturn-datepicker'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ExportService } from '../shared/export.service';
import Swal from 'sweetalert2';
import * as Highcharts from 'highcharts';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/annotations')(Highcharts);

declare var require: any

declare var gtag;
@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.scss']
})
export class CycleComponent implements OnInit {


  cycle_start1:any;
  c_duration:any;
  l_duration:any;
  startDate:any;
  displayedColumns: string[] = ['position', 'date', 'line', 'machine_name','shift_num','time','operator','operator_id','op_no','root_card','target','actual','ncq','accept','reject','rework','efficiency','utilisation','run_time','idle_time','alarm_time','disconnect','duration'];
  dataSource = new MatTableDataSource();
  // animal: string;
  parts = [];
  test_sec_cycle :any[]=[]
  test_sec_load :any[]=[]
  load_end1:any;
  cycle_end1:any;
  Highcharts = Highcharts;
  cycle_start_end:any;
  chartOptions: any;
  load_start1:any;
  partn_length:any;
  data_push:any;
  // name: string;
  load_min_duration:any[]= []
  data_load_start2: any[]= []
  cycle_min_duration: any[]= []
  data_cycle_start :any[]= []
  date:any;
  reportblock:any;
  type: any;
  myLoader = false;
  O_MAC:any;
  pro_number1:any;
  daterangepicker:any;
  export_excel: any[] = [];
  rolename:any;
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
  sec: any;

  cycle_start_end2:any;
  data_cycle_start_time: any[] = [];
  data_load_start_time: any[] = [];
  login: FormGroup;
  get_report: any;
  first_loading: any;
  status: string;
  new_date: string;
  new_date1: any;
  op_response:any;
  operaid:any;
  opera:any;
  mac_response:any;
  module_response: any;
  ShIfT:any;
  dat1: string;
  dat2: string;
  begin: any;
  load_start_end:any;
  end: string;
  types: any;
  sdate: string;
  edate: string;
  xazxis: string;
  dataaxiss: any[] = [];
  secondsToMinutes(time) {
    let min = Math.floor(time / 60);
    this.sec = Math.floor(time % 60);
     if (this.sec.toString().length == 1) {
     this.sec = '0' + this.sec;
     }
     return min + '.' + this.sec;
}
  constructor(private datepipe: DatePipe, private nav: NavbarService, private service: ReportService, public dialog: MatDialog, private fb: FormBuilder, private exportService: ExportService) {
    this.nav.show();
   
  
  }

  

 
  downlosd(){
    Swal.fire("Download Successfully")
  }



 

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        this.date = event.value;
        this.sdate = new DatePipe('en-US').transform(this.date.begin, 'MM/dd/yyyy');
        this.edate= new DatePipe('en-US').transform(this.date.end, 'MM/dd/yyyy');
        localStorage.setItem('SDATE', this.sdate);
        localStorage.setItem('EDATE', this.edate);



      }
  choosedDate(val){
    
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
      })
    }



    getdate(date){
      
    }
    gettype(type){
       this.types = type;
       let hadokmodule = localStorage.getItem('MODULELOG');
      let hadok = localStorage.getItem('SHHIFT');
      let hadokmac = localStorage.getItem('MACHINE');
      this.sdate = localStorage.getItem('SDATE');
      this.edate = localStorage.getItem('EDATE');
      let data = type;
      if(data === 'Operatorwise')
      {


        let register = {
          "module":hadokmodule,
          "machine_name": hadokmac,
          "shift_num": hadok,
          "date":  this.sdate + '-' +  this.edate
        }
        this.service.operat(register).subscribe(res => {
          this.op_response = res;
          this.login.patchValue({
            operator: this.op_response[0],
          })
        })
      }

    }
  ngOnInit() {


    this.rolename = localStorage.getItem('role_name');

  this.login = this.fb.group({
      line:[""],
      machine_name: [""],
      shift_num: [""],
      type:[""],
      date: [""],
      operator:[""],

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


    // this.service.getmachines().subscribe(res => {
    //   this.machine_response = res;
    //   this.login.patchValue({
    //     machine_name: this.machine_response[0],
    //   })
      this.service.getshift(this.module_response[0]).subscribe(res => {
        this.shift_response = res;
        this.login.patchValue({
          shift_num: this.shift_response[0].shift_no,
        })
        localStorage.setItem('SHHIFT', this.shift_response[0].shift_no);

        let hadok = localStorage.getItem('SHHIFT');
        this.service.first_page_loading().subscribe(res => {
          this.first_loading = res; 
          // this.dat1 = new DatePipe('en-US').transform(this.first_loading.from_date, 'yyyy-MM-dd');
          // this.dat2 = new DatePipe('en-US').transform(this.first_loading.to_date, 'yyyy-MM-dd');
          // this.login.patchValue({
         


          //   date: {begin: this.datepipe.transform(this.dat1, 'yyyy-MM-dd'), end: this.datepipe.transform(this.dat2, 'yyyy-MM-dd')}
          // })
          this.dat1 = new DatePipe('en-US').transform(res.from_date, 'yyyy-MM-dd');
          this.login.patchValue({
            date : this.dat1
          })
          // this.stamps = { begin: this.datepipe.transform(begin, 'yyyy-MM-dd'), end: this.datepipe.transform(end, 'yyyy-MM-dd') };

          
          localStorage.setItem('SDATE', this.first_loading['from_date']);
          localStorage.setItem('EDATE', this.first_loading['to_date']);
          this.sdate = localStorage.getItem('SDATE');
          this.edate = localStorage.getItem('EDATE');
          this.myLoader = false;

          // this.new_date = new DatePipe('en-US').transform(this.first_loading['from_date'], 
          // 'dd/MM/yyyy');
          // this.new_date1 = new DatePipe('en-US').transform(this.first_loading['to_date'], 
          // 'dd/MM/yyyy');
          // this.login.patchValue({
          //   date : [  this.new_date,  this.new_date1]
          // })
          // this.minDate = this.first_loading['from_date']
          // this.maxDate = this.first_loading['to_date']
          this.logintest('true');
        })
      })
      //})
    })
    })

 
 

    // for (let i = 0; i <= 25; i++) {
    //   this.login.push({machine_name: `machine_name${i}`, shift_num: `shift_num${i}`,
    //   date: `date${i}`, });
    // }
  }

  getshift(shift){
    localStorage.setItem('SHHIFT',shift);

    let hadok = localStorage.getItem('SHHIFT');
  

   
}
  getm(val){
    
    localStorage.setItem('MACHINE', val);

    
    let hadokmac = localStorage.getItem('MACHINE');

  }

  logintest(s) {
    this.status = s;
    this.dat1 = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');
    // this.myLoader = true;
     let register = {
             "module":this.login.value.line,
             "machine_name": this.login.value.machine_name,
             "shift_num": this.login.value.shift_num,
             "date": this.dat1 + '-' + this.dat1,
             "type":this.login.value.type
          }

          // for(let i in this.machine_response){
          //   this.chart_loop = this.machine_response[i].data;
          //   console.log(this.chart_loop)  
          //   this.data = []
          //   this.data1 = []
    
          //   for(let j in this.machine_response[i].data){
          //     this.data.push( this.machine_response[i].data[j].time);
          //    this.data1.push(this.machine_response[i].data[j].count);
            
          //    this.reflect = this.machine_response[i].status;
           
          //   }
     this.service.overall_report(register).subscribe(res => {
             this.get_report = res;
             this.parts = [];
            this.load_min_duration = [];
            this.cycle_min_duration = [];
            this.test_sec_load = [];
            this.test_sec_cycle = [];
            this.dataaxiss = [];
             for (var i in this.get_report) {
              
             for(let m in this.get_report[i].chart_data){
              var run = parseFloat(m)
              var part = run * 1 + 1;
              this.parts.push(part);
              this.c_duration = this.get_report[i].chart_data[m].cycl_duration
              this.l_duration = this.get_report[i].chart_data[m].load_duration
              console.log(this.l_duration);
               var cycle1 = this.secondsToMinutes(this.c_duration);
               var cycle2 = this.secondsToMinutes(this.l_duration);
               console.log(cycle1);
               this.cycle_start1   = new DatePipe('en-US').transform(this.get_report[i].chart_data[m].cycle_start, 'HH:mm:ss');
               this.cycle_end1 = new DatePipe('en-US').transform(this.get_report[i].chart_data[m].cycle_end, 'HH:mm:ss');
               this.load_start1   = new DatePipe('en-US').transform(this.get_report[i].chart_data[m].load_start, 'HH:mm:ss');
               this.load_end1 = new DatePipe('en-US').transform(this.get_report[i].chart_data[m].load_end, 'HH:mm:ss');
               this.cycle_start_end = this.cycle_start1 + '-' + this.cycle_end1
               this.load_start_end = this.load_start1 + '-' + this.load_end1
            
              
            if (this.cycle_start_end  != ""){
             this.data_cycle_start_time.push(this.cycle_start_end)
              this.data_load_start_time.push(this.load_start_end)
              this.test_sec_load.push(parseFloat(cycle2));
              this.test_sec_cycle.push(parseFloat(cycle1));
            this.data_cycle_start.push(parseInt(this.cycle_start_end))
            this.data_load_start2.push(parseInt(this.load_start_end))
            this.cycle_min_duration.push(parseInt(cycle1))
            this.load_min_duration.push(parseInt(cycle2))
          
            this.xazxis = part + '(' +this.load_start_end+ ')-(' + this.cycle_start_end + ')'

            this.dataaxiss.push(this.xazxis)

            }
            console.log(this.test_sec_load,this.test_sec_cycle)
            console.log(this.load_min_duration)
            console.log(this.cycle_min_duration)


                   }
        }

        // let result = parseInt(data_cycle_start);

       


             Highcharts.chart('container', {
              chart: { 
                type: 'column',
                zoomType: 'xy',

              },
            
              title: {
                text: 'Cycle Time Chart'
              },
             
              subtitle: {
                text: 'Total Parts Produced : ' + this.parts.length
              },
              credits:{
                    enabled:false
              },
              xAxis: {
                // categories: this.data_cycle_start_time,
                // categories: this.data_load_start_time,

                categories:this.dataaxiss,
                title: {
                  text: 'Parts Count(Load/Unload Time)-(Cycle Time)'
                },
                crosshair: true
              },
              yAxis: {
                 min: 0,
                title: {
                    text: 'Time(min)'
                },
               },
              // tooltip: {
              //   headerFormat: '<span style="font-size:10px"></span><table>',
              //   pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              //     '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
              //   footerFormat: '</table>',
              //   shared: true,
              //   useHTML: true
              // },
              tooltip: {
                formatter: function() {
                    return '' + this.x ;
  
            }
        },
              plotOptions: {
                column: {
                  borderWidth: 0,
                  groupPadding:0,
                  pointPadding: 0,
                  //pointWidth: 75
                }
              },
              colors: ['#F7A35C','#90ED7D'],

              series: [
                
             
              {
                name: 'Load/Unload Time',
                type:undefined,
                data: this.test_sec_load,

                dataLabels: {
                  enabled: true,
                  color: '#292b2c',
                  align: 'center',
                  format: '{point.y} min', 
        
                  y: 0,
                  style: {
                      fontSize: '10px',
                      fontWeight: 'normal',
                  }
              },
            
              }, 
              {
                name: 'Cycle Time',
                type:undefined,

                data: this.test_sec_cycle,
                dataLabels: {
                  enabled: true,
                  color: '#292b2c',
                  align: 'center',
                  format: '{point.y} min', 
        
                  y: 0,
                  style: {
                      fontSize: '10px',
                      fontWeight: 'normal',
                  }
              },
            
              }
            ]
            });

         
            //  this.data_push.push( this.get_report[i].chart_data[j]);
            // console.log(this.data_push)
            //  this.data.push( this.machine_response[i].data[j].time);
            // this.partn_length = this.get_report[0].chart_data.length;
            // console.log(this.partn_length)
            // var cycle1 = this.secondsToMinutes(this.allcycletime[i].cycle_time);
            // var cycle = parseFloat(cycle1);
            // var pro_number = this.get_report[0][i].chart_data;

            //  this.pro_number1.push(pro_number);
            //  console.log(this.pro_number1)
            // var ShiftNo = this.allcycletime[i].shift_no;
            // var Time = this.allcycletime[i].time;
            
        
             this.dataSource = new MatTableDataSource(this.get_report);
           
        
    
          })
    // this.begin = new DatePipe('en-US').transform(this.login.value.date.begin, 'MM/dd/yyyy');
    // this.end = new DatePipe('en-US').transform(this.login.value.date.end, 'MM/dd/yyyy');
    // console.log( this.begin,this.end)
    // localStorage.setItem('SDATE', this.begin);
    // localStorage.setItem('EDATE', this.end);
    // this.sdate = localStorage.getItem('SDATE');
    // console.log(this.sdate);
    // this.edate = localStorage.getItem('EDATE');
    // console.log(this.edate)

// today hide
    // if (this.status == 'true') {
    //   if(this.login.value.type === 'Shiftwise'){
    //     let register = {
    //       "module":this.login.value.line,
    //       "machine_name": this.login.value.machine_name,
    //       "shift_num": this.login.value.shift_num,
    //       "date": this.sdate + '-' + this.edate,
    //       "type":this.login.value.type
    //     }
    //     this.service.overall_report(register).subscribe(res => {
    //       this.myLoader = false;
    //       this.get_report = res;
  
    //       this.dataSource = new MatTableDataSource(this.get_report);
      
  
    //     })

    //   }
    //   else if(this.login.value.type === 'Operatorwise'){
    //     let register = {
    //       "module":this.login.value.line,
    //       "machine_name": this.login.value.machine_name,
    //       "shift_num": this.login.value.shift_num,
    //       "date": this.sdate + '-' + this.edate,
    //       "type":this.login.value.type,
    //       "operator":this.login.value.operator
    //     }
    //     this.service.overall_report_op(register).subscribe(res => {
    //       this.myLoader = false;
    //       this.get_report = res;
  
    //       this.dataSource = new MatTableDataSource(this.get_report);
      
  
    //     })
    //   }

    //   else{
     
    //   let register = {
    //     "module":this.login.value.line,

    //     "machine_name": this.login.value.machine_name,
    //     "shift_num": this.login.value.shift_num,
    //     "date": this.sdate + '-' + this.edate,
    //   }
    //   this.service.overallls_report(register).subscribe(res => {
    //     this.myLoader = false;
    //     this.get_report = res;

    //     this.dataSource = new MatTableDataSource(this.get_report);
    

    //   })
    // }
    // } 
  }
}