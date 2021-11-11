import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { FormGroup, FormBuilder,Validators,FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../../Service/app/report.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {
  login: FormGroup;
  daterangepicker:any;
  module_response:any;
  startDate:any;
  takum_id:any;
  g_report2:any;
  fiesr_date:any; 
  e_id:any;
  shift_response:any;
  get_report1:any;
  reportblock:any;
  mac_response:any;
  date:any;
  new_date: string;
  new_date1: string;
  status: string;
  myLoader = false;
  reason = new FormControl('', [Validators.required]);
  g_report1:any;
  get_report: any;
  first_loading: any;
  public maxDate: Object = new Date();

  public minDate: Object = new Date();  //minDate is 1st Jan 2019

  constructor(private datepipe: DatePipe,private service: ReportService,public dialog: MatDialog,private nav: NavbarService, private fb: FormBuilder,) {
    this.nav.show()
  }

  openDialog(user): void {
    const dialogRef = this.dialog.open(Add, {
      width: '900px',
      height:'auto',
      data: { edit_user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    // this.ngOnInit();
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(Edit, {
      width: '500px',
      data: { new: 'new' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialog3(): void {
    const dialogRef = this.dialog.open(Sedit, {
      width: '500px',
      data: { new: 'new' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialog4(): void {
    const dialogRef = this.dialog.open(Sadd, {
      width: '500px',
      data: { new: 'new' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getsplit(val){
    
    this.reportblock = val;
    
    

    this.service.line(this.reportblock).subscribe(res => {
      this.mac_response=res;
      this.login.patchValue({
        machine_name: this.mac_response[0],
      })

      this.service.getshift(this.reportblock).subscribe(res => {
        this.shift_response = res;
        this.login.patchValue({
          shift_num: this.shift_response[0].shift_no,
        })
      })
      })
    }
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.date = event.value;
    }
  ngOnInit() {

    this.e_id = localStorage.getItem('edit_id');

    
    this.login = this.fb.group({
      line:["",Validators.required],
      machine_name:["",Validators.required],
      shift_num:["",Validators.required],

      date:["",Validators.required],

    })


    this.service.get_rreport(this.e_id).subscribe(res =>{
      this.g_report1 = res;
      console.log(this.g_report1)
    })
        this.myLoader = true;

    this.service.getmodule().subscribe(res => {
      this.module_response = res;
      this.login.patchValue({
        line: this.module_response[0],

      })
      this.service.line(this.module_response[0]).subscribe(res => {
        this.mac_response=res;
        // let data =  this.mac_response;
        // console.log(data)
        this.login.patchValue({
          machine_name: this.mac_response[0],
        })
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
  }

 
  logintest(s) {
    this.myLoader = false;

    this.status = s;

    if (this.status == 'true') {
      this.login.value.date = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');

      let register = {
        "module":this.login.value.line,
        "machine_name": this.login.value.machine_name,
        "shift_num": this.login.value.shift_num,
        "date": this.login.value.date + '-' + this.login.value.date
      }
      localStorage.setItem('QAMAC', register.machine_name);
      localStorage.setItem('QASHI', register.shift_num);
      localStorage.setItem('QADAT', register.date);

      this.service.overall_report_ing(register).subscribe(res => {
        this.myLoader = false;
        this.get_report = res;
        console.log(this.get_report)

        console.log(res[0].edit_reason);

        this.reason = new FormControl(this.get_report[0].edit_reason, [Validators.required]);
        console.log(this.reason)
        this.get_report1 = res[0].route_card_report;

    

      })
      

    } 
  }

  reas(rep){
    this.takum_id = rep[0].id.$oid;
    this.service.get_rreport(this.takum_id).subscribe(res =>{
      this.g_report2 = res;

    })
    console.log(this.get_report[0].id.$oid)

    console.log(this.reason.value)
    
         this.get_report[0].edit_reason= [this.reason.value];
         console.log(this.get_report[0].edit_reason)
         this.get_report[0].id = this.get_report[0].id.$oid

        console.log(this.get_report[0].id)
        console.log(this.get_report)
        console.log(this.get_report[0])

        this.myLoader = true;
  
        this.service.put_rreport(this.get_report[0]).subscribe(res =>{
          console.log(res);
          this.myLoader = false;
        
         Swal.fire("Updated Successfully")
   
        })
      
    
  

  }

}

 
@Component({
  selector: 'add-page',
  templateUrl: 'add.html',
  styleUrls: ['./quality.component.scss']

 
})
export class Add {
  value: any;
  get_report: any;
  VAP:any;
  g_report:any;
  enableEdit = false;
  enableEditIndex = null;
  actual:any;
  e_id:any;
  qshif:any;
  myLoader1 = false;
  qdat:any;
  qmachi:any;
  accept = new FormControl('', [Validators.required]);
  subtract:any;
  rejection = new FormControl('', [Validators.required]);
  rework = new FormControl('', [Validators.required]);
  isShown: boolean = false ;
  get_report1: any;
  get_reporting: any;
  datapost: any;
  constructor(private service: ReportService,public dialogRef: MatDialogRef<Add>, @Inject(MAT_DIALOG_DATA) public data: Add, private fb: FormBuilder,) {
    this.value = data;
    localStorage.setItem('edit_id', this.value.edit_user.id.$oid);

  
    this.e_id = localStorage.getItem('edit_id');
    this.qmachi = localStorage.getItem('QAMAC');

    this.qshif = localStorage.getItem('QASHI');

    this.qdat = localStorage.getItem('QADAT');
 
   }

   keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
    ngOnInit() {
this.myLoader1 = true;
      this.service.get_rreport(this.e_id).subscribe(res =>{
        this.g_report = res;
        console.log(this.g_report)
        this.myLoader1 = false;

        this.get_report = res.route_card_report;
        this.rejection = new FormControl(this.get_report.rejection, [Validators.required]);
        let data_rc = res.route_card_report;
        localStorage.setItem('edit_id', this.value.edit_user.id.$oid);
  
        for(let i=0; i<this.get_report.length; i++){
          this.VAP = this.get_report[i].mode;
          let data = this.get_report[i].mode;
          localStorage.setItem('role',this.get_report[i].mode);
  
        }
      })


      
     
    
    }
  toggleShow(i,val) {
    this.enableEdit = true; 
    this.enableEditIndex = i;
    console.log(val.rejection)
    this.rejection = new FormControl(val.rejection1, [Validators.required]);
    this.rework = new FormControl(val.rework, [Validators.required]);
    this.accept = new FormControl(val.accept, [Validators.required]);


    if(i){
      this.isShown = ! this.isShown;
    }
 }
 save(rep,j){
   console.log(this.accept.value)
   console.log(this.rework.value)
   console.log(this.rejection.value)
  //  console.log(this.reason.value)

  console.log(rep)
   this.e_id = localStorage.getItem('edit_id');

  //  this.g_report.push({'id':this.e_id});
  //  console.log(this.g_report)
  // var arraynew = ['Geeks', 'for', 'Geeks'];
    var obj = { 
      id:this.e_id
    }
  
   this.e_id = localStorage.getItem('edit_id');
  let index = this.g_report.route_card_report.indexOf(rep);
  console.log(rep.rejection)
  rep.rejection1 = parseInt(this.rejection.value);
    rep.rework = parseInt(this.rework.value);
    rep.accept = parseInt(this.accept.value);
    let addnumber = (rep.rejection1+ rep.rework + rep.accept)
    console.log(addnumber)
    this.subtract = (rep.actual - addnumber);
    console.log(this.subtract);
    rep.rejection = parseInt(this.subtract);

    if(addnumber > rep.actual){
      Swal.fire("Greater than actual Production")
    }
    else{

      this.g_report.id = this.e_id
      // this.g_report.edit_reason= [this.reason.value];

      this.g_report.route_card_report[index] = rep;
      console.log(this.g_report)
      this.myLoader1 = true;
       
      this.service.put_rreport(this.g_report).subscribe(res =>{
        this.myLoader1 = false;

       Swal.fire("Updated Successfully")
 
      })
    }
  


     let register = {
      "machine_name": this.qmachi,
      "shift_num": this.qshif,
      "date": this.qdat
    }
    this.myLoader1 = true;

    this.service.overall_report_ing(register).subscribe(res => {
       this.get_reporting = res;
       this.myLoader1 = false;

       this.datapost = this.get_reporting;
       this.get_report1 = res[0].route_card_report;

  

    })
     this.dialogRef.close();

     this.ngOnInit();
 }

  target(val){
  }
  // Swal.fire(res.phone_no[0])

  savep(){
    Swal.fire("Not access to enter Reject and rework.Because accept is 0")
  }
  edit1(){
    Swal.fire("Not access to enter Reject and rework.Because accept is 0")

  }
 
 
  }


  @Component({
    selector: 'edit-page',
    templateUrl: 'edit.html',
    styleUrls: ['./quality.component.scss']
  
  
  })
  export class Edit {
    
  
  
    constructor(public dialogRef: MatDialogRef<Edit>, @Inject(MAT_DIALOG_DATA) public data: Edit, private fb: FormBuilder,) {
    }
  
   
  
    ngOnInit() {
      
    }
   
  
    }
    @Component({
      selector: 'sedit-page',
      templateUrl: 'sedit.html',
      styleUrls: ['./quality.component.scss']
    
    
    })
    export class Sedit {
      
    
    
      constructor(public dialogRef: MatDialogRef<Sedit>, @Inject(MAT_DIALOG_DATA) public data: Sedit, private fb: FormBuilder,) {
      }
    
     
    
      ngOnInit() {
        
      }
     
    
      }

      @Component({
        selector: 'sadd-page',
        templateUrl: 'sadd.html',
        styleUrls: ['./quality.component.scss']
      
      
      })
      export class Sadd {
        
      
      
        constructor(public dialogRef: MatDialogRef<Sadd>, @Inject(MAT_DIALOG_DATA) public data: Sadd, private fb: FormBuilder,) {
        }
      
       
      
        ngOnInit() {
          
        }
       
      
        }
    
    