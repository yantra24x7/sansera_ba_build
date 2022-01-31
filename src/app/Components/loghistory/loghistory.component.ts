import { Component, OnInit, Inject } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/Service/app/user.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ToastrService } from 'ngx-toastr';
import { PageEvent, MatPaginator} from '@angular/material/paginator';
import { LogService } from 'src/app/Service/app/loghistory.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loghistory',
  templateUrl: './loghistory.component.html',
  styleUrls: ['./loghistory.component.scss']
})
export class LoghistoryComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'email', 'phone_no', 'role', 'action'];
  dataSource = new MatTableDataSource();
  users: any;
  roles: any;

  myLoader = false;
  pageNo: any;
  page_size= 10;
    pageSizeOptions:any;
  total_count: any;

  constructor(private nav: NavbarService, private fb: FormBuilder, public dialog: MatDialog, private userService: UserService, private toast: ToastrService,
    public router:Router) {
    this.nav.show();
  }
  ngOnInit() {
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    this.pageNo =1;

    this.userService.user_get(this.pageNo).pipe(untilDestroyed(this)).subscribe(res => {
      this.users = res.user_list;
      this.dataSource = new MatTableDataSource(this.users)
      this.total_count =res.user_count;

    })
  }

  pageEvent(e){
    this.myLoader = false;
    this.pageNo = e.pageIndex+1;
    this.userService.user_get(this.pageNo).pipe(untilDestroyed(this)).subscribe( res => {
      this.myLoader = false;
      this.users = res.user_list;

      this.dataSource = new MatTableDataSource(this.users)
      this.total_count =res.user_count;

    })
  }

  getRoles() {
    this.myLoader = true;
    this.userService.role_get().pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader = false;

      this.roles = res;
    })

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
        this.userService.user_delete(id).pipe(untilDestroyed(this)).subscribe(res => {
          this.toast.success('Deleted Successfully');
          this.ngOnInit();
        }, error => {
          this.toast.error('Something Went Wrong');
        });
      }
    });
  }
  user_edit(user, id) {
    localStorage.setItem("ids",JSON.stringify(user))
    this.router.navigate(['/logactivity'])
    // const dialogRef = this.dialog.open(modal, {
    //   width: '450px',
    //   height: 'auto',
    //   data: { edit_user: user, user_id: id }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getUsers();
    // });
  }
  ngOnDestroy() { }
}
