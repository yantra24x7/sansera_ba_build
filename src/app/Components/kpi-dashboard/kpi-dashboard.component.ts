import { Component, OnInit,AfterViewInit, ViewChild, AfterViewChecked,ViewChildren, ElementRef,   QueryList, HostListener} from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { AlarmService} from '../../Service/app/alarm.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-kpi-dashboard',
  templateUrl: './kpi-dashboard.component.html',
  styleUrls: ['./kpi-dashboard.component.scss'],
  providers: [NgbCarouselConfig] 
})
export class KpiDashboardComponent implements OnInit,  AfterViewChecked {
  @ViewChild('scrollBottom',{static: false}) private scrollBottom: ElementRef;

  ltime:any;
  change = 0;
  itemList : number[]=[];
    Highcharts: typeof Highcharts = Highcharts;
  machine_response:any;
  parts:any;allcycletime:any;
  hour:any;
  data:any[] =[];
  data1:any[] =[];
  content:any;
  higchart: any;
  myLoader = false;
  chart_loop:any;
  power: any;
  reflect: any;
  viewHeight: number;
  time: number;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 10,
    autoplay: true,
    animateOut: 'slideOutUp',
  animateIn: 'slideInUp',
        // autoplayTimeout: 5000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  // 620
  // 1160
  // 1680
  // 2210
  // 2750
  // 3280
  // 3830
  constructor(config: NgbCarouselConfig,private nav : NavbarService ,private http:HttpClient,private service:AlarmService) {
    this.nav.show();
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  
   }
   scrollToTop(el) {
    el.scrollTop = this.change;
   
}
  ngOnInit() {
    this.myLoader = true;
    console.log(this.change)
    this.service.god().subscribe(res =>{
      this.machine_response = res;
      console.log(this.change)

      this.ltime = this.machine_response[0].up_time;
      this.myLoader = false; 

      for(let i in this.machine_response){
        this.chart_loop = this.machine_response[i].data;
        this.data = []
        this.data1 = []

        for(let j in this.machine_response[i].data){
          this.data.push( this.machine_response[i].data[j].time);
         this.data1.push(this.machine_response[i].data[j].count);
        
         this.reflect = this.machine_response[i].status;
       
        }
      
         
          var name="partcycle" + i;
          
           
          Highcharts.chart(name, {
           chart: {
             renderTo: 'container'+ i,
             zoomType: 'xy',
             height: 120,
             // backgroundColor: ''
           },
           exporting: {
             enabled: false
           },
           credits: {
             enabled: false
           },
           title: {
             text: ''
           },
           subtitle: {
             text: ''
           },
           xAxis: [{
             categories: this.data,
             crosshair: false,
             labels: {
               enabled: true
             }
           }],
           yAxis: [{ // Primary yAxis
             gridLineColor: '#45B734',
             labels: {
               enabled: false,
               // style: {
               //   color: Highcharts.getOptions().colors[1]
               // }
             },
             title: {
               text: '',
               // style: {
               //   color: Highcharts.getOptions().colors[1]
               // }
             }
           },
           { // Secondary yAxis
             title: {
               text: '',
               // style: {
               //   color: Highcharts.getOptions().colors[0]
               // }
             },
     
             opposite: false
           }],
           tooltip: {
             shared: true
           },
         
           series: [{
             showInLegend: false,
             // borderColor: '#056B2D',
             name: 'Count',
             type: 'column',
             yAxis: 1,
             data: this.data1,
             color: this.reflect === 'OPERATE'? "#1EAD55" : this.reflect === 'DISCONNECT'? "#6D6D6D" : "#F81301",
             // color: "this.reflect === 'OPERATE'? #1EAD55 : this.reflect === 'DISCONNECT'? #6D6D6D : #F81301",
             tooltip: {
               valueSuffix: ' ',
             }
           }, 
           {
             showInLegend: false,
             name: 'Parts',
             type: 'spline',
             data: this.data1,
             color: this.reflect === 'OPERATE'? "#1EAD55" : this.reflect === 'DISCONNECT'? "#6D6D6D" : "#F81301",
             tooltip: {
               valueSuffix: ''
             }
           }
         ]
         });
      }
       
  })
  setInterval(() => {   
    
    this.service.god().subscribe(res =>{
      this.machine_response = res;
      this.ltime = this.machine_response[0].up_time;
    
    })  
    this.change = this.change + 400
    console.log(this.change)
    if(this.change >= 1200){
      this.change = 0
    }
  
    this.scrollToBottom(); 

   
  // }, 200000);
}, 100000);


  // this.scrollToBottom();


// $(function(){
//     $('.carousel').carousel({
//       interval: 2000
//     });
// });


  
}

ngAfterViewChecked() {        
  this.scrollToBottom();        
 } 

 
scrollToBottom(): void {

    // setInterval(() => { 
  
      this.scrollBottom.nativeElement.scrollTop = this.change;


    // },200000);
}

// scrollToTop(el) {
//     el.scrollTop = this.change;
   
// }



}


