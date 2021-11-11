import { Component, OnInit, Inject } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatTableDataSource } from '@angular/material';
import { OperatorService } from 'src/app/Service/app/operator.service';
import { DatePipe } from '@angular/common';
import { OeeService } from 'src/app/Service/app/oee.service';
import { ToastrService } from 'ngx-toastr';

export interface Operator { }

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  myLoader = false;
  operators: any;
  seconds = true;
  displayedColumns: string[] = ['machine_name', 'component_name', 'id', 'cycle_time', 'target', 'multiplication_factor', 'action'];
  dataSource = new MatTableDataSource();
  pageNo: any;
  total_count: any;
  constructor(private datepipe: DatePipe, private nav: NavbarService, private fb: FormBuilder, public dialog: MatDialog, private operator_service: OperatorService, private toast: ToastrService) {
    this.nav.show();
  }

  ngOnInit() {
    this.getOperators();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(operator, {
      width: '450px',
      height: 'auto',
      data: { new: 'new' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getOperators();
    });
  }

  getOperators() {
    this.pageNo = 1;

    this.myLoader = true;
    this.operator_service.component_get().pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader = false;
      this.operators = res;
      this.dataSource = new MatTableDataSource(this.operators);
      this.total_count = res.operator_count;

    })
  }


 

  operator_edit(data, id) {
    const dialogRef = this.dialog.open(operator, {
      width: '450px',
      height: 'auto',
      data: { edit_component: data, operator_id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getOperators();
    });
  }


  operator_delete(id) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.operator_service.component_delete(id).pipe(untilDestroyed(this)).subscribe(res => {
          this.toast.success('Deleted Successfully');
          this.ngOnInit();
        }, error => {
          this.toast.error('Something Went Wrong');
        });
      }
    });
  }

  ngOnDestroy() { }

}



@Component({
  selector: 'operator',
  templateUrl: 'operator.html',
  styleUrls: ['./component.component.scss']
})


export class operator {

  componentForm: FormGroup;
  value: any;
  seconds = true;
  idle_run_rate: any;
  machine_list: any;
  machines: any;
  constructor(private datepipe: DatePipe, public dialogRef: MatDialogRef<operator>, @Inject(MAT_DIALOG_DATA) public data: Operator, private fb: FormBuilder, private operator: OperatorService, private service: OeeService, private toast: ToastrService) {
    this.value = data;
  }


  ngOnInit() {
    this.getmachineList();
    if (this.value.new) {
      this.componentForm = this.fb.group({
        name: ["", Validators.required],
        spec_id: ["", Validators.required],
        target: ["", Validators.required],
        multiplication_factor: [1, Validators.required],
        L0_name: ["", Validators.required],
        cycle_time: ["", Validators.required],
      })
    } else {
      this.componentForm = this.fb.group({
        name: [this.value.edit_component.name, Validators.required],
        spec_id: [this.value.edit_component.spec_id, Validators.required],
        target: [this.value.edit_component.target, Validators.required],
        multiplication_factor: [this.value.edit_component.multiplication_factor, Validators.required],
        L0_name: [this.value.edit_component.L0_name, Validators.required],
        cycle_time: [this.Time(this.value.edit_component.cycle_time_factor), Validators.required],
      })
    }
  }

  getmachineList() {
    this.service.machines().subscribe(res => {
      this.machine_list = res;
      this.machines = res;
    });
  }

  search_machines(event) {
    let value = event.trim().toLowerCase();
    this.machine_list = this.machines.filter(machine => machine.name.toLowerCase().indexOf(value) > -1);
    if (this.machine_list.length === 0) {
      this.componentForm.patchValue({
        L0_name: "",
      })
    }
  }
  Time(time) {
    if (!time) {
      return null;
    }
    const split = time.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }
  convertTime(time) {
    let hour;
    if (time.hour >= 12) {
      hour = time.hour - 12;
    } else {
      hour = time.hour;
    }
    const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
    return time != null ? `${pad(hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
  }
  submit() {
    if (this.componentForm.invalid) {
      return;
    }
    let data = this.componentForm.value;
    data.cycle_time = this.convertTime(this.componentForm.value.cycle_time);
    // let data={
    //   "name":this.componentForm.value.name,
    //   "spec_id": this.componentForm.value.spec_id,
    //   "idle_run_rate":  register.idle_run_rate,
    //   "program_number":this.componentForm.value.program_number,

    // }
    if (this.value.new) {
      this.operator.component_create(data).pipe(untilDestroyed(this)).subscribe(res => {
        this.toast.success('Created Successfully');
        this.dialogRef.close();
      })
    } else {
      this.operator.component_put(data, this.value.operator_id).pipe(untilDestroyed(this)).subscribe(res => {
        this.toast.success('Updated Successfully');
        this.dialogRef.close();
      })
    }
  }


  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  ngOnDestroy() { }


}
