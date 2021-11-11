import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OverallchartService} from '../../Service/app/overallchart.service';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
declare var Highcharts: any;

@Component({
  selector: 'app-overallchart',
  templateUrl: './overallchart.component.html',
  styleUrls: ['./overallchart.component.scss']
})

export class OverallchartComponent implements OnInit {
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
    - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
    ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  machine_response: any;
  test: any;
  get_overall: any;
  first_loading: any;
  machine: any;
  show_machine: any;
  onSelect:any;
  myLoader = false;
  status: any;
  daterangepicker:any;
  new_date: any;
  new_date1:any;
  get_percent: any;
  constructor(private datepipe:DatePipe,private nav: NavbarService,private fb :FormBuilder,private service:OverallchartService) {
    this.nav.show();
  }

  displayedColumns = ['position', 'name','date','shift_num','weight', 'symbol','run_time','idle_time','disconnect'];
  form:FormGroup;
  shift_response:any;
  dataSource = new MatTableDataSource();



  ngOnInit() {


    this.form = this.fb.group({
      machine_name:["",],
      shift_num:["",],  
      date:["",]
    })

    // this.service.getmachines().subscribe(res =>{
    //   console.log(res);
    //   this.machine_response=res;
     
    // })

    // this.service.getshift().subscribe(res =>{
    //   console.log(res);
    //   this.shift_response=res;
    //   console.log(this.shift_response)
    // })

    // this.service.first_page_loading().subscribe(res =>{
    //   console.log(res);
    //   this.first_loading = res;
        
      
    //   this.form.patchValue({
    //     machine_name:this.machine_response[0],
    //     shift_num:this.shift_response[0].shift_no,
    //     date:this.first_loading['from_date'] + '-' + this.first_loading['to_date'],
    //      from_date:this.first_loading['from_date'],
    //      to_date:this.first_loading['to_date']          
    //   })
    //   console.log(this.form.patchValue)
    //   this.formtest();
    // })
    this.service.getmachines().subscribe(res =>{
      this.machine_response=res;
      this.form.patchValue({
        machine_name:this.machine_response[0],
      })
      this.service.getshift().subscribe(res =>{
        this.shift_response=res;
        this.form.patchValue({
          shift_num:this.shift_response[0].shift_no,
        })
        this.service.first_page_loading().subscribe(res =>{
          this.first_loading = res;

          this.form.patchValue({
            date : [this.first_loading['from_date'],this.first_loading['to_date']]
          })
          // this.minDate = this.first_loading['from_date']
          // this.maxDate = this.first_loading['to_date']
          this.formtest('true');
        })
      })
    })
  }

    
    
//   formtest(s){
//     console.log(s);
//     this.status=s;

//     this.myLoader = false;

//     console.log(this.form.value);
//     this.maxDate = this.datepipe.transform(this.maxDate);

//     let register = this.form.value;
//     console.log(register,"reg")
//     if(this.status == 'true'){
//        this.new_date=new DatePipe('en-US').transform(this.form.value.date[0],'MM/dd/yyyy');
//        this.new_date1=new DatePipe('en-US').transform(this.form.value.date[1],'MM/dd/yyyy');


//       let register={
//         "machine_name":this.form.value.machine_name,
//         "shift_num":this.form.value.shift_num,
//         "date":this.new_date + '-' + this.new_date1
//       }
//     this.service.get_overall_chart(register).subscribe(res =>{
//       console.log(res);
//       this.myLoader = false;
//       this.get_overall = res.table;
//       // console.log(this.get_overall.table);
//       this.dataSource = new MatTableDataSource(this.get_overall);
//     })
//   }
//   else{
//     this.service.get_overall_chart(register).subscribe(res =>{
//       console.log(res);
//       this.myLoader = false;
//       this.get_overall = res.table;
//       // console.log(this.get_overall.table);
//       this.dataSource = new MatTableDataSource(this.get_overall);
//     })
//   }
  

// }

formtest(s){
  this.status=s;
  this.myLoader = true;    
 

  // this.maxDate = this.datepipe.transform(this.maxDate);
  
  if(this.status == 'true'){
    this.new_date = new DatePipe('en-US').transform(this.form.value.date[0], 'MM/dd/yyyy');
    this.new_date1 = new DatePipe('en-US').transform(this.form.value.date[1], 'MM/dd/yyyy');
    let register={
      "machine_name":this.form.value.machine_name,
      "shift_num":this.form.value.shift_num,
      "date":this.new_date + '-' + this.new_date1
    }
 
    this.service.get_overall_chart(register).subscribe(res =>{
      this.myLoader = false;
      this.get_overall = res.table;
      if(res === [])
      {
        alert("No Results Found")
      }

      this.get_percent = res;
             this.dataSource = new MatTableDataSource(this.get_overall);
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
                  
                ]
              }]
        
            });
          })
  }
}

}
