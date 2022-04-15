import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { NavbarService } from 'src/app/Nav/navbar.service';
import { ReportService } from 'src/app/Service/app/report.service';
import Swal from 'sweetalert2';
import { ExportService } from '../shared/export.service';

@Component({
  selector: 'app-alarmreports',
  templateUrl: './alarmreports.component.html',
  styleUrls: ['./alarmreports.component.scss']
})
export class AlarmreportsComponent implements OnInit {
  login: FormGroup;
  alarmreports:any=[]
  module_response: any=[];
  mac_response: any=[];
  machine_response: any=[];
  shift_response: any=[];
  first_loading: any=[];
  fiesr_date: any=[];
  myLoader: boolean=false;
  selectedMachines:any=[];
  selectedShifts:any=[];
  allSelected=false;
  allSelecteds=false;
  dat1: any;
  dat2: any;
  sdate: any;
  edate: any;
  date: any=[];
  reportblock: any;
  export_excel: any=[];
  totals: number;
  get_duration: any;
  timeduration: any;
  constructor(private datepipe: DatePipe, private nav: NavbarService, private service: ReportService, private fb: FormBuilder, private exportService: ExportService) {
    this.nav.show()
    this.login = this.fb.group({
      line:["",],
      machine_name: [""],
      shift_num: [""],
      date: [""],

    })
    
    this.service.getmodule().subscribe(res => {
      this.module_response = res;
      this.login.patchValue({
        line: this.module_response[0],

      })
      this.service.line(this.module_response[0]).subscribe(res => {
        this.mac_response=res;
        this.selectedMachines=[]
        this.selectedMachines.push(this.mac_response[0])
        this.login.patchValue({
          machine_name: this.selectedMachines,
        })
    this.service.getmachines().subscribe(res => {
      this.machine_response = res;
      // this.login.patchValue({
      //   machine_name: this.machine_response[0],
      // })
      this.service.getshift(this.module_response[0]).subscribe(res => {
        this.shift_response = res;
        this.selectedShifts=[];
        this.selectedShifts.push(this.shift_response[0].shift_no)
        this.login.patchValue({
          shift_num: this.selectedShifts,
        })
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
    })
    })
  })
   }

  ngOnInit() {
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.selectedMachines=this.mac_response.map(x=>{return x})
    } else {
      this.selectedMachines=[]
    }
  }
  toggleAllSelections(){
    if (this.allSelecteds) {
      this.selectedShifts=this.shift_response.map(x=>{return x.shift_no})
    } else {
      this.selectedShifts=[]
    }
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
          this.sdate = new DatePipe('en-US').transform(this.date.begin, 'MM/dd/yyyy');
          this.edate= new DatePipe('en-US').transform(this.date.end, 'MM/dd/yyyy');
          localStorage.setItem('SDATE', this.sdate);
          localStorage.setItem('EDATE', this.edate);
  }
  getsplit(val){
    
    this.reportblock = val;
    
    

    this.service.line(this.reportblock).subscribe(res => {
      this.mac_response=res;
      this.selectedMachines=[]
      this.selectedMachines.push(this.mac_response[0])
      this.login.patchValue({
        machine_name: this.selectedMachines,
      })
    
   
      })

      this.service.getshift(this.reportblock).subscribe(res => {
        this.shift_response = res;
        this.selectedShifts=[];
        this.selectedShifts.push(this.shift_response[0].shift_no)
        this.login.patchValue({
          shift_num: this.selectedShifts,
        })
      })
    }
  logintest(s) {
 
    this.sdate = localStorage.getItem('SDATE');
    this.edate = localStorage.getItem('EDATE');
    // this.login.value.date = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');
         let register = {
           "module":this.login.value.line,
        "machine": this.selectedMachines,
        "shift": this.selectedShifts,
        "date": this.sdate + '-' + this.edate
      }
 this.myLoader = true;
    this.timeduration=[]
      this.service.alarmoverall_report(register).subscribe(res => {
        this.alarmreports = res;
        console.log(this.alarmreports)
        this.totals=0
        for(let i=0;i<res.length;i++){
          this.totals= this.totals+ res[i].timespan
          this.timeduration.push(this.toHoursMinutesSeconds(res[i].timespan))
          }
         this.get_duration = this.toHoursMinutesSeconds(this.totals);
        this.myLoader = false;
     
      })
  }
  export(){
    if(this.alarmreports.length==0){
      Swal.fire('Exporting!, No Data Found')
    }else{
      for(var i=0;i<this.alarmreports.length;i++){
    
        this.export_excel.push({
           "S.No": i+1 ,
           "Alarm Number": this.alarmreports[i].number || '---',
           "Machine Name": this.alarmreports[i].L1Name || '---',
           "Message":this.alarmreports[i].message || '---',
           "Start Time":this.datepipe.transform(this.alarmreports[i].updatedate, 'yyyy-MM-dd ; HH:mm:ss')  || '---',
           "End Time": this.datepipe.transform(this.alarmreports[i].enddate , 'yyyy-MM-dd ; HH:mm:ss')|| '---',
           "Duration":this.toHoursMinutesSeconds(this.alarmreports[i].timespan) || '---',
          
        });
      }
  
        this.exportService.exportAsExcelFile(this.export_excel, 'Alarm Report');
    
    }
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
}
