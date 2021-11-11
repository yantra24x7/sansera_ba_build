import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { ReportService } from '../../Service/app/report.service';
import { MatSort,MatTableDataSource,} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ExportService } from '../shared/export.service'; 
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-efficiency', 
  templateUrl: './efficiency.component.html',
  styleUrls: ['./efficiency.component.scss']
})
export class EfficiencyComponent implements OnInit {
  displayedColumns: string[] = ['position', 'date', 'shift_num','machine_name','card_no','rout_end','rout_start','tar','actual','efficiency'];
  dataSource = new MatTableDataSource();
  type: any;
  result:any;
  date:any;
  fiesr_date:any;
  reportblock:any;
  mac_response:any;
  myLoader = false;
  fina:any;
  lnth:any;
  daterangepicker:any;
  export_excel: any[] = [];
  module_response:any;
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
  status: string;
  startDate:any;
  opera:any;
  new_date: string;
  new_date1: any;
  g_report:any;
  rolename:any;
  constructor(private datepipe: DatePipe, private nav: NavbarService, private service: ReportService, private fb: FormBuilder, private exportService: ExportService) {
    this.nav.show()
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }

  ngOnInit() {

    this.rolename = localStorage.getItem('role_name');
          console.log(this.rolename);
    this.login = this.fb.group({
      line:["",],
      machine_name: [""],
      shift_num: [""],
      from_date: [""],

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
            from_date : this.fiesr_date
          })

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
    })
  })
    })

    // for (let i = 0; i <= 25; i++) {
    //   this.login.push({machine_name: `machine_name${i}`, shift_num: `shift_num${i}`,
    //   date: `date${i}`, });
    // }
  }


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
  export(){
   let register = {
        "module":this.login.value.line,
        "machine_name": this.login.value.machine_name,
        "shift_num": this.login.value.shift_num,
        "from_date": this.new_date + '-' + this.new_date1
      }
  this.service.overallll_report(register).subscribe(res => {
    this.myLoader = false;
    this.g_report = res[0];
    this.opera = res[0].operator;
    this.get_report = res[0].route_card_report;
     if(this.g_report.length==0){
      Swal.fire('Exporting!, No Data Found')
    }else{
    for(var i=0;i<this.get_report.length;i++){
      Swal.fire('Download Successfully')

      this.export_excel.push({
         "S.No": i+1,
         "Date": this.g_report.date || '---',
         "Shift": this.g_report.shift_num || '---',

         "Line":this.get_report[i].line || '---',
         "Machine Name":this.g_report.machine_name || '---',

         "Operator Name":this.g_report.operator[0] || 'No Operator Name',
         "Operator Id":this.g_report.operator_id[0] || 'No Operator Id',
         "Operation Number":this.g_report.opeation_no || 'No Operation Number',
         "Mode":this.get_report[i].mode || '---',

         "Route Card Number": this.get_report[i].card_no || '---',
         "Route Card Start Time": this.get_report[i].rout_start || '---',
       
         "Route Card End Time": this.get_report[i].rout_end || '---',
         "Duration": this.g_report.duration || '---',

         "Target": this.get_report[i].tar ,
         "Actual": this.get_report[i].actual ,
         "NCQ" : this.get_report[i].rejection,
         "Accept": this.get_report[i].accept ,
         "Reject": this.get_report[i].rejection1 ,
         "Rework": this.get_report[i].rework ,
         "Efficiency(%)": this.get_report[i].efficiency ,

 

      });
    }
      this.exportService.exportAsExcelFile(this.export_excel, 'Efficiency Report Details');
  }
  })

 }
  logintest(s) {
    this.status = s;
    this.myLoader = true;
    this.login.value.date = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');
    
    if (this.status == 'true') {
      this.new_date = new DatePipe('en-US').transform(this.login.value.from_date, 'MM/dd/yyyy');
      this.new_date1 = new DatePipe('en-US').transform(this.login.value.from_date, 'MM/dd/yyyy');
      let register = {
        "module":this.login.value.line,
        "machine_name": this.login.value.machine_name,
        "shift_num": this.login.value.shift_num,
        "from_date": this.new_date+ '-' + this.new_date1
      }
      this.service.overallll_report(register).subscribe(res => {
        this.myLoader = false;
        this.result = res.length;
        if(this.result == '0'){
          Swal.fire("No Efficiency Report Found")
        }
        console.log(res);
        this.lnth = res;
        console.log(this.lnth);
        this.g_report = res[0];
        this.get_report = res[0].route_card_report;
        this.fina = res;
        // this.dataSource = new MatTableDataSource(this.get_report);
     

             })
    }
  }
}
