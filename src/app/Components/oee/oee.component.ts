import { Component, OnInit, Inject } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { OeeService } from 'src/app/Service/app/oee.service';
import { MatSort, MatTableDataSource, } from '@angular/material';
import { FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-oee',
  templateUrl: './oee.component.html',
  styleUrls: ['./oee.component.scss']
})
export class OeeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'machine', 'alarmtype', 'axis', 'date', 'time', 'quality', 'action'];
  oee: any;
  myLoader = false;
  table: any;
  idle:any;
  dataSource = new MatTableDataSource();
  constructor(private service: OeeService, private nav: NavbarService, public dialog: MatDialog, private toast: ToastrService) {
    this.nav.show()
  }

  ngOnInit() {

    this.service.oee().subscribe(res => {
      this.oee = res;
      this.idle = res.idle_run_rate

      this.dataSource = new MatTableDataSource(this.oee);

    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(Add, {
      width: '600px',
      data: { new: 'new' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  shift_edit(shift, id) {
    const dialogRef = this.dialog.open(Add, {
      width: '450px',
      data: { edit_shift: shift, shift_id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  user_delete(id) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.user_delete(id).subscribe(res => {
          this.toast.success('Deleted Successfully');
          this.ngOnInit();
        },

        );
      }
    });
  }
}



@Component({
  selector: 'add-page',
  templateUrl: 'add.html',
  styleUrls: ['./oee.component.scss']
})
export class Add {

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
  form: any;
  startDate: any;
  data_array: any;
  array: any;
  data1: any;
  data2: any = [];
  sampletest: any;
  tenant: any;
  list: any;
  machineID: any;
  allocation: any;
  machine: any;
  shift: any;
  login: FormGroup;
  shift_response: any;
  machine_response: any;
  count = 0;
  time = 0;
  actual_hour = 0;
  balance = 0;
  value: any;
  operator_list: any;
  component_list: any;
  constructor(public dialogRef: MatDialogRef<Add>, @Inject(MAT_DIALOG_DATA) public data: Add, private fb: FormBuilder, private service: OeeService, private toast: ToastrService) {
    this.value = data;
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
    // }
    return result;
  };

  toSeconds = hours => {
    let a = hours.split(':');
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return seconds;
  }

  ngOnInit() {
    this.service.operator().subscribe(res => {
      this.operator_list = res;
    })
    this.service.component().subscribe(res => {
      this.component_list = res;
    })
    this.service.machines().subscribe(res => {
      this.machine_response = res;
      // for (let i = 0; i < this.machine_response.length; i++) {
      //   if (this.value.edit_shift.machine_name == this.machine_response[i].name) {
      //     this.value.edit_shift.machine_name = this.machine_response[i].name
      //     console.log(this.value.edit_shift.machine_name)
      //   }
      // }
      // console.log(res.name)
    })

    this.service.shift().subscribe(res => {
      this.shift_response = res;
      // for (let i = 0; i < this.shift_response.length; i++) {
      //   if (this.value.edit_shift.shift_num == this.shift_response[i].shift_no) {
      //     this.value.edit_shift.shift_num = this.shift_response[i].shift_no
      //     console.log(this.value.edit_shift.shift_num)
      //   }
      // }
    })

    if (this.value.new) {
      this.login = this.fb.group({
        machine_name: ["", Validators.required],
        shift_num: ["", Validators.required],
        date: ["", Validators.required],
        operator: ["", Validators.required],
        component: ["", Validators.required],
        target: ["", Validators.required],
        availability: ["", Validators.required],
        total_runtime: ["", Validators.required],
        balance: ["", Validators.required],
        idle_run_rate: this.fb.array([this.createItem()])
      })
    } else {
      this.login = this.fb.group({
        machine_name: [this.value.edit_shift.machine_name,],
        shift_num: [this.value.edit_shift.shift_num,],
        date: [this.value.edit_shift.date,],
        operator: [this.value.edit_shift.operator,],
        component: [this.value.edit_shift.component,],
        target: [this.value.edit_shift.target,],
        availability: [this.value.edit_shift.availability,],
        total_runtime: [this.value.edit_shift.total_runtime,],
        balance: [this.value.edit_shift.balance,],
        idle_run_rate: this.fb.array([this.createItem()])
      })
    }
  }

  getcomponent(id) {
    this.service.componentById(id).subscribe(res => {
      this.idle_run_rate.controls[0].patchValue({ program_number: res.program_number, run_rate: res.time_run_rate })
    })
  }

  createItem(): FormGroup {
    if (this.value.new) {
      return this.fb.group({
        run_rate: ['', Validators.required],
        program_number: ['', Validators.required],
        cycle_time: ['', Validators.required],
        count: ['', Validators.required]
      });
    } else {
      return this.fb.group({
        run_rate: [this.value.edit_shift.idle_run_rate[0].run_rate],
        program_number: [this.value.edit_shift.idle_run_rate[0].program_number],
        cycle_time: [this.value.edit_shift.idle_run_rate[0].cycle_time],
        count: [this.value.edit_shift.idle_run_rate[0].count]
      });
    }
  }
  get idle_run_rate(): FormArray {
    return this.login.get('idle_run_rate') as FormArray;
  }

  add() {
    this.idle_run_rate.push(this.createItem());
  }

  getShiftTime(event) {
    this.actual_hour = event.value.actual_hour;
    // this.toSeconds(event.value.total_hour)
    this.login.patchValue({
      availability: event.value.actual_hour,
      balance: event.value.actual_hour,
    })
  }

  removeQuestion(i) {
    this.idle_run_rate.removeAt(i);
  }
  timeCalculation(i) {
    let time = this.toSeconds(this.idle_run_rate.controls[i]['controls'].run_rate.value) * this.idle_run_rate.controls[i]['controls'].count.value;
    this.idle_run_rate.controls[i].patchValue({ cycle_time: this.toHoursMinutesSeconds(time) })
    this.count = 0;
    this.time = 0;
    this.idle_run_rate.controls.map((field, index) => {
      // if (i === index) {
      if (field.value.count) {
        this.count += parseInt(field.value.count);
        this.login.patchValue({
          target: this.count
        })
      } else {
        this.login.patchValue({
          target: 0
        })
      }
      if (field.value.cycle_time) {
        this.time += this.toSeconds(field.value.cycle_time);
        this.balance = this.toSeconds(this.actual_hour) - this.time;
        this.login.patchValue({
          total_runtime: this.toHoursMinutesSeconds(this.time),
          balance: this.toHoursMinutesSeconds(this.balance)
        })
      }
      // }
    })
  }
  logintest() {

    if (this.value.new) {
      this.login.value.idle_run_rate.map((field, index) => {
        if (field.cycle_time) {
          field.cycle_time = this.toSeconds(field.cycle_time)
        }
        if (field.run_rate) {
          field.run_rate = this.toSeconds(field.run_rate)
        }
      })
      this.data_array = {
        "date": this.login.value.date,
        "machine_name": this.login.value.machine_name.name,
        "shift_num": this.login.value.shift_num.shift_no,
        "target": this.login.value.target,
        "availability": this.toSeconds(this.login.value.availability),
        "total_runtime": this.toSeconds(this.login.value.total_runtime),
        "balance": this.toSeconds(this.login.value.balance),
        "idle_run_rate": this.login.value.idle_run_rate,
        "shift_id": this.login.value.shift_num.id.$oid,
        "l0_setting_id": this.login.value.machine_name.id.$oid
      };
      this.service.valuepost(this.data_array).subscribe(res => {
        this.dialogRef.close();
      })
    } else {
      this.service.shift_put(
        this.login.value.edit_shift, this.value.shift_id).subscribe(res => {
          this.dialogRef.close();
        })
    }
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
