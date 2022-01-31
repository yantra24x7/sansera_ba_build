import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NavbarService } from 'src/app/Nav/navbar.service';
import { LogService } from 'src/app/Service/app/loghistory.service';

@Component({
  selector: 'app-logdetails',
  templateUrl: './logdetails.component.html',
  styleUrls: ['./logdetails.component.scss']
})
export class LogdetailsComponent implements OnInit {
  displayedColumns: string[] = ['sno','username', 'email', 'ip', 'referrer', 'landingpage','startedate','devicetype'];
  dataSource = new MatTableDataSource();
  log: any;
  total_count: any;
  page_size= 10;
  id: any;
  pageNo: number;
  myLoader: boolean;
  pageSizeOptions:any;   
  constructor(public service:LogService,private nav: NavbarService,) {
    this.nav.show();
   }

  ngOnInit() {
    this.myLoader = true;
    this.id =JSON.parse(localStorage.getItem("ids"))
    console.log(this.id)
    this.pageNo =1;
    this.service.getlog(this.id._id.$oid,this.pageNo).pipe(untilDestroyed(this)).subscribe( res => {
      this.log=res['track']
      this.total_count=res['track_count']
      this.myLoader = false;
      console.log(res)
      this.dataSource = new MatTableDataSource(this.log)
    })
  }
  pageEvent(e){
    this.myLoader = true;
    this.id =JSON.parse(localStorage.getItem("ids"))
    console.log(this.id)
    this.pageNo = e.pageIndex+1;
    this.service.getlog(this.id._id.$oid,this.pageNo).pipe(untilDestroyed(this)).subscribe( res => {
    this.myLoader = false;
      this.log=res['track']
      this.total_count=res['track_count']
      console.log(res)
      this.dataSource = new MatTableDataSource(this.log)
    })
  }
ngOnDestroy(){

}
}
