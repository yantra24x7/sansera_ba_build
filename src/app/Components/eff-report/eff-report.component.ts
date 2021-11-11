import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { ReportService } from '../../Service/app/report.service';
import { MatSort,MatTableDataSource,} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ExportService } from '../shared/export.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eff-report',
  templateUrl: './eff-report.component.html',
  styleUrls: ['./eff-report.component.scss']
})
export class EffReportComponent implements OnInit { 

  displayedColumns: string[] = ['position', 'date', 'shift_num', 'line','machine_name','operator','operator_id','target','actual','efficiency'];
  dataSource = new MatTableDataSource();
  type: any;
  myLoader = false;
  daterangepicker:any;
  export_excel: any[] = [];

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
  new_date: string;
  new_date1: any;
  constructor(private datepipe: DatePipe, private nav: NavbarService, private service: ReportService, private fb: FormBuilder, private exportService: ExportService) {
    this.nav.show()
  }


  ngOnInit() {

   
    this.login = this.fb.group({
      machine_name: [""],
      shift_num: [""],
      date: [""],

    })

    this.service.getmachines().subscribe(res => {
      this.machine_response = res;
      this.login.patchValue({
        machine_name: this.machine_response[0],
      })
      this.service.getshifteff().subscribe(res => {
        this.shift_response = res;
        this.login.patchValue({
          shift_num: this.shift_response[0].shift_no,
        })
        this.service.first_page_loading().subscribe(res => {
          this.first_loading = res;
          this.login.patchValue({
            date : [this.first_loading['from_date'],this.first_loading['to_date']]
          })


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

    // for (let i = 0; i <= 25; i++) {
    //   this.login.push({machine_name: `machine_name${i}`, shift_num: `shift_num${i}`,
    //   date: `date${i}`, });
    // }
  }
  export(){
   let register = {
        "machine_name": this.login.value.machine_name,
        "shift_num": this.login.value.shift_num,
        "date": this.new_date + '-' + this.new_date1
      }
  this.service.overall_report(register).subscribe(res => {
    this.myLoader = false;
    this.get_report = res;
    if(this.get_report.length==0){
      Swal.fire('Exporting!, No Data Found')
    }else{
    for(var i=0;i<this.get_report.length;i++){
      this.export_excel.push({
         "S.No": i+1,
         "Date": this.get_report[i].date || '---',
         "Shift": this.get_report[i].shift_num || '---',
         "Module": this.get_report[i].line || '---',

         "Machine Name":this.get_report[i].machine_name || '---',
        
         "Operator Name": this.get_report[i].operator || '---',
         "Operator ID": this.get_report[i].operator_id,
       
         "Target": this.get_report[i].target || '---',
         "Actual": this.get_report[i].actual || '---',
         "Efficiency": this.get_report[i].efficiency || '---',

 

      });
    }
      this.exportService.exportAsExcelFile(this.export_excel, 'Operator Efficiency Report Details');
  }
  })

 }
  logintest(s) {
    this.status = s;
    this.myLoader = true;

    // this.maxDate = this.datepipe.transform(this.maxDate);
    
    if (this.status == 'true') {
      this.new_date = new DatePipe('en-US').transform(this.login.value.date[0], 'MM/dd/yyyy');
      this.new_date1 = new DatePipe('en-US').transform(this.login.value.date[1], 'MM/dd/yyyy');
      let register = {
        "machine_name": this.login.value.machine_name,
        "shift_num": this.login.value.shift_num,
        "date": this.new_date + '-' + this.new_date1
      }

      this.service.overall_report(register).subscribe(res => {
        this.myLoader = false;
        this.get_report = res;
        this.dataSource = new MatTableDataSource(this.get_report);

      })
    }
  }
}
