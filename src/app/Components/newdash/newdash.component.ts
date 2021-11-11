import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { DashboardService } from '../../Service/app/dashboard.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormGroup, FormBuilder,Validators,FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'

declare var Highcharts: any;
@Component({
  selector: 'app-newdash',
  templateUrl: './newdash.component.html',
  styleUrls: ['./newdash.component.scss']
})
export class NewdashComponent implements OnInit {
  maxDate:any;
  dat1:any;
  a_dashboard:any;
  shift_response1:any;
  addEvent:any;
  startDate:any; 
  count_machine:any;
  a_dashboard1:any; 
  valuen:any; 
  data:any;
  s_num:any;
  ltime:any;
  shift_num = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  takohkol :any;
  myLoader = false;
  today: number = Date.now();
  shift_response:any;
  constructor(private datepipe: DatePipe,private nav:NavbarService,private service: DashboardService) {
    this.nav.show();
    setInterval(() => {this.today = Date.now()}, 1);


   }


  ngOnInit() {

    this.takohkol = "No data"


    this.service.getshift().subscribe(res => {
      this.shift_response = res;
    })
   this.myLoader = true;

    this.service.andon().pipe(untilDestroyed(this)).subscribe(res=>{
    
       this.a_dashboard1 = res;
      //  this.s_num = res.shift_no[0];
      //  this.ltime = res.show_time;
       this.myLoader = false;
    //    for(let i in this.a_dashboard){
    //     this.ltime = this.a_dashboard[i].show_time;
    //     this.s_num = this.a_dashboard[i].shift_no;

       
    //  }
    //    for(let i in this.a_dashboard){
    //      this.valuen = this.a_dashboard[i].status;
    //      for(let j in this.a_dashboard[i].status){

    //       this.data = this.a_dashboard[i].status[j].machine; 
    //    }
    //   }
      })



    this.service.machine_count().pipe(untilDestroyed(this)).subscribe(res=>{
      this.count_machine = res;
     
    })


    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: '#0e121b',
        spacingBottom: 0,
        spacingTop: 0,
        spacingRight: 0,
        spacingLeft: 0,
        // width: '100',
        height: '100%'
        
      },
      navigation: {
        buttonOptions: {
          x:-20,
          theme: {
            
            stroke: null,
            fill: '#fff',
            // r: ',
            states: {
              hover: {
                fill: '#2c2d31'
              },
              select: {
                fill: '#fff'
              }
            }
          }
        }
      },
      menuItemStyle: { padding: "0 10px", background: "none", color: "#303030" },
      legend: {
        itemStyle: {
            color: '#fff',
            
        }
    },
      credits: {
        enabled: false
      },
    /*  exporting: {
        enabled: true,
      },*/

        exporting: {
          buttons: {
            contextButton: {
                symbolStroke: "#fff",
                theme: {
        fill:"#2c2d31"
    }
            }
        }
      },

      title: {
        // text: 'Overall Machine Status'
        text: 'TU:'+ 35+' %',
        // align: 'center',
        // y: 70,
        style: {
          color: '#fff',
          
        }
      
      },
      subtitle: {
        text: 'TU:'+ 42+' %',
        align: 'center',
        y: 30,
        wrap: true,
        verticalAlign: 'middle',
        floating: true,
        style: {
          color: '#fff',
          fontSize: '14px' 
        }
    },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          colors: [
            '#269048',
            '#e8a249',
            '#2E2E2E'
            // '#E60B0B',
          ],
          dataLabels: {
            enabled: false,
            distance: -50,

          },
         /* borderColor: '#000000',
          // size: '100%'
          borderWidth:5*/
        }
      },
      series: [{
        type: 'pie',
        
        borderColor: '#0e121b',
        borderWidth:'1',
        // name: 'Browser share',
        color: 'white',
        innerSize: '80%',
        // data: [
        // ['Chrome', 58.9],
        // ['Firefox', 13.29],
        // ['Internet Explorer', 13],
        // ['Edge', 3.78],
        // ]
        // data: [
        //   ['Running',res.Running],

        //   ['Stop',res.Stop],
        //   ['Disconnect',res.Disconnect],

        // ]
         data: [1,2,3]
      }]

    }); 
  }


  getshift(shift){

console.log(shift)  

   
}

allselect(){
  this.dat1 = new DatePipe('en-US').transform(this.date.value, 'dd-MM-yyyy');
  this.myLoader = true;

  console.log(this.shift_num.value,this.date.value)
  this.service.getshift2(this.dat1,this.shift_num.value).subscribe(res => {
    this.shift_response1 = res;
    this.myLoader = false;

    this.a_dashboard = res;

    // Swal.fire(res.msg)


  })
  // http://3.7.120.8:3000/api/v1/prev_dashboards?date=02-08-2021&shift_no=3
}
  refresh(){
    location.reload();
  }
  // char(line){
     
  //   localStorage.setItem('line_name',line);
  //   this.router.navigate(['/dashboardline'], { queryParams: { line_name: line } });

  // }

 

  ngOnDestroy() { }
}

