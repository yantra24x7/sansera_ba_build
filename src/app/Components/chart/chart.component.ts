import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../Service/app/chart.service';
import { NavbarService } from '../../Nav/navbar.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    myLoader = false;
   oee:any;
  constructor(private service:ChartService,private nav:NavbarService) {
    this.nav.hide();
   }

  ngOnInit() {
  // this.myLoader = true; 
  this.service.oee().subscribe(res =>{
  // this.myLoader = false;
  this.oee = res;
  })



  }

}
