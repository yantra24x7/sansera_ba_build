import { Component, OnInit, Inject } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';
import { ShiftService } from 'src/app/Service/app/shift.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
export interface Add { }
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  controls: any;
  myLoader = false;
  shifts: any;
  displayedColumns: string[] = ['start_time', 'end_time', 'total_hour','actual_hour','break_time','module','action'];
  dataSource = new MatTableDataSource();
  constructor(private nav: NavbarService, public dialog: MatDialog, private shift: ShiftService, private toast: ToastrService) {
    this.nav.show();
  }

  ngOnInit() {
    this.getShifts();
  }
  getShifts() {
    this.myLoader = true;

    this.shift.shift_get().pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader = false;

      this.shifts = res;
      this.dataSource = new MatTableDataSource(this.shifts);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Add, {
      width: '500px',
      data: { new: 'new' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getShifts();
    });
  }

  shift_edit(shift, id) {
    const dialogRef = this.dialog.open(Add, {
      width: '500px',
      data: { edit_shift: shift, shift_id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getShifts();
    });
  }

  shift_delete(id) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.shift.shift_delete(id).pipe(untilDestroyed(this)).subscribe(res => {
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
  selector: 'add-page',
  templateUrl: 'add.html',
  styleUrls: ['./shift.component.scss']


})
export class Add {
  shiftForm: FormGroup;
  difference: any;
  module_response:any;
  value: any;
  myLoader = false;
  meridian = true;
  seconds = true;
  end_day = [
    { name: 'Day 1', value: 1 },
    { name: 'Day 2', value: 2 },
  ]


  constructor(public dialogRef: MatDialogRef<Add>, @Inject(MAT_DIALOG_DATA) public data: Add, private fb: FormBuilder, private shift: ShiftService, private toast: ToastrService) {
    this.value = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    
    this.shift.getmodule().subscribe(res => {
      this.module_response = res;
    

      })
    if (this.value.new) {
      this.shiftForm = this.fb.group({
        start_time: ["", Validators.required],
        end_time: ["", Validators.required],
        break_time: ["", Validators.required],
        module:["", Validators.required],

        shift_no: ["", Validators.required],
        start_day: ["", Validators.required],
        end_day: ["", Validators.required],
      })
    } else {
      let shift = this.value.edit_shift;
      this.shiftForm = this.fb.group({
        start_time: [this.TimeAM(shift.start_time),Validators.required],
        end_time: [this.TimeAM(shift.end_time),Validators.required],
        break_time: [this.Time(shift.break_time),Validators.required],
        module:["", Validators.required],

        shift_no: [this.value.edit_shift.shift_no,Validators.required],
        start_day: [this.value.edit_shift.start_day,Validators.required],
        end_day: [this.value.edit_shift.end_day,Validators.required],
      })
    }
  }
  submit() {
    if (this.shiftForm.invalid) {
      return;
    }
    let data = this.shiftForm.value;
    data.start_time = this.convertTimeAM(this.shiftForm.value.start_time)
    data.end_time = this.convertTimeAM(this.shiftForm.value.end_time)
    data.break_time = this.convertTime(this.shiftForm.value.break_time)
    // var timeStart = new Date("01/01/2010 " + data.start_time);
    // var timeEnd = new Date("01/01/2010 " + data.end_time);
    // var difference = timeEnd - timeStart;
    // // var hours = Math.floor(difference / 1000 / 60 / 60);
    // var diff = difference * 1000 * 60 * 60;
    // var minutes = Math.floor(diff / 1000 / 60);


    if (this.value.new) {
      this.myLoader = true;
      this.shift.shift_create(data).pipe(untilDestroyed(this)).subscribe(res => {
        this.myLoader = false;
        if(res.msg){
        Swal.fire(res.msg);
      }
      else{
        Swal.fire("created Successfully");
      }
        this.dialogRef.close();
      })
    } else {
      this.myLoader = true;

      this.shift.shift_put(data, this.value.shift_id).pipe(untilDestroyed(this)).subscribe(res => {
        this.myLoader = false;

        this.toast.success('Updated Successfully')
        this.dialogRef.close();
      })
    }
  }

  end_day_validation(val) {
    if (val === '2') {
      this.end_day = [
        { name: 'Day 2', value: 2 },
      ]
    } else {
      this.end_day = [
        { name: 'Day 1', value: 1 },
        { name: 'Day 2', value: 2 },
      ]
    }

  }

  // convertTimeAM(time) {
  //   let AMPM;
  //   let hour;
  //   if (time.hour >= 12) {
  //     hour = time.hour - 12;
  //     AMPM = 'PM';
  //   } else {
  //     hour = time.hour;
  //     AMPM = 'AM';
  //   }
  //   const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
  //   return time != null ? `${pad(hour)}:${pad(time.minute)}:${pad(time.second)} ${AMPM}` : null;
  // }




  convertTimeAM(time) {
    let AMPM;
    let hour;
    if (time.hour >= 12) {
      if (time.hour > 12) {
        hour = time.hour - 12;
      } else if(time.hour == 12){
        hour = time.hour;
      }
      AMPM = 'PM';
    } else {
      hour = time.hour;
      AMPM = 'AM';
    }
    const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
    return time != null ? `${pad(hour)}:${pad(time.minute)}:${pad(time.second)} ${AMPM}` : null;
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

  TimeAM(time) {
    if (!time) {
      return null;
    }
    const split = time.split(':');
    const AM = time.split(' ');
    let hours;
    if (AM[1] === 'PM') {
      hours = parseInt(split[0], 10) + 12;
    } else {
      hours = parseInt(split[0], 10);
    }
    return {
      hour: hours,
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
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

  ngOnDestroy() { }


}