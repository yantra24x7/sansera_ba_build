import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../../Service/app/dashboard.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

declare var Highcharts: any;

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {

  count_machine:any;
  a_dashboard:any; 
  valuen:any; 
  data:any;
  ltime:any;
  s_num:any;
  myLoader = false;
  today: number = Date.now();

  constructor(private router:Router,private nav:NavbarService,private service: DashboardService) {
    this.nav.show();
    setInterval(() => {this.today = Date.now()}, 1);


   }

  ngOnInit() { 

    this.service.andon().pipe(untilDestroyed(this)).subscribe(res=>{
    
      this.a_dashboard = res;
      this.myLoader = false;
      for(let i in this.a_dashboard){
       this.ltime = this.a_dashboard[i].show_time;
       this.s_num = this.a_dashboard[i].shift_no;

      
    }
      for(let i in this.a_dashboard){
        this.valuen = this.a_dashboard[i].status;
        for(let j in this.a_dashboard[i].status){

         this.data = this.a_dashboard[i].status[j].machine; 
      }
     }
     })

    setInterval(() => {         
      //replaced function() by ()=>
      this.service.andon().pipe(untilDestroyed(this)).subscribe(res=>{
    
        this.a_dashboard = res;
        for(let i in this.a_dashboard){
          this.ltime = this.a_dashboard[i].show_time;
          this.s_num = this.a_dashboard[i].shift_no;
   
         
       }
        for(let i in this.a_dashboard){
          this.valuen = this.a_dashboard[i].status;
          for(let j in this.a_dashboard[i].status){
 
           this.data = this.a_dashboard[i].status[j].machine; 
        }
       }
       })
      // just testing if it is working
    }, 30000);


  



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

  refresh(){
    location.reload();
  }
  char(line){
     
    localStorage.setItem('line_name',line);
    this.router.navigate(['/dashboardline'], { queryParams: { line_name: line } });

  }

 

  ngOnDestroy() { }
}

