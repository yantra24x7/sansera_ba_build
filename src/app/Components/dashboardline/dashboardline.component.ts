import { Component, OnInit,Inject} from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var Highcharts: any;
import { DashboardService } from '../../Service/app/dashboard.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-dashboardline',
  templateUrl: './dashboardline.component.html',
  styleUrls: ['./dashboardline.component.scss']
})
export class DashboardlineComponent implements OnInit {
  Highcharts = Highcharts;
  axis2:any;
  spi_count:any;
  spid_check_line:any;
  spid_check_machine:any;
  sp_mac_value:any;
  login: FormGroup;
  lname:any;
  axis1:any;
  servo_load:any;
  servo_load1:any;
  operator:any;
  alname:any;
  myLoader = false;
  servo_load2:any;
  servo_load3:any;
  servo_load4:any;
  fline:any;
  fname:any;
  utlization:any;
  run_time:any;
  stop:any;
  disconnect:any;
  reason:any;
  eff:any;
  axis3:any;
  axis4:any;
  axis5:any;
  spindle_load:any;
  selectedItem: any;
  machine_tot_length:any;
  classList:any;
  constructor(public dialog: MatDialog,private service: DashboardService,private route:ActivatedRoute,private nav: NavbarService, private fb: FormBuilder,) {
    this.nav.show();
    this.lname = this.route.snapshot.queryParamMap.get('line_name');
    
    this.myLoader = true;

    this.service.form_line(this.lname).pipe(untilDestroyed(this)).subscribe(res=>{
        this.myLoader = false;


        this.machine_tot_length = res.length;
        
        if (this.machine_tot_length <= 9){
          this.classList="nine";
        }
        else if (this.machine_tot_length > 10 && this.machine_tot_length < 16){
          this.classList = "fifteen";
        }
        else if (this.machine_tot_length > 16 && this.machine_tot_length < 21){
          this.classList = "twenty";
        }
        else if (this.machine_tot_length >  41){
          this.classList = "forty";
        }
          
    this.fline = res[0].line;
    this.fname = res[0].machine;
    this.selectedItem = res[0].machine;
    console.log(this.selectedItem);
    this.utlization = res[0].run;
    this.run_time = res[0].run_time;
    this.stop = res[0].idle_time;
    this.disconnect = res[0].discon_time;
    this.reason = res[0].reason;

    this.myLoader = true;

    this.service.pie(this.fline,this.fname).pipe(untilDestroyed(this)).subscribe(res=>{
        this.operator = res;
        this.spi_count = res.sp_log_over_res.count;
        console.log(this.spi_count);
        this.spid_check_line = res.line;
        this.spid_check_machine = res.machine;
        console.log(this.spid_check_line,this.spid_check_machine)
        this.eff = res.effe;
        this.axis1 = res.sv_axis[0]
        this.axis2 = res.sv_axis[1]
        this.axis3 = res.sv_axis[2]
        this.axis4 = res.sv_axis[3]
        this.axis5 = res.sv_axis[4]

        this.servo_load = res.servo_load[0]
        this.sp_mac_value = res.sp_max_val;
        this.servo_load1 = res.servo_load[1]
        this.servo_load2 = res.servo_load[2]
        this.servo_load3 = res.servo_load[3]
        this.servo_load4 = res.servo_load[4]
        this.spindle_load = res.spendle_load[0]
        this.myLoader = false;
        var container = Highcharts.chart('container2', {
            credits: {
              enabled: false
            },
            chart: {
              type: 'gauge',
              plotBackgroundColor: null,
              plotBackgroundImage: null,
              plotBorderWidth: 0,
              plotShadow: false,
              height: 200,
              width: 180,
              fill: 'transparent',
              backgroundColor: {
                backgroundColor: '#262932',
              }
            },
            title: {
              text: '',
              y: 30,
              style: {
                fontSize: '14px',
                color: '#fff',
                lineheight: 10,
                font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
              },
            },
      
            pane: {
              startAngle: -90,
              endAngle: 90,
              background: null
            },
      
            yAxis: {
              labels: {
                enabled: true,
                x: 35, y: -10
              },
      
              tickPositions: [],
              minorTickLength: 0,
              min: 0,
              max: 10000,
              plotBands: [{
                from: 0,
                to: 5000,
                color: {
                  linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                  stops: [
                    [0, '#25b77f'], //green Dark
                    [1, '#10c284'] //green light
                  ]
                },
                thickness: '20%'
              }, {
                from: 5000,
                to: 10000,
                color: {
                  linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                  stops: [
                    [0, '#eb0808'], //red dark
                    [1, '#e00d08'] //red light
                  ]
                },
                thickness: '20%'
              }]
            },
            exporting: {
              enabled: false
            },
            plotOptions: {
              gauge: {
                  dataLabels: {
                      enabled: false
                  },
                  dial: {
                      radius: '100%',
                      backgroundColor: 'white',
                      // needle extending from pivot
                      baseLength: 10, // how high the fat part rises
                      baseWidth: 4, // fat part of needle                   
                      rearLength: 0.1, // below the pivot                    
                      borderColor: '#fff',
                      borderWidth: 0,
                  }
              }
          },
            series: [{
              name: 'Spindle Load',
              // data: ['80'spindlespeed],
              background: '#fff',
              data: [{
                color: '#fff',
                background: '#fff',
                fillL: '#fff',
                radius: '100%',
                innerRadius: '80%',
                y: 0
              }],
              color: {
                linearGradient: [1, 1, 1, 1],
                stops: [
                  [0.4, '#fff'],
                  [0.1, '#fff']
                ]
              },
              dataLabels: {
                // format: '<span style="font-size:14px;color:grey;">{y} m/min</span></div>',
                y: 10,
                borderWidth: 0,
                fill: '#ccc',
                color: '#ccc'
              },
              tooltip: {
                // valueSuffix: 'this.spindle_load'
              },
              series: [{
                data: [this.spindle_load]
              }],
            }]
      
          });
        // var chartSpeed = Highcharts.chart('vumeter', {
        //     chart: {
        //         type: 'gauge',
        //         plotBorderWidth: 0,
        //         plotBackgroundColor: {
        //             linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        //             stops: [
        //                 [0, '#242424'],
        //                 [0.3, '#242424'],
        //                 [1, '#242424']
        //             ]
        //         },
        //         plotBackgroundImage: null,
        //         height: 130,
        //         backgroundColor: null
        //     },
        
        //     title: {
        //         text: ''
        //     },
        
        //     pane: [{
        //         startAngle: -45,
        //         endAngle: 45,
        //         background: null,
        //         center: ['45%', '120%'],
        //         size: 200
        //     }, {
        //         startAngle: -45,
        //         endAngle: 45,
        //         background: null,
        //         center: ['75%', '145%'],
        //         size: 200
        //     }],
        
        //     exporting: {
        //         enabled: false
        //     },
        
        //     tooltip: {
        //         enabled: false
        //     },
        
        //     yAxis: [{
        //         min: -20,
        //         max: 6,
        //         minorTickPosition: 'outside',
        //         tickPosition: 'outside',
        //         labels: {
        //             rotation: 'auto',
        //             distance: 20
        //         },
        //         plotBands: [{
        //             from: 0,
        //             to: 6,
        //             color: '#C02316',
        //             innerRadius: '100%',
        //             outerRadius: '105%'
        //         }],
        //         pane: 0,
        //         title: {
        //             text: 'VU<br/><span style="font-size:24px; font-weight:400;font-family: Barlow Condensed;color:#fff;">Spindle Load</span>',
        //             y:-20,
        //             fill:'white'
            
        //         }
        //     }, {
        //         min: -20,
        //         max: 6,
        //         minorTickPosition: 'outside',
        //         tickPosition: 'outside',
        //         labels: {
        //             rotation: 'auto',
        //             distance: 20
        //         },
        //         plotBands: [{
        //             from: 0,
        //             to: 6,
        //             color: '#C02316',
        //             innerRadius: '100%',
        //             outerRadius: '105%'
        //         }]
        //     }],
        
        //     plotOptions: {
        //         gauge: {
        //             dataLabels: {
        //                 enabled: false
        //             },
        //             dial: {
        //                 radius: '100%',
        //                 backgroundColor: 'white',
        //                 // needle extending from pivot
        //                 baseLength: 10, // how high the fat part rises
        //                 baseWidth: 4, // fat part of needle                   
        //                 rearLength: 0.1, // below the pivot                    
        //                 borderColor: '#fff',
        //                 borderWidth: 0,
        //             }
        //         }
        //     },
        
        //     series: [{
        //         name: 'Channel A',
        //         data:[this.spindle_load],
        //         yAxis: 0
        //     }, ]
        
        // },
        
        // // Let the music play
        // function (chart) {
        //     setInterval(function () {
        //         if (chart.series) { // the chart may be destroyed
        //             var left = this.spindle_load,
        //                 // right = chart.series[1].points[0],
        //                 leftVal,
        //                 rightVal,
        //                 inc = (Math.random() - 0.5) * 3;
        
        //             // leftVal = left.y + inc;
        //             rightVal = leftVal + inc / 3;
        //             if (leftVal < -20 || leftVal > 6) {
        //                 leftVal = left.y - inc;
        //             }
        //             if (rightVal < -20 || rightVal > 6) {
        //                 rightVal = leftVal;
        //             }
        
        //             left.update(leftVal, false);
        //             // right.update(rightVal, false);
        //             chart.redraw();
        //         }
        //     }, 500);
        
        // });
        
         })
    this.alname = res;

    })
  }
  onClick(item) {
    this.selectedItem = item;
  }
  openDialog(line,mac): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '7500px',
      height: '580px',
      data: { line: line, mac: mac }

    }); 

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnInit() {
//     var gaugeOptions = {
//       chart: {
//           type: 'solidgauge',
//           backgroundColor: 'transparent'
//       },
  
//       title: null,
  
//       pane: {
//           size: '80%',
//           startAngle: -90,
//           endAngle: 90,
//           background: {
//               backgroundColor:
//                   Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
//               innerRadius: '60%',
//               outerRadius: '100%',
//               shape: 'arc'
//           }
//       },
  
//       exporting: {
//           enabled: false
//       },
  
//       tooltip: {
//           enabled: false
//       },
  
//       // the value axis
//       yAxis: {
//           stops: [
//               [0.1, '#55BF3B'], // green
//               [0.5, '#DDDF0D'], // yellow
//               [0.9, '#DF5353'] // red
//           ],
//           lineWidth: 0,
//           tickWidth: 0,
//           minorTickInterval: null,
//           tickAmount: 2,
//           title: {
//               y: -70
//           },
//           labels: {
//               y: 16
//           }
//       },
  
//       plotOptions: {
//           solidgauge: {
//               dataLabels: {
//                   y: 5,
//                   borderWidth: 0,
//                   useHTML: true
//               }
//           }
//       }
//   };
  

//   var chartSpeed = Highcharts.chart('vumeter', {
//     chart: {
//         type: 'gauge',
//         plotBorderWidth: 0,
//         plotBackgroundColor: {
//             linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
//             stops: [
//                 [0, '#242424'],
//                 [0.3, '#242424'],
//                 [1, '#242424']
//             ]
//         },
//         plotBackgroundImage: null,
//         height: 130,
//         backgroundColor: null
//     },

//     title: {
//         text: ''
//     },

//     pane: [{
//         startAngle: -45,
//         endAngle: 45,
//         background: null,
//         center: ['45%', '120%'],
//         size: 200
//     }, {
//         startAngle: -45,
//         endAngle: 45,
//         background: null,
//         center: ['75%', '145%'],
//         size: 200
//     }],

//     exporting: {
//         enabled: false
//     },

//     tooltip: {
//         enabled: false
//     },

//     yAxis: [{
//         min: -20,
//         max: 6,
//         minorTickPosition: 'outside',
//         tickPosition: 'outside',
//         labels: {
//             rotation: 'auto',
//             distance: 20
//         },
//         plotBands: [{
//             from: 0,
//             to: 6,
//             color: '#C02316',
//             innerRadius: '100%',
//             outerRadius: '105%'
//         }],
//         pane: 0,
//         title: {
//             text: 'VU<br/><span style="font-size:24px; font-weight:400;font-family: Barlow Condensed;color:#fff;">Spindle Load</span>',
//             y:-20,
//             fill:'white'
    
//         }
//     }, {
//         min: -20,
//         max: 6,
//         minorTickPosition: 'outside',
//         tickPosition: 'outside',
//         labels: {
//             rotation: 'auto',
//             distance: 20
//         },
//         plotBands: [{
//             from: 0,
//             to: 6,
//             color: '#C02316',
//             innerRadius: '100%',
//             outerRadius: '105%'
//         }]
//     }],

//     plotOptions: {
//         gauge: {
//             dataLabels: {
//                 enabled: false
//             },
//             dial: {
//                 radius: '100%',
//                 backgroundColor: 'white',
//                 // needle extending from pivot
//                 baseLength: 10, // how high the fat part rises
//                 baseWidth: 4, // fat part of needle                   
//                 rearLength: 0.1, // below the pivot                    
//                 borderColor: '#fff',
//                 borderWidth: 0,
//             }
//         }
//     },

//     series: [{
//         name: 'Channel A',
//         data: [-20],
//         yAxis: 0
//     }, {
//         name: 'Channel B',
//         data: [-20],
//         yAxis: 1
//     }]

// },

// // Let the music play
// function (chart) {
//     setInterval(function () {
//         if (chart.series) { // the chart may be destroyed
//             var left = this.spindle_load,
//                 right = chart.series[1].points[0],
//                 leftVal,
//                 rightVal,
//                 inc = (Math.random() - 0.5) * 3;

//             leftVal = left.y + inc;
//             rightVal = leftVal + inc / 3;
//             if (leftVal < -20 || leftVal > 6) {
//                 leftVal = left.y - inc;
//             }
//             if (rightVal < -20 || rightVal > 6) {
//                 rightVal = leftVal;
//             }

//             left.update(leftVal, false);
//             right.update(rightVal, false);
//             chart.redraw();
//         }
//     }, 500);

// });
  // The speed gauge

  
  // The RPM gauge
//   var chartRpm = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
//       yAxis: {
//           min: 0,
//           max: 5,
//           title: {
//               text: 'RPM'
//           }
//       },
  
//       series: [{
//           name: 'RPM',
//           data: [1],
//           dataLabels: {
//               format:
//                   '<div style="text-align:center">' +
//                   '<span style="font-size:25px">{y:.1f}</span><br/>' +
//                   '<span style="font-size:12px;opacity:0.4">' +
//                   '* 1000 / min' +
//                   '</span>' +
//                   '</div>'
//           },
//           tooltip: {
//               valueSuffix: ' revolutions/min'
//           }
//       }]
  
//   }));
  
  // Bring life to the dials
//   setInterval(function () {
//       // Speed
//       var point,
//           newVal,
//           inc;
  
//     //   if (chartSpeed) {
//     //       point = chartSpeed.series[0].points[0];
//     //       inc = Math.round((Math.random() - 0.5) * 100);
//     //       newVal = point.y + inc;
  
//     //       if (newVal < 0 || newVal > 200) {
//     //           newVal = point.y - inc;
//     //       }
  
//     //       point.update(newVal);
//     //   }
  
//       // RPM
//       if (chartRpm) {
//           point = chartRpm.series[0].points[0];
//           inc = Math.random() - 0.5;
//           newVal = point.y + inc;
  
//           if (newVal < 0 || newVal > 5) {
//               newVal = point.y - inc;
//           }
  
//           point.update(newVal);
//       }
//   }, 2000);
  
  }

  valvo(fline,fname,utlization,run_time,stop,disconnect,reason)
  {     
         this.myLoader = true;

         this.service.pie(fline,fname).pipe(untilDestroyed(this)).subscribe(res=>{
        this.myLoader = false;

        this.operator = res;
        this.spi_count = res.sp_log_over_res.count;
        console.log(this.spi_count);
        this.sp_mac_value = res.sp_max_val;
        this.spid_check_line = res.line;
        this.spid_check_machine = res.machine;
        console.log(this.spid_check_line,this.spid_check_machine)
        this.axis1 = res.sv_axis[0]
        this.axis2 = res.sv_axis[1]
        this.axis3 = res.sv_axis[2]
        this.axis4 = res.sv_axis[3]
        this.axis5 = res.sv_axis[4]
        this.spindle_load = res.spendle_load[0]
        this.servo_load = res.servo_load[0]
        this.servo_load1 = res.servo_load[1]
        this.servo_load2 = res.servo_load[2]
        this.servo_load3 = res.servo_load[3]
        this.servo_load4 = res.servo_load[4]
        var container = Highcharts.chart('container2', {
          credits: {
            enabled: false
          },
          chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: 200,
            width: 180,
            fill: 'transparent',
            backgroundColor: {
              backgroundColor: '#262932',
            }
          },
          title: {
            text: '',
            y: 30,
            style: {
              fontSize: '14px',
              color: '#fff',
              lineheight: 10,
              font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
            },
          },
    
          pane: {
            startAngle: -90,
            endAngle: 90,
            background: null
          },
    
          yAxis: {
            labels: {
              enabled: true,
              x: 35, y: -10
            },
    
            tickPositions: [],
            minorTickLength: 0,
            min: 0,
            max: 10000,
            plotBands: [{
              from: 0,
              to: 5000,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#40aa3e'], //green
                  [1, '#59db57'] //red
                ]
              },
              thickness: '20%'
            }, {
              from: 5000,
              to: 10000,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#fd6363'], //green
                  [1, '#c41a1a'] //red
                ]
              },
              thickness: '20%'
            }]
          },
          exporting: {
            enabled: false
          },
          plotOptions: {
            gauge: {
                dataLabels: {
                    enabled: false
                },
                dial: {
                    radius: '100%',
                    backgroundColor: 'white',
                    // needle extending from pivot
                    baseLength: 10, // how high the fat part rises
                    baseWidth: 4, // fat part of needle                   
                    rearLength: 0.1, // below the pivot                    
                    borderColor: '#fff',
                    borderWidth: 0,
                }
            }
        },
          series: [{
            name: 'Spindle Load',
            // data: ['80'spindlespeed],
            background: '#fff',
            data: [{
              color: '#fff',
              background: '#fff',
              fillL: '#fff',
              radius: '100%',
              innerRadius: '80%',
              y: 0
            }],
            color: {
              linearGradient: [1, 1, 1, 1],
              stops: [
                [0.4, '#fff'],
                [0.1, '#fff']
              ]
            },
            dataLabels: {
              // format: '<span style="font-size:14px;color:grey;">{y} m/min</span></div>',
              y: 10,
              borderWidth: 0,
              fill: '#ccc',
              color: '#ccc'
            },
            tooltip: {
              // valueSuffix: 'm/min'
            },
            series: [{
              data: [this.spindle_load]
            }],
          }]
    
        });
     

         })
  }
  ngOnDestroy() { }

}



@Component({
  selector: 'dialog-page',
  templateUrl: 'dialog.html',
  styleUrls: ['./dashboardline.component.scss']

})
export class Dialog {
  value:any;
  myLoader1 = false;

  sppivaluedle:any;
  spindlecount:any;
  sppivalue:any;
  constructor(public dialogRef: MatDialogRef<Dialog>, @Inject(MAT_DIALOG_DATA) public data: any, private service: DashboardService, private fb: FormBuilder) {
    this.value = data;
    console.log(this.value);
    this.myLoader1 = true;
   this.service.pie(this.value.line,this.value.mac).pipe(untilDestroyed(this)).subscribe(res=>{
     console.log(res);
     this.myLoader1 = false;

     this.spindlecount = res.sp_log_over_res.count;
     this.sppivalue = res.sp_log_over_res;
     this.sppivaluedle = res.sp_log_over_res.value;

     console.log(this.sppivalue);

    })


  }

  
  ngOnInit() {
   
  }
 
 
  ngOnDestroy() { }


}






