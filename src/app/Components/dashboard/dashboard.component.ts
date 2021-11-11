
// import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';

declare var $: any;



import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Service/app/dashboard.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

declare var Highcharts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  list_machine: any;
  childNum: any;
  myLoader = false;
  time:any;
  count_machine: any;
  date= new Date().toString();
  fourth:any;
  chart_loop:any;
  live:any;
  constructor(private nav: NavbarService, private service: DashboardService) {
    this.nav.show()
    setInterval(() => {this.today = Date.now()}, 1);

  }
  today: number = Date.now();
  refresh(){
    // location.reload();
    this.live = true;
    this.myLoader = true;
    this.service.getmachines1(this.live).pipe(untilDestroyed(this)).subscribe(res => {
      this.fourth = res.fourth;
      for(let i in this.fourth){

        // console.log(i)
       this.chart_loop = this.fourth[i].reason;


      }
      this.myLoader = false;
      this.list_machine = res;
      this.time = res.time;
    


      Highcharts.chart('container', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: '#2c2d31',
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
                  symbolStroke: "#676767",
                  theme: {
          fill:"#2c2d31"
      }
              }
          }
        },

        title: {
          // text: 'Overall Machine Status'
          text: 'Total Utilization:'+ this.list_machine.third[0][1]+' %',
          // align: 'center',
          // y: 70,
          style: {
            color: '#fff',
            
          }
        
        },
        subtitle: {
          text: 'Total Utilization:'+ this.list_machine.third[0][1]+' %',
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
          
          borderColor: '#7c7c7c',
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
           data: this.list_machine.third
        }]

      });
      Highcharts.chart('container2', {
        chart: {
          type: 'column',
          backgroundColor: '#2c2d31',
          spacingBottom: 0,
          spacingTop: 0,
          spacingRight: 0,
          spacingLeft: 0,
          // margin: [25],
          // height: '100%',
          
        },
        title: {
          text: 'Individual Machine Status',
            style: {
              color: '#fff',
              
            }
        },
        legend: {
          itemStyle: {
              color: '#fff',
              
          }
      },
      credits: {
        enabled: false
      },
       
          exporting: {
            buttons: {
              contextButton: {
                  symbolStroke: "#676767",
                  theme: {
          fill:"#2c2d31"
      }
              }
          }
        },

           navigation: {
            buttonOptions: {
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
        xAxis: {
          plotLines: [{
            color: '#FF0000',
            height: 3,
            lineColor: '#333',
            lineWidth: 1

          }],
          categories: this.list_machine.second.Machine,
          labels: {
            style: {
                color: '#fff',
                fontSize: '14'
            }
        }
        },
        yAxis: {
          min: 0,

          title: {
            text: ''            
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        plotOptions: {
        column: {
            stacking: 'normal'
        },
        labels:{
          style: {
                  color: '#FFFFFF'
                 }
       },
        series: {
          //connectNulls: true
          pointWidth: 20,
         
        }
        },
        series: [ 
          {
            name: 'Disconnect',
            type: 'column',
            color: '#6d6d6d',
            borderRadius: 5,
            borderWidth: 3,
            borderColor: '#2E2E2E',
            data: this.list_machine.second.Disconnect
          },{
          name: 'stopped',
          type: 'column',
          color: "#e8a249",
          borderWidth: 3,
          borderRadius: 5,
          borderColor: '#2E2E2E',
          data: this.list_machine.second.Stop,
            },
          //  {
          //   name: 'stopped',
          //   type: 'column',
          //   color: "#ed5550",
          //   borderWidth: 3,
          //   borderRadius: 5,
          //   borderColor: '#2E2E2E',
          //   data: this.list_machine.second.Stop,
          // },
          {
            name: 'Running',
            type: 'column',
            color: "#269048",
            borderWidth: 3,
            marginBottom: 6,
            borderRadius: 5,
            borderColor: '#2E2E2E',
            fontWeight:"normal",
            data: this.list_machine.second.Running
          },
        
        // {
        //   name: 'production',
        //   type: 'spline',
        //   shadow: true,
        //   color: '#fff',
        //   data: this.list_machine.second.production,

        // }
      ]
      });
      // var childNum = document.querySelector('.machine_list').childElementCount;
      // alert(childNum);
      
    });

  }
  ngOnInit() {

    this.service.machine_count().pipe(untilDestroyed(this)).subscribe(res=>{
      this.count_machine = res;
     
    })
   
      // this.chart_loop = this.machine_response[i].data;
      // console.log(this.chart_loop)  

      // for(let j in this.machine_response[i].data){

      //   this.data = this.machine_response[i].data[j].time;
      //  this.data1 =  this.machine_response[i].data[j].count
      //  this.reflect = this.machine_response[i].status;
     
     
    this.myLoader = true;
    this.service.getmachines().pipe(untilDestroyed(this)).subscribe(res => {
      this.fourth = res.fourth;
      for(let i in this.fourth){

        // console.log(i)
       this.chart_loop = this.fourth[i].reason;


      }
      this.myLoader = false;
      this.list_machine = res;
      this.time = res.time;
    


      Highcharts.chart('container', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: '#2c2d31',
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
                  symbolStroke: "#676767",
                  theme: {
          fill:"#2c2d31"
      }
              }
          }
        },

        title: {
          // text: 'Overall Machine Status'
          text: 'Total Utilization:'+ this.list_machine.third[0][1]+' %',
          // align: 'center',
          // y: 70,
          style: {
            color: '#fff',
            
          }
        
        },
        subtitle: {
          text: 'Total Utilization:'+ this.list_machine.third[0][1]+' %',
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
          
          borderColor: '#7c7c7c',
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
           data: this.list_machine.third
        }]

      });
      Highcharts.chart('container2', {
        chart: {
          type: 'column',
          backgroundColor: '#2c2d31',
          spacingBottom: 0,
          spacingTop: 0,
          spacingRight: 0,
          spacingLeft: 0,
          // margin: [25],
          // height: '100%',
          
        },
        title: {
          text: 'Individual Machine Status',
            style: {
              color: '#fff',
              
            }
        },
        legend: {
          itemStyle: {
              color: '#fff',
              
          }
      },
      credits: {
        enabled: false
      },
       
          exporting: {
            buttons: {
              contextButton: {
                  symbolStroke: "#676767",
                  theme: {
          fill:"#2c2d31"
      }
              }
          }
        },

           navigation: {
            buttonOptions: {
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
        xAxis: {
          plotLines: [{
            color: '#FF0000',
            height: 3,
            lineColor: '#333',
            lineWidth: 1

          }],
          categories: this.list_machine.second.Machine,
          labels: {
            style: {
                color: '#fff',
                fontSize: '14'
            }
        }
        },
        yAxis: {
          min: 0,

          title: {
            text: ''            
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        plotOptions: {
        column: {
            stacking: 'normal'
        },
        labels:{
          style: {
                  color: '#FFFFFF'
                 }
       },
        series: {
          //connectNulls: true
          pointWidth: 20,
         
        }
        },
        series: [ 
          {
            name: 'Disconnect',
            type: 'column',
            color: '#6d6d6d',
            borderRadius: 5,
            borderWidth: 3,
            borderColor: '#2E2E2E',
            data: this.list_machine.second.Disconnect
          },{
          name: 'stopped',
          type: 'column',
          color: "#e8a249",
          borderWidth: 3,
          borderRadius: 5,
          borderColor: '#2E2E2E',
          data: this.list_machine.second.Stop,
            },
          //  {
          //   name: 'stopped',
          //   type: 'column',
          //   color: "#ed5550",
          //   borderWidth: 3,
          //   borderRadius: 5,
          //   borderColor: '#2E2E2E',
          //   data: this.list_machine.second.Stop,
          // },
          {
            name: 'Running',
            type: 'column',
            color: "#269048",
            borderWidth: 3,
            marginBottom: 6,
            borderRadius: 5,
            borderColor: '#2E2E2E',
            fontWeight:"normal",
            data: this.list_machine.second.Running
          },
        
        // {
        //   name: 'production',
        //   type: 'spline',
        //   shadow: true,
        //   color: '#fff',
        //   data: this.list_machine.second.production,

        // }
      ]
      });
      // var childNum = document.querySelector('.machine_list').childElementCount;
      // alert(childNum);
      
    });




    // $(window).resize(function () {
    //   var chart = $('#container2,#container').highcharts();

    //   console.log('redraw');
    //   var w = $('#container2,#container').closest(".wrapper").width()
    //   // setsize will trigger the graph redraw 
    //   chart.setSize(
    //     w, w * (3 / 4), false
    //   );
    // });



  }
  ngOnDestroy() { }


}
