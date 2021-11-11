import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,Inject } from '@angular/core';
import { ReasonLmwService } from '../../Service/app/reason-lmw.service';
import { NavbarService } from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reason-lmw',
  templateUrl: './reason-lmw.component.html',
  styleUrls: ['./reason-lmw.component.scss']
})
export class ReasonLmwComponent implements OnInit {
  reason_table:any;
  dialogRef: any;
  myLoader = false;
  serverDialogRef: any;
  constructor(private service:ReasonLmwService,public dialog: MatDialog,private nav:NavbarService,private toast:ToastrService) { 
    this.nav.show();

  }

  delete_view(id){
     Swal.fire({
       title: 'Are you sure want to delete?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, keep it',
     }).then((result) => {
       if (result.value) {
         this.service.delete_reason(id).subscribe(res => {
           this.ngOnInit();
 
           this.toast.success('Deleted Successfully');
          
           this.ngOnInit();
 
         }, );
         this.service.idle_reason().subscribe(res =>{
           this.reason_table = res;
         })
       }
     }); 
 
   }
  // user(): void {
  //   const dialogRef = this.dialog.open(User, {
  //     width: '450px',
  //     height: 'auto',
  //     // data: { new: 'new' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // this.getUsers();
  //   });
  // }
  openServerDialog() {

    let serverDialogRef = this.dialog.open(User, {
      width: '',
      // data: { serverlist: this.webApi.getServerList() }
    });
    serverDialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  onNoClick(): void {
    this.serverDialogRef.close();
  }
  edit_view(data1){
    this. dialogRef = this.dialog.open(Edit, {
      width: '',
      data:data1

      // data: { serverlist: this.webApi.getServerList() }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.myLoader = true;

    this.service.idle_reason().subscribe(res =>{
      this.myLoader = false;

      this.reason_table = res;

    })
  }

}
@Component({
  selector: 'user',
  templateUrl: 'user.html',
  // styleUrls: ['./user-management.component.scss']

})
export class User {
  is_active:any;
  reasonform:FormGroup
  constructor(private toast:ToastrService,private service:ReasonLmwService,public dialogRef: MatDialogRef<User>, @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder ) {}

  ngOnInit() {
  this.reasonform = this.fb.group({
     reason:["",Validators.required],
     code:["",Validators.required]
  })
  }
  
  submit(reasonform: FormGroup){
    this.is_active = true;
    // this.reasonform["is_active"] = this.is_active;
    let data = {'reason': this.reasonform.value.reason, 'is_active': this.is_active,'code':this.reasonform.value.code}
    this.service.post_api(data).subscribe(res =>{
      this.dialogRef.close();
      this.toast.success('Created Successfully')
    })
    }

    
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  cancel(){
    this.dialogRef.close();

  }
  }


  
  @Component({
    selector: 'edit-page',
    templateUrl: 'edit.html',
    // styleUrls: ['./user-management.component.scss']
  
  })
  export class Edit {
    edit_data1:any;
    is_active:any;
    reasonforum:FormGroup
    constructor(private toast:ToastrService,private service:ReasonLmwService,public dialogRef: MatDialogRef<Edit>, @Inject(MAT_DIALOG_DATA) public data1: any,private fb:FormBuilder ) {
      this.edit_data1 = data1;

    }

  
    ngOnInit() {
    this.reasonforum = this.fb.group({
       reason:[this.edit_data1.reason],
       code:[this.edit_data1.code]
    })
    }
    
    submit(){
      this.is_active = true;
    // this.reasonform["is_active"] = this.is_active;
      let data = { 'is_active': this.is_active,'reason': this.reasonforum.value.reason,'code':this.reasonforum.value.code}
      this.service.put_api(this.edit_data1.id.$oid,data).subscribe(res =>{
        this.dialogRef.close();
        this.toast.success('Updated Successfully')
      })
    }

    cancel(){
      this.dialogRef.close();

    }
    keyPress(event: any) {
      const pattern = /[0-9]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    }
  