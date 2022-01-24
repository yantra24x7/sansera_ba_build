import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { Component, OnInit,OnChanges,SimpleChanges,Inject,Input} from '@angular/core';
import { LoginService } from '../../Service/app/login.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { NavbarService } from '../navbar.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  count_machine:any;
  pri: any;
  primaryColor: string;
  modu_name:any;
    opened: boolean;
    public sidebarToggled = false;
  show1: boolean;
  @Input()navStatus: boolean;
  available:any;
  show2: boolean;
  drawer:any;
  tenant_name:any;
  sidebarnavigate:any;
  // private nav:any;
  // nav:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  rolename: string;

  constructor(private servie:LoginService,public nav: NavbarService, private route: Router, private breakpointObserver: BreakpointObserver) {
    this.nav.hide();

   }

  ngOnInit() {

    this.tenant_name = localStorage.getItem('ten_name');

    this.servie.true().pipe(untilDestroyed(this)).subscribe(res=>{
      localStorage.setItem('sign', res);
     

    })

    this.rolename = localStorage.getItem('role_name');
  
  }
  changeTheme(primary: string) {

    console.log(primary)

    console.log(primary);
    localStorage.setItem('pri_mary_col_vapmso', primary);
  
  
    document.documentElement.style.setProperty('--primary-color', primary);
  
  }
 


    // pickRedInt(){
    //   const toread = (<HTMLInputElement>document.getElementById('color_pick')).value;
    //   const r_value = (parseInt(toread.substr(1,2), 16));
    //   const g_value = (parseInt(toread.substr(3,2), 16));
    //   const b_value = (parseInt(toread.substr(5,2), 16));
    //   const all_rgb = [r_value, g_value, b_value ];
    //   console.log(r_value,g_value,b_value);    
    //   document.documentElement.style.setProperty('--primary-color', all_rgb);
  
    // }
    
     


  shift(){
    this.servie.machine_count().pipe(untilDestroyed(this)).subscribe(res=>{
      this.count_machine = res.shift_data;
      if(this.count_machine === false){
          Swal.fire({
            title: 'Register Shift',
            // type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.value) {
              localStorage.clear();
              this.route.navigateByUrl('/shift');
            }
          });

      }
      else{
        this.route.navigateByUrl('/new_dashboard');
        if(window.innerWidth  < 600){
          this.toggleSidebar();
        }

      }
  // debugger
     

    })
  
   

   
  }
  oeeclick(){
    let assidebar = document.querySelector('.sidenav');
    let body = document.querySelector('body');
     if(window.innerWidth  >= 1920 || window.innerWidth  < 600){
      this.toggleSidebar();
    //   if(assidebar.classList.contains('sss' || '' ))    
    // {
    //   assidebar.classList.add('sidebar-hidden');
    //     body.classList.add('activemenu');
    //     assidebar.classList.remove('sss');
    // }
    // else
    // { 
    //   assidebar.classList.remove('sidebar-hidden');
    //   body.classList.remove('activemenu');
    //   assidebar.classList.add('sss');
    
    // }
    }

     
  
  }
  shifting(){
   
   
    if(window.innerWidth  < 600){
      this.toggleSidebar();
    }
    
 
   
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.navStatus.currentValue){
      this.pri = localStorage.getItem('color_theme')
      console.log(this.pri);
      this.changeTheme(this.pri);
      this.tenant_name = localStorage.getItem('ten_name');
      this.modu_name = localStorage.getItem('mod_name');
      this.rolename = localStorage.getItem('role_name');
      this.available =  localStorage.getItem('disable');
      if(window.innerWidth  < 600){
        this.toggleSidebar();
      }
     

    }
  
     

} 
 view() {
    this.show2 = !this.show2
  }
  toggle() {
    this.show1 = !this.show1
  }
  // close() {
  //   Swal.fire({
  //     title: 'Are you sure want to logout?',
  //     // icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No'
  //   }).then((result) => {
  //     if (result) {
  //       localStorage.clear();
  //       this.route.navigateByUrl('');
  //     }
  //   });
  // }

  refresh(){
    location.reload();
  }
 // toggle sidebar
// toggle sidebar


toggleSidebar() {
  let assidebar = document.querySelector('.sidenav');
  let body = document.querySelector('body');
  
  console.log(assidebar);
 
    this.sidebarToggled = !this.sidebarToggled;
    console.log(this.sidebarToggled );
    //  debugger
    if(window.innerWidth  < 600){
      if(assidebar.classList.contains('sss' || '' ))    
      {
        assidebar.classList.add('sidebar-hidden');
          body.classList.add('activemenu');
          assidebar.classList.remove('sss');
      }
      else
      { 
        assidebar.classList.remove('sidebar-hidden');
        body.classList.remove('activemenu');
        assidebar.classList.add('sss');
      
      }
    }
   else if (window.innerWidth  >= 1920){
      //   if(assidebar.classList.contains('sss' || '' ))    
    // {
    //   assidebar.classList.add('sidebar-hidden');
    //     body.classList.add('activemenu');
    //     assidebar.classList.remove('sss');
    // }
    // else
    // { 
    //   assidebar.classList.remove('sidebar-hidden');
    //   body.classList.remove('activemenu');
    //   assidebar.classList.add('sss');
    
    // }
      if(assidebar.classList.contains('sss' || '' ))    
      {
        assidebar.classList.add('sidebar-hidden');
          body.classList.add('activemenu');
          assidebar.classList.remove('sss');
      }
      else
      { 
        assidebar.classList.remove('sidebar-hidden');
        body.classList.remove('activemenu');
        assidebar.classList.add('sss');
      
      }
    }
else{
if(this.sidebarToggled) {
  assidebar.classList.add('sidebar-hidden');
  body.classList.add('activemenu');
  assidebar.classList.remove('sss');
} 
else {
  assidebar.classList.remove('sidebar-hidden');
  body.classList.remove('activemenu');
  assidebar.classList.add('sss');
}
}
  

   
}
  ngOnDestroy() {}
  close() {
    Swal.fire({
      title: 'Are you sure want to logout?',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        localStorage.clear();
        this.route.navigateByUrl('');
      }
    });
  }
}



