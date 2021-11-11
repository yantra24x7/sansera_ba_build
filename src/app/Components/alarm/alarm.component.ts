import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { PageEvent, MatPaginator} from '@angular/material/paginator';
import { AlarmService} from '../../Service/app/alarm.service';
import { MatSort,MatTableDataSource,} from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import Swal from 'sweetalert2';
import { ExportService } from '../shared/export.service'; 


declare var gtag;

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {
  alarmHistory: any; 
  pageNo: any;
  export_excel: any[] = [];

  page_size= 20;
  searchText :any =[];
  reason:any;
    pageSizeOptions:any;
  total_count: any;
  displayedColumns: string[] = [ 'machine', 'alarmtype', 'axis','date','enddate','time'];
  dataSource = new MatTableDataSource();
  myLoader = false;
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
 
  constructor(private nav:NavbarService,private alarmService:AlarmService,private exportService: ExportService) {
    this.nav.show();
   }
  //  pageEvent: PageEvent;

  ngOnInit() {


  

    this.getAlarmHistory();
  }
  getAlarmHistory() {
    this.myLoader = true;
      this.pageNo =1;
   this.alarmService.alarm_history(this.pageNo,this.searchText).pipe(untilDestroyed(this)).subscribe( res => {
     
     this.myLoader = false;

     this.alarmHistory = res.alarm_histories;
     this.dataSource = new MatTableDataSource(this.alarmHistory);
    this.total_count =res.alarms_count;

   })
  }
  pageEvent(e){
    this.myLoader = true;
   
    this.pageNo = e.pageIndex+1;
    this.alarmService.alarm_history(this.pageNo,this.searchText).pipe(untilDestroyed(this)).subscribe( res => {
   
      this.myLoader = false;
     this.alarmHistory = res.alarm_histories;
      this.dataSource = new MatTableDataSource(this.alarmHistory);
    })
  }

  search(value?){

    if(value.length>= 3){
      this.searchText = value;
     
      this.myLoader = true;
  
      this.alarmService.alarm_history(this.pageNo,this.searchText,).pipe(untilDestroyed(this)).subscribe(res =>{
        this.myLoader = false;
        this.alarmHistory = res.alarm_histories;
        this.dataSource = new MatTableDataSource(this.alarmHistory);
        this.reason=res;
        this.total_count =res.alarms_count;

      })  
    }
  }
  downlosd(){
    Swal.fire("Download Successfully")
  }

  export(){


    this.alarmService.alarm_history4().pipe(untilDestroyed(this)).subscribe( res => {
      
 
      this.alarmHistory = res.alarm_histories;
     this.total_count =res.alarms_count;
 
      if(this.alarmHistory.length==0){
       Swal.fire('Exporting!, No Data Found')
     }else{
     for(var i=0;i<this.alarmHistory.length;i++){
       Swal.fire('Download Successfully')
 
       this.export_excel.push({
          "S.No": i+1,
 
 
  
 
       });
     }
       this.exportService.exportAsExcelFile(this.export_excel, 'Efficiency Report Details');
   }
   })
 
  }
  ngOnDestroy() {}
}
