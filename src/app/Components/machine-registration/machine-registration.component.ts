import { Component, OnInit, Inject } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import Swal from 'sweetalert2'
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MachineService } from 'src/app/Service/app/machine.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-machine-registration',
  templateUrl: './machine-registration.component.html',
  styleUrls: ['./machine-registration.component.scss']
})
export class MachineRegistrationComponent implements OnInit {

  machine_list: any;
  myLoader = false; 
  VAP:any;
  constructor(private fb: FormBuilder, private nav: NavbarService, public dialog: MatDialog, private machine: MachineService,private toast: ToastrService) {
    this.nav.show()
  }

  setting_spiesd_view(machine){
    this.machine.m_get_sett(machine.L0Name).pipe(untilDestroyed(this)).subscribe(res => {
      this.VAP = res[1];
      if(res[0] && res [1]){
        this.toast.success('Servo Load and Spindle Speed created successfully')
      }        
      this.getMachines();

    
        })
  }
  edit_view(data1) {
    const dialogRef = this.dialog.open(Edit, {
      width: '',
      data: data1

      // data: { serverlist: this.webApi.getServerList() }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  setting_viewnew(data2) {
    const dialogRef = this.dialog.open(Sadd, {
      width: '950px',

      data: data2

      // data: { serverlist: this.webApi.getServerList() }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(); 
    });
  }


  setting_view_new(data2) {
    const dialogRef = this.dialog.open(Sedit, {
      width: '700px',
      data: data2

      // data: { serverlist: this.webApi.getServerList() }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  setting_view(data2) {
    const dialogRef = this.dialog.open(Add, {
      width: '950px',
      //  height:'650px',
      data: data2

      // data: { serverlist: this.webApi.getServerList() }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  ngOnInit() {
    this.getMachines();
  }
  getMachines() {
    this.myLoader = true;

    this.machine.machine_get().pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader = false;

      this.machine_list = res;
    })
  }
  delete() {
    Swal.fire('Are you sure want to delete?')
  }
  ngOnDestroy() { }

}



@Component({
  selector: 'edit-page',
  templateUrl: 'edit.html',
  // styleUrls: ['./user-management.component.scss']

})
export class Edit {
  reasonforum: FormGroup;
  id: any;
  edit_data1: any;
  constructor(public dialogRef: MatDialogRef<Edit>, @Inject(MAT_DIALOG_DATA) public data1: Edit, private fb: FormBuilder, private machine: MachineService, private toast: ToastrService) {
    this.edit_data1 = data1;
    this.id = data1.id.$oid;
   

  }


  ngOnInit() {
    this.reasonforum = this.fb.group({
      machine: [this.edit_data1.L0Name],
      ip: [this.edit_data1.ip],
      line: [this.edit_data1.line],
    })
  }

  submit() {


    let register = {
      "machine": this.reasonforum.value.machine,
      "ip": this.reasonforum.value.ip,
      "line": this.reasonforum.value.line,
      "id": this.id
    }
    this.machine.lines(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.toast.success('Updated Successfully')
      this.dialogRef.close();


    })
  }

  cancel() {
    this.dialogRef.close();

  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnDestroy() { }
}


@Component({
  selector: 'add-page',
  templateUrl: 'add.html',
  styleUrls: ['./machine-registration.component.scss']

})
export class Add {
  edit_data2: any;
  settingform: FormGroup;
  notificationSettings: any;
  VAP:any;
  myLoader1 = false; 

  enableEdit1:any;
  mac_id:any;
  operator_id = new FormControl('', [Validators.required]);
  route_card = new FormControl('', [Validators.required]);
  operation_number = new FormControl('', [Validators.required]);
  idle_reason = new FormControl('', [Validators.required]);
  rejection1 = new FormControl('', [Validators.required]);
  rework = new FormControl('', [Validators.required]);
  lockMS:any;
  get_macro:any;
  constructor(public dialogRef: MatDialogRef<Edit>, @Inject(MAT_DIALOG_DATA) public data2: Add, private fb: FormBuilder, private machine: MachineService, private toast: ToastrService) {
    this.edit_data2 = data2;
  }


  ngOnInit() {

    this.machine.man_get_sett(this.edit_data2.L0Name).pipe(untilDestroyed(this)).subscribe(res => {
      this.lockMS = res[2];
      
      


      localStorage.setItem('Macro_var', res[2]._id.$oid);

    

      this.get_macro = res[2];
      this.operator_id = new FormControl(this.get_macro.signal[0].operator_id, [Validators.required]);
      this.route_card = new FormControl(this.get_macro.signal[1].route_card, [Validators.required]);
      this.operation_number = new FormControl(this.get_macro.signal[2].operation_number, [Validators.required]);
      this.idle_reason = new FormControl(this.get_macro.signal[3].idle_reason, [Validators.required]);
      this.rejection1 = new FormControl(this.get_macro.signal[4].rejection, [Validators.required]);
      this.rework = new FormControl(this.get_macro.signal[5].rework, [Validators.required]);
      // this.myLoader1 = false;


          })
 
   
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  toggleShow1() {
    this.enableEdit1 = true;
}
  savemacro(macname){
    this.mac_id = localStorage.getItem('Macro_var');
  
  
  
    let donw = {'operator_id':this.operator_id.value,'route_card':this.route_card.value,'operation_number':this.operation_number.value,'idle_reason':this.idle_reason.value,'rejection':this.rejection1.value,'rework':this.rework.value}
  
    let empty =[]
  
    let operator_id = {'operator_id':this.operator_id.value}
    let route_card = {'route_card':this.route_card.value}
    let operation_number = {'operation_number':this.operation_number.value}
    let idle_reason = {'idle_reason':this.idle_reason.value}
    let rejection = {'rejection':this.rejection1.value}
    let rework = {'rework':this.rework.value}
  
  
    empty.push(operator_id)
    empty.push(route_card)
    empty.push(operation_number)
    empty.push(idle_reason)
    empty.push(rejection)
    empty.push(rework)
  
    let value =[]
    value.push(donw)
    let volk = {"signal":empty}
    let test = {'L1Name': macname, 'id':this.mac_id ,'signal':empty,'value':value}
  
  let testing ={"machine_setting":test}
  
  this.myLoader1 = true;
  
    this.machine.update_macro_axis(this.mac_id,testing).pipe(untilDestroyed(this)).subscribe(res => {
  
      Swal.fire("updated successfully")
      this.dialogRef.close();
  
    })
    this.myLoader1 = false;
  
  }
  

 
  ngOnDestroy() { }

}




@Component({
  selector: 'sadd-page',
  templateUrl: 'sadd.html',
  styleUrls: ['./machine-registration.component.scss']

})
export class Sadd {
  edit_data2: any;
  settingform: FormGroup;
  notificationSettings: any;
  get_load:any;
  get_res:any;
  get_load1:any;
  servlo_id:any;
  get_macro:any;
  myLoader1 = false; 
  signal:FormGroup;
  enableEdit:any;
  enableEdit1:any;
  mac_id:any;
  lockMS:any;
  operator_id = new FormControl('', [Validators.required]);
  route_card = new FormControl('', [Validators.required]);
  operation_number = new FormControl('', [Validators.required]);
  idle_reason = new FormControl('', [Validators.required]);
  rejection1 = new FormControl('', [Validators.required]);
  rework = new FormControl('', [Validators.required]);
  a_axis = new FormControl('', [Validators.required]);
  b_axis = new FormControl('', [Validators.required]);
  x_axis = new FormControl('', [Validators.required]);
  y_axis = new FormControl('', [Validators.required]);
  z_axis = new FormControl('', [Validators.required]);
 
  rejection = new FormControl('', [Validators.required]);
  spi_id:any;
  constructor(public dialogRef: MatDialogRef<Sadd>, @Inject(MAT_DIALOG_DATA) public data2: Add, private fb: FormBuilder, private machine: MachineService, private toast: ToastrService) {
    this.edit_data2 = data2;

    this.machine.m_get_sett(this.edit_data2.L0Name).pipe(untilDestroyed(this)).subscribe(res => {
  localStorage.setItem('spindle_id', res[0]._id.$oid);
  localStorage.setItem('servlo_load', res[1]._id.$oid); 
  this.get_load = res[0];

  this.rejection = new FormControl(this.get_load.max, [Validators.required]);

  this.get_load1 = res[1];
  this.a_axis = new FormControl(this.get_load1.signal[0].a_axis, [Validators.required]);
  this.b_axis = new FormControl(this.get_load1.signal[0].b_axis, [Validators.required]);
  this.x_axis = new FormControl(this.get_load1.signal[0].x_axis, [Validators.required]);
  this.y_axis = new FormControl(this.get_load1.signal[0].y_axis, [Validators.required]);
  this.z_axis = new FormControl(this.get_load1.signal[0].z_axis, [Validators.required]);
    })

    // this.myLoader1 = true;

    // this.machine.man_get_sett(this.edit_data2.L0Name).pipe(untilDestroyed(this)).subscribe(res => {
    //   this.lockMS = res[2];
    //   console.log(this.lockMS);
    //   console.log(res[2]._id.$oid);
      


    //   localStorage.setItem('Macro_var', res[2]._id.$oid);

    

    //   this.get_macro = res[2];
    //   console.log(this.get_macro);
    //   this.operator_id = new FormControl(this.get_macro.signal[0].operator_id, [Validators.required]);
    //   this.route_card = new FormControl(this.get_macro.signal[1].route_card, [Validators.required]);
    //   this.operation_number = new FormControl(this.get_macro.signal[2].operation_number, [Validators.required]);
    //   this.idle_reason = new FormControl(this.get_macro.signal[3].idle_reason, [Validators.required]);
    //   this.rejection1 = new FormControl(this.get_macro.signal[4].rejection, [Validators.required]);
    //   this.rework = new FormControl(this.get_macro.signal[5].rework, [Validators.required]);
    //   // this.myLoader1 = false;


    //       })
   
  }
  Slide(m_name){
    this.servlo_id = localStorage.getItem('servlo_load');
   let GOD = {'a_axis':this.a_axis.value,'b_axis':this.b_axis.value,'x_axis':this.x_axis.value,'y_axis':this.y_axis.value,z_axis:this.z_axis.value}


    let checked =[]

    checked.push(GOD)

    let aaxisom = {'L1Name': m_name, 'id':this.servlo_id ,'signal':checked}
    let aaxis13 = {"machine_setting":aaxisom}


    this.machine.update_axis(this.servlo_id,aaxis13).pipe(untilDestroyed(this)).subscribe(res => {
      Swal.fire("updated successfully")

      this.dialogRef.close();

    })

  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 save(lname){
  this.spi_id = localStorage.getItem('spindle_id');

 


   
   let data = {'L1Name': lname, 'id':this.spi_id ,'max':this.rejection.value }
   this.myLoader1 = true;

   let data1 = {"machine_setting":data}
   this.machine.update_spindle(this.spi_id,data1).pipe(untilDestroyed(this)).subscribe(res => {
this.myLoader1 = false;

Swal.fire('Updated successfully')
this.dialogRef.close();
 
   })
 }
 notify1(val,a_axis,status,mac_name)
 {
  //  this.servlo_id = localStorage.getItem('servlo_load');
  //  console.log(status.checked,mac_name,this.servlo_id);

   let aaxis = {'L1Name': mac_name, 'id':this.servlo_id ,'signal':val}
   let aaxis1 = {"machine_setting":aaxis}

// this.machine.update_axis(this.servlo_id,aaxis1).pipe(untilDestroyed(this)).subscribe(res => {

//   console.log(res);
// })

 }

  toggleShow() {
    this.enableEdit = true;
}

savemacro(macname){
  this.mac_id = localStorage.getItem('Macro_var');

 


  let donw = {'operator_id':this.operator_id.value,'route_card':this.route_card.value,'operation_number':this.operation_number.value,'idle_reason':this.idle_reason.value,'rejection':this.rejection1.value,'rework':this.rework.value}

  let empty =[]

  let operator_id = {'operator_id':this.operator_id.value}
  let route_card = {'route_card':this.route_card.value}
  let operation_number = {'operation_number':this.operation_number.value}
  let idle_reason = {'idle_reason':this.idle_reason.value}
  let rejection = {'rejection':this.rejection1.value}
  let rework = {'rework':this.rework.value}


  empty.push(operator_id)
  empty.push(route_card)
  empty.push(operation_number)
  empty.push(idle_reason)
  empty.push(rejection)
  empty.push(rework)

  let value =[]
  value.push(donw)
  let volk = {"signal":empty}
  let test = {'L1Name': macname, 'id':this.mac_id ,'signal':empty,'value':value}

let testing ={"machine_setting":test}

this.myLoader1 = true;

  this.machine.update_macro_axis(this.mac_id,testing).pipe(untilDestroyed(this)).subscribe(res => {

    Swal.fire("updated successfully")
    this.dialogRef.close();

  })
  this.myLoader1 = false;

}

toggleShow1() {
  this.enableEdit1 = true;
}
  ngOnInit() {


  }
 



  

  
  cancel() {
    this.dialogRef.close();

  }
  ngOnDestroy() { }

}






@Component({
  selector: 'sedit-page',
  templateUrl: 'sedit.html',
  // styleUrls: ['./user-management.component.scss']

})
export class Sedit {
  settingform: FormGroup;
  id: any;
  edit_data1: any;
  constructor(public dialogRef: MatDialogRef<Sedit>, @Inject(MAT_DIALOG_DATA) public data1: Sedit, private fb: FormBuilder, private machine: MachineService, private toast: ToastrService) {
    this.edit_data1 = data1;
    this.id = data1.id.$oid;
   

  }


  ngOnInit() {
    this.settingform = this.fb.group({
      L1Name: [this.edit_data1.L0Name],
      operator_id: ["",],
      route_card: ["",],
      operation_number: ["",],
      idle_reason: ["",],
      rejection: ["",],
      rework: ["",],
   


    })
  }

  submit()
  {
    let data = {
      "L1Name": this.settingform.value.L1Name,
      "operator_id": this.settingform.value.operator_id,
      "route_card" : this.settingform.value.route_card,
      "operation_number" : this.settingform.value.operation_number,
      "idle_reason" : this.settingform.value.idle_reason,
      "rejection" : this.settingform.value.rejection,
      "rework" : this.settingform.value.rework,

    }

    this.machine.add_m_set_ing(data).pipe(untilDestroyed(this)).subscribe(res => {
      this.toast.success('Added Successfully')
      this.dialogRef.close();
    });
  }
  cancel() {
    this.dialogRef.close();

  }


  ngOnDestroy() { }
}

