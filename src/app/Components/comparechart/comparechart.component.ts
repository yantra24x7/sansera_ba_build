import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComparechartService} from '../../Service/app/comparechart.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import { DatePipe } from '@angular/common';
declare var Highcharts: any;


declare var gtag;

@Component({
  selector: 'app-comparechart',
  templateUrl: './comparechart.component.html',
  styleUrls: ['./comparechart.component.scss']
})
export class ComparechartComponent implements OnInit {
  secidle:any;
  secdis:any;
  secrun:any;
  utili1:any; 
  utili2:any;
  dat1:any;
  dat2:any;
  utili3:any;
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
    - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
    ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 2)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 2));
  shift_response: any;
  login: FormGroup;
  machine_response: any;
  second:any;
  get_report: any;
  select_machine: any;
  select_shift: any;
  report_table: any;
  test: FormGroup;
  module_response:any;
  machine_get: any;
  first_loading: any;
  myLoader = false;
  first_pge_loading: any;
  status:any;
  daterangepicker:any;
  new_date1:any;
  new_date:any;
  first:any;
  new_date3: any;
  mac_response:any;
  new_date2: any;
  myLoader1= false;
  datsss:any;
  datpre1:any;
  datpre2:any;
  // maxDate:any;
  // minDate:any;
  rolename1:any;
  rolename:any;
  sdate:any;
  edate:any;
  ndate:any;
  ndate1:any;
  types:any;
  ndate2: string;
  op_response: any;
  reportblock: any;
  date: any;
  response_module: any;
  reportttblock: any;
  response_mac: any;
  typess: any;
  ope_response: any;
  Rdate: string;
  Rdate2: string;
  constructor(private nav: NavbarService,private fb:FormBuilder,private service :ComparechartService,private datepipe: DatePipe) {
    this.nav.show();
  }
  gettype(type){

    this.types = type;
    let ComShi = localStorage.getItem('COMSHHIFT');

    let ComMac = localStorage.getItem('COMMACHINE');
    this.ndate = localStorage.getItem('CSDATE');
    this.ndate2 = localStorage.getItem('EDATE');
    let data = type;
   
    if(data === 'Operatorwise')
    {


      let register = {
        "machine_name": ComMac,
        "shift_num": ComShi,
        "date":  this.ndate + '-' +  this.ndate2
      }
      this.service.operat(register).subscribe(res => {
        this.op_response = res;
        this.login.patchValue({
          operator: this.op_response[0],
        })
      })
    }
  }

  gettyping(types){

    this.typess = types;
    let Rigshi = localStorage.getItem('RightSHHIFT');

    let RigMAC = localStorage.getItem('RightMACHINE');
    this.Rdate = localStorage.getItem('RSSDATE');
    this.Rdate2 = localStorage.getItem('RSEDATE');
    let data = types;
   
    if(data === 'Operatorwise')
    {


      let register = {
        "machine_name": RigMAC,
        "shift_num": Rigshi,
        "date":  this.Rdate + '-' +  this.Rdate2
      }
      this.service.operating(register).subscribe(res => {
        this.ope_response = res;
        this.test.patchValue({
          operator: this.ope_response[0],
        })
      })
    }
  }
  ngOnInit() {


    this.rolename = localStorage.getItem('role_name');
    console.log(this.rolename);

    this.rolename1 = localStorage.getItem('role_name');
    console.log(this.rolename);
    
     this.login = this.fb.group({
      line:[""],
        machine_name:["",],
        shift_num:[""],
        type:[""],
        date:["",],
        operator:[""]
  
      })

      this.myLoader = true;

      this.service.getmodule().subscribe(res => {
        this.module_response = res;
        this.login.patchValue({
          line: this.module_response[0],
  
        })
        this.service.line(this.module_response[0]).subscribe(res => {
          this.mac_response=res;
       
          this.login.patchValue({
            machine_name: this.mac_response[0],
          })
          localStorage.setItem('COMMACHINE', this.mac_response[0]);
          let ComMac = localStorage.getItem('COMMACHINE');
      this.service.getmachines().subscribe(res => {
        this.machine_response = res;
        // this.login.patchValue({
        //   machine_name: this.machine_response[0],
        // })
        this.service.getshift(this.module_response[0]).subscribe(res => {
          this.shift_response = res; 
          this.login.patchValue({
            shift_num: this.shift_response[0].shift_no,
          })
          localStorage.setItem('COMSHHIFT', this.shift_response[0].shift_no);

          this.service.first_page_loading().subscribe(res => {
            this.first_loading = res;

            this.dat1 = new DatePipe('en-US').transform(this.first_loading.from_date, 'yyyy-MM-dd');
            this.dat2 = new DatePipe('en-US').transform(this.first_loading.to_date, 'yyyy-MM-dd');
            this.login.patchValue({
           
  
  
              date: {begin: this.datepipe.transform(this.dat1, 'yyyy-MM-dd'), end: this.datepipe.transform(this.dat2, 'yyyy-MM-dd')}
            })
            
           

           
            localStorage.setItem('CSDATE', this.first_loading['from_date']);
            localStorage.setItem('EDATE', this.first_loading['to_date']);
            this.ndate = localStorage.getItem('CSDATE');
            this.ndate2= localStorage.getItem('EDATE');
            this.myLoader = false;

            this.logintest('true');
          })
        })
      })
      })
    })
  
   
    this.myLoader1 = true;

    this.service.moduleget().subscribe(res => {
      this.response_module = res;
      this.test.patchValue({
        line: this.response_module[0],

      })
      this.service.line_rigt(this.response_module[0]).subscribe(res => {
        this.response_mac=res;
     
        this.test.patchValue({
          machine_name: this.response_mac[0],
        })
    this.service.machine_get().subscribe(res => {
      this.machine_get = res;
      // this.test.patchValue({
      //   machine_name: this.machine_get[0],
      // })
      this.service.shift_get(this.response_module[0]).subscribe(res => {
        this.select_shift = res;
        this.test.patchValue({
          shift_num: this.select_shift[0].shift_no,
        })
        this.service.right_first_page_loading().subscribe(res => {
          this.first_pge_loading = res;
          this.datpre1 = new DatePipe('en-US').transform(this.first_pge_loading.from_date, 'yyyy-MM-dd');
          this.datpre2 = new DatePipe('en-US').transform(this.first_pge_loading.to_date, 'yyyy-MM-dd');
          this.test.patchValue({
           
  
  
            date: {begin: this.datepipe.transform(this.datpre1, 'yyyy-MM-dd'), end: this.datepipe.transform(this.datpre2, 'yyyy-MM-dd')}
          })
          
       
          localStorage.setItem('RSSDATE', this.first_pge_loading['from_date']);
            localStorage.setItem('RSEDATE', this.first_pge_loading['to_date']);
            this.Rdate = localStorage.getItem('RSSDATE');
            this.Rdate2= localStorage.getItem('RSEDATE');
            this.myLoader1 = false;

          this.testfunction('true');
        })
      })
      })
      })
  
  })
  
      
  this.test = this.fb.group({
    line:[""],
    type:[""],
    machine_name:["",],
    shift_num:["",],
    date:["",],
    operator:[""]
  })   
    
  }

  getsplit(val){
    
    this.reportblock = val;
    
    

    this.service.line(this.reportblock).subscribe(res => {
      this.mac_response=res;
      this.login.patchValue({
        machine_name: this.mac_response[0],
      })
     

      localStorage.setItem('COMMACHINE', this.mac_response[0]);
      let ComMac = localStorage.getItem('COMMACHINE');
    })
      this.service.getshift(this.reportblock).subscribe(res => {
        this.shift_response = res; 
        this.login.patchValue({
          shift_num: this.shift_response[0].shift_no,
        })
        localStorage.setItem('COMSHHIFT', this.shift_response[0].shift_no);
   
      })

    }

    getmodule(value){
    
      this.reportttblock = value;
      
      
  
      this.service.line_rigt(this.reportttblock).subscribe(res => {
        this.response_mac=res;
        this.test.patchValue({
          machine_name: this.response_mac[0],
        })
       
  
        localStorage.setItem('RightMACHINE', this.response_mac[0]);
        let RigMAC = localStorage.getItem('RightMACHINE');
     
        })
        this.service.shift_get(this.reportttblock).subscribe(res => {
          this.select_shift = res;
          this.test.patchValue({
            shift_num: this.select_shift[0].shift_no,
          })
        })
      }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.date = event.value;
      this.ndate = new DatePipe('en-US').transform(this.date.begin, 'MM/dd/yyyy');
      this.ndate2= new DatePipe('en-US').transform(this.date.end, 'MM/dd/yyyy');
      localStorage.setItem('CSDATE', this.ndate);
      localStorage.setItem('EDATE', this.ndate2);



    }
    addEvent1(type: string, event: MatDatepickerInputEvent<Date>) {
      this.datsss = event.value;
      this.Rdate = new DatePipe('en-US').transform(this.datsss.begin, 'MM/dd/yyyy');
      this.Rdate2= new DatePipe('en-US').transform(this.datsss.end, 'MM/dd/yyyy');
      localStorage.setItem('RSSDATE', this.Rdate);
      localStorage.setItem('RSEDATE', this.Rdate2);



    }
 
    getm(val){
    
      localStorage.setItem('COMMACHINE', val);
      let ComMac = localStorage.getItem('COMMACHINE');
     
  
    }
    getmm(vali){
    
     
      localStorage.setItem('RightMACHINE', vali);
      let RigMAC = localStorage.getItem('RightMACHINE');
     
  
    }
    getshift(shift){
      localStorage.setItem('COMSHHIFT',shift);

      let ComShi = localStorage.getItem('COMSHHIFT');
  
     
    
  
     
  }

  shiftget(shiftss){
    localStorage.setItem('RightSHHIFT',shiftss);

    let Rigshi = localStorage.getItem('RightSHHIFT');

  }
  logintest(s){
    this.status=s;
    this.myLoader = true;
    this.maxDate = this.datepipe.transform(this.maxDate);
    
    let register = this.login.value;
    if(this.status == 'true'){
      if(this.login.value.type === 'Shiftwise'){
        // alert("shift");
        let register = {
          "module": this.login.value.line,
          "machine_name": this.login.value.machine_name,
          "shift_num": this.login.value.shift_num,
          "date": this.ndate + '-' + this.ndate2,
          "type":this.login.value.type
        }
        this.service.overall_compare(register).subscribe(res => {
          this.myLoader = false;
          this.first = res.table;
          this.get_report = res;
          this.utili1 = res.run_time;
          this.utili2 = res.idle_time;
          this.utili3 = res.disconnect_time;  
          Highcharts.chart('comparepie', {
            chart: {
              plotBackgroundColor: null,                                
              plotBorderWidth: 0,
              plotShadow: false,
              backgroundColor: '#212226',
              spacingBottom: 0,
              spacingTop: 0,
              spacingRight: 0,
              spacingLeft: 0,
              margin: 0,
              height: '100%',
      
            },
            navigation: {
              buttonOptions: {
                theme: {
                  'stroke-width': 1,
                  stroke: null,
                  fill: '#0b0b0b',
                  r: 0,
                  states: {
                    hover: {
                      fill: '#1a1919'
                    },
                    select: {
                      fill: '#1a1919'
                    }
                  }
                }
              }
            },
            title: {
              text: '',
      
              align: 'center',
              verticalAlign: 'middle',
              style: {
                fontSize: '14px',
                color: 'white'
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
            credits: {
              enabled: false
            },
            plotOptions: {
              pie: {
                colors: [
                  '#5D5D5D',
                  '#E8BE15',
                  '#207A24',
                ],
                dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                    fontWeight: 'bold',
                    color: 'white'
                  }
                },
      
                size: '100%'
              }
            },
            series: [{
              type: 'pie',
              borderWidth: 0,
      
              innerSize: '60%',
              data: [
                ['Disconnect',res.disconnect_time],
    
                ['Idle',res.idle_time],
                ['Run',res.run_time],
    
              ]
            }]
      
          });
  
        })

      }

      else if(this.login.value.type === 'Operatorwise'){
        // alert("opera");
        let register = {
          "module":this.login.value.line,
          "machine_name": this.login.value.machine_name,
          "shift_num": this.login.value.shift_num,
          "date": this.ndate + '-' + this.ndate2,
          "type":this.login.value.type,
          "operator":this.login.value.operator
        }
        this.service.overall_compare1(register).subscribe(res => {
          this.myLoader = false;
          this.first = res.table;
          this.get_report = res;
          this.utili1 = res.run_time;
          this.utili2 = res.idle_time;
          this.utili3 = res.disconnect_time;  
          Highcharts.chart('comparepie', {
            chart: {
              plotBackgroundColor: null,                                
              plotBorderWidth: 0,
              plotShadow: false,
              backgroundColor: '#212226',
              spacingBottom: 0,
              spacingTop: 0,
              spacingRight: 0,
              spacingLeft: 0,
              margin: 0,
              height: '100%',
      
            },
            navigation: {
              buttonOptions: {
                theme: {
                  'stroke-width': 1,
                  stroke: null,
                  fill: '#0b0b0b',
                  r: 0,
                  states: {
                    hover: {
                      fill: '#1a1919'
                    },
                    select: {
                      fill: '#1a1919'
                    }
                  }
                }
              }
            },
            title: {
              text: '',
      
              align: 'center',
              verticalAlign: 'middle',
              style: {
                fontSize: '14px',
                color: 'white'
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
            credits: {
              enabled: false
            },
            plotOptions: {
              pie: {
                colors: [
                  '#5D5D5D',
                  '#E8BE15',
                  '#207A24',
                ],
                dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                    fontWeight: 'bold',
                    color: 'white'
                  }
                },
      
                size: '100%'
              }
            },
            series: [{
              type: 'pie',
              borderWidth: 0,
      
              innerSize: '60%',
              data: [
                ['Disconnect',res.disconnect_time],
    
                ['Idle',res.idle_time],
                ['Run',res.run_time],
    
              ]
            }]
      
          });
  
        })

      }


else{
      let register={
        "module":this.login.value.line,
        "machine_name":this.login.value.machine_name,
        "shift_num":this.login.value.shift_num,
        "date":this.ndate + '-' + this.ndate2
      }
      this.service.overall_compare2(register).subscribe(res =>{
      this.myLoader = false;
      this.first = res.table;
      this.get_report = res;
      this.utili1 = res.run_time;
      this.utili2 = res.idle_time;
      this.utili3 = res.disconnect_time;

   
      Highcharts.chart('comparepie', {
        chart: {
          plotBackgroundColor: null,                                
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: '#212226',
          spacingBottom: 0,
          spacingTop: 0,
          spacingRight: 0,
          spacingLeft: 0,
          margin: 0,
          height: '100%',
  
        },
        navigation: {
          buttonOptions: {
            theme: {
              'stroke-width': 1,
              stroke: null,
              fill: '#0b0b0b',
              r: 0,
              states: {
                hover: {
                  fill: '#1a1919'
                },
                select: {
                  fill: '#1a1919'
                }
              }
            }
          }
        },
        title: {
          text: '',
  
          align: 'center',
          verticalAlign: 'middle',
          style: {
            fontSize: '14px',
            color: 'white'
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
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            colors: [
              '#5D5D5D',
              '#E8BE15',
              '#207A24',
            ],
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
  
            size: '100%'
          }
        },
        series: [{
          type: 'pie',
          borderWidth: 0,
  
          innerSize: '60%',
          data: [
            ['Disconnect',res.disconnect_time],

            ['Idle',res.idle_time],
            ['Run',res.run_time],

          ]
        }]
  
      });
    })
    }
    
  }
  }

  testfunction(e){
    this.status=e;
    this.myLoader1 = true;
    let value = this.test.value;
    if(this.status == 'true'){
      if(this.test.value.type === 'Shiftwise'){
        // alert("shift")
      let value = {
        "module":this.test.value.line,
        "machine_name": this.test.value.machine_name,
        "shift_num": this.test.value.shift_num,
        "date": this.Rdate + '-' + this.Rdate2,
        "type":this.test.value.type
      }
      this.service.compare_chart(value).subscribe(res=>{
        this.myLoader1 = false;
        this.second = res.table;
        this.report_table = res;
        this.secidle = res.idle_time;
        this.secdis = res.disconnect_time;
        this.secrun = res.run_time;
        Highcharts.chart('comparepie2', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: '#212226',
            spacingBottom: 0,
            spacingTop: 0,
            spacingRight: 0,
            spacingLeft: 0,
            margin: 0,
            height: '100%',
          },
          navigation: {
            buttonOptions: {
              theme: {
                'stroke-width': 1,
                stroke: null,
                fill: '#0b0b0b',
                r: 0,
                states: {
                  hover: {
                    fill: '#1a1919'
                  },
                  select: {
                    fill: '#1a1919'
                  }
                }
              }
            }
          },
          title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            style: {
              fontSize: '14px',
              color: 'white'
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
          credits: {
            enabled: false
          },
          plotOptions: {
            pie: {
              colors: [
                '#5D5D5D',
                '#E8BE15',
                '#207A24',
              ],
              dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                  fontWeight: 'bold',
                  color: 'white'
                }
              },
    
              size: '100%'
            }
          },
          series: [{
            type: 'pie',
            borderWidth: 0,
    
            innerSize: '60%',
            data: [
              ['Disconnect',res.disconnect_time],
  
              ['Idle',res.idle_time],
              ['Run',res.run_time],
              
            ]
          }]
    
        });
      })
    }
    else if(this.test.value.type === 'Operatorwise'){
      // alert("operat")
      let value = {
        "module":this.test.value.line,
        "machine_name": this.test.value.machine_name,
        "shift_num": this.test.value.shift_num,
        "date": this.Rdate + '-' + this.Rdate2,
        "type":this.login.value.type,
        "operator":this.login.value.operator
      }
      this.service.compare_chart1(value).subscribe(res=>{
        this.myLoader1 = false;
        this.second = res.table;
        this.report_table = res;
        this.secidle = res.idle_time;
        this.secdis = res.disconnect_time;
        this.secrun = res.run_time;
        Highcharts.chart('comparepie2', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: '#212226',
            spacingBottom: 0,
            spacingTop: 0,
            spacingRight: 0,
            spacingLeft: 0,
            margin: 0,
            height: '100%',
          },
          navigation: {
            buttonOptions: {
              theme: {
                'stroke-width': 1,
                stroke: null,
                fill: '#0b0b0b',
                r: 0,
                states: {
                  hover: {
                    fill: '#1a1919'
                  },
                  select: {
                    fill: '#1a1919'
                  }
                }
              }
            }
          },
          title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            style: {
              fontSize: '14px',
              color: 'white'
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
          credits: {
            enabled: false
          },
          plotOptions: {
            pie: {
              colors: [
                '#5D5D5D',
                '#E8BE15',
                '#207A24',
              ],
              dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                  fontWeight: 'bold',
                  color: 'white'
                }
              },
    
              size: '100%'
            }
          },
          series: [{
            type: 'pie',
            borderWidth: 0,
    
            innerSize: '60%',
            data: [
              ['Disconnect',res.disconnect_time],
  
              ['Idle',res.idle_time],
              ['Run',res.run_time],
              
            ]
          }]
    
        });
      })
    }

    else{

      let value = {
        "module":this.test.value.line,
        "machine_name": this.test.value.machine_name,
        "shift_num": this.test.value.shift_num,
        "date": this.Rdate + '-' + this.Rdate2,
        "type":this.login.value.type
      }


      this.service.compare_chart2(value).subscribe(res=>{
        this.myLoader1 = false;
        this.second = res.table;
        this.report_table = res;
        this.secidle = res.idle_time;
        this.secdis = res.disconnect_time;
        this.secrun = res.run_time;
        Highcharts.chart('comparepie2', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: '#212226',
            spacingBottom: 0,
            spacingTop: 0,
            spacingRight: 0,
            spacingLeft: 0,
            margin: 0,
            height: '100%',
          },
          navigation: {
            buttonOptions: {
              theme: {
                'stroke-width': 1,
                stroke: null,
                fill: '#0b0b0b',
                r: 0,
                states: {
                  hover: {
                    fill: '#1a1919'
                  },
                  select: {
                    fill: '#1a1919'
                  }
                }
              }
            }
          },
          title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            style: {
              fontSize: '14px',
              color: 'white'
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
          credits: {
            enabled: false
          },
          plotOptions: {
            pie: {
              colors: [
                '#5D5D5D',
                '#E8BE15',
                '#207A24',
              ],
              dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                  fontWeight: 'bold',
                  color: 'white'
                }
              },
    
              size: '100%'
            }
          },
          series: [{
            type: 'pie',
            borderWidth: 0,
    
            innerSize: '60%',
            data: [
              ['Disconnect',res.disconnect_time],
  
              ['Idle',res.idle_time],
              ['Run',res.run_time],
              
            ]
          }]
    
        });
      })
    }
      // let value={
      //   "machine_name":this.test.value.machine_name,
      //   "shift_num":this.test.value.shift_num,
      //   "date":this.new_date2 + '-' + this.new_date3
      // }
  
   
  }
  else{
     
    this.service.compare_chart(value).subscribe(res =>{
      this.myLoader = false;

      this.report_table = res;
      Highcharts.chart('comparepie2', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: '#0b0b0b',
          spacingBottom: 0,
          spacingTop: 0,
          spacingRight: 0,
          spacingLeft: 0,
          margin: 0,
          height: '100%',
        },
        navigation: {
          buttonOptions: {
            theme: {
              'stroke-width': 1,
              stroke: null,
              fill: '#0b0b0b',
              r: 0,
              states: {
                hover: {
                  fill: '#1a1919'
                },
                select: {
                  fill: '#1a1919'
                }
              }
            }
          }
        },
        title: {
          text: '',
          align: 'center',
          verticalAlign: 'middle',
          style: {
            fontSize: '14px',
            color: 'white'
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
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            colors: [
              '#5D5D5D',
              '#E8BE15',
              '#207A24',
            ],
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
  
            size: '100%'
          }
        },
        series: [{
          type: 'pie',
          borderWidth: 0,
  
          innerSize: '60%',
          data: [
            ['Disconnect',res.disconnect_time],

            ['Idle',res.idle_time],
            ['Run',res.run_time],
            
  //         ]
  //       }]
  
  //     });
  //   })
  // }
  
]
}]

});
}) 
}

}
};
