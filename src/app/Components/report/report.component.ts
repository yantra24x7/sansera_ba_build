import { Component, OnInit, Inject } from '@angular/core';
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

declare var gtag;

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],

})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['position', 'date', 'line', 'machine_name','shift_num','time','operator','operator_id','op_no','root_card','target','actual','accept','reject','rework','efficiency','utilisation','run_time','idle_time','alarm_time','disconnect','duration'];
  dataSource = new MatTableDataSource();
  // animal: string;

  // name: string;
  date:any;
  reportblock:any;
  type: any;
  myLoader = false;
  O_MAC:any;
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
  end: string;
  types: any;
  sdate: string;
  edate: string;

  constructor(private datepipe: DatePipe, private nav: NavbarService, private service: ReportService, public dialog: MatDialog, private fb: FormBuilder, private exportService: ExportService) {
    this.nav.show();
   
  
  }

  downlosd(){
    Swal.fire("Download Successfully")
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
   
    });

    dialogRef.afterClosed().subscribe(result => {
    });
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
        localStorage.setItem('SHHIFT', this.shift_response[0].shift_no);

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
    console.log(this.rolename);

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
          this.dat1 = new DatePipe('en-US').transform(this.first_loading.from_date, 'yyyy-MM-dd');
          this.dat2 = new DatePipe('en-US').transform(this.first_loading.to_date, 'yyyy-MM-dd');
          this.login.patchValue({
         


            date: {begin: this.datepipe.transform(this.dat1, 'yyyy-MM-dd'), end: this.datepipe.transform(this.dat2, 'yyyy-MM-dd')}
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
         for(let j=0; j<this.get_report[i].operator.length;j++){
          for(let k=0; k<this.get_report[i].operator_id.length;k++){
            for(let m=0; m<this.get_report[i].root_card.length;m++){
             this.opera = this.get_report[i].operator[j];
             this.operaid = this.get_report[i].operator_id[k];

     
    
      this.export_excel.push({
         "S.No": i+1,
         "Date": this.get_report[i].date || '---',
         "Line": this.get_report[i].line || '---',
         "Machine Name":this.get_report[i].machine_name || '---',
         "Shift": this.get_report[i].shift_num || '---',
         "Operator Name": this.opera || '---',
         "Operator ID": this.operaid || '---',
         "Route Card Number": this.get_report[i].root_card[m] || '---',
         "Target": this.get_report[i].target,
         "Actual Parts Produced": this.get_report[i].actual,
         "Efficiency": this.get_report[i].efficiency || '---',
         "Utilization": this.get_report[i].utilisation || '---',
         "Run Time (in mins)": this.get_report[i].run_time || '---',
         "Setup Idle (in mins)": this.get_report[i].idle_time || '---',
         "Alarm Time": this.get_report[i].alarm_time || '---',
         "Non Utilized Time": this.get_report[i].disconnect || '---',
          "Duration": this.get_report[i].duration || '---',


      });
    }
      this.exportService.exportAsExcelFile(this.export_excel, 'Report Details');
  }
}
    }
    }
  })

 }
  logintest(s) {
    this.status = s;
    this.myLoader = true;
    // console.log(this.login.value)
    // this.begin = new DatePipe('en-US').transform(this.login.value.date.begin, 'MM/dd/yyyy');
    // this.end = new DatePipe('en-US').transform(this.login.value.date.end, 'MM/dd/yyyy');
    // console.log( this.begin,this.end)
    // localStorage.setItem('SDATE', this.begin);
    // localStorage.setItem('EDATE', this.end);
    // this.sdate = localStorage.getItem('SDATE');
    // console.log(this.sdate);
    // this.edate = localStorage.getItem('EDATE');
    // console.log(this.edate)
    if (this.status == 'true') {
      if(this.login.value.type === 'Shiftwise'){
        // alert("shift");
        let register = {
          "module":this.login.value.line,
          "machine_name": this.login.value.machine_name,
          "shift_num": this.login.value.shift_num,
          "date": this.sdate + '-' + this.edate,
          "type":this.login.value.type
        }
        this.service.overall_report(register).subscribe(res => {
          this.myLoader = false;
          this.get_report = res;
  
          this.dataSource = new MatTableDataSource(this.get_report);
      
  
        })

      }
      else if(this.login.value.type === 'Operatorwise'){
        // alert("Operat");
        let register = {
          "module":this.login.value.line,
          "machine_name": this.login.value.machine_name,
          "shift_num": this.login.value.shift_num,
          "date": this.sdate + '-' + this.edate,
          "type":this.login.value.type,
          "operator":this.login.value.operator
        }
        this.service.overall_report_op(register).subscribe(res => {
          this.myLoader = false;
          this.get_report = res;
  
          this.dataSource = new MatTableDataSource(this.get_report);
      
  
        })
      }

      else{
     
      let register = {
        "module":this.login.value.line,

        "machine_name": this.login.value.machine_name,
        "shift_num": this.login.value.shift_num,
        "date": this.sdate + '-' + this.edate,
      }
      this.service.overallls_report(register).subscribe(res => {
        this.myLoader = false;
        this.get_report = res;

        this.dataSource = new MatTableDataSource(this.get_report);
    

      })
    }
    } 
  }
}
@Component({
  selector: 'report-component-dialog',
  templateUrl: 'report.model.html',
})
export class DialogOverviewDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewDialog>) { }
  // @Inject(MAT_DIALOG_DATA) public data: DialogData

  onNoClick(): void {
    this.dialogRef.close();
  }

}
