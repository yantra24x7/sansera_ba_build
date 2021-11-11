    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    import { SidebarComponent } from './Nav/sidebar/sidebar.component';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { RegisterModule } from './Components/register/register.module';
    import { SharedModule } from './Components/shared/shared.module';
    import { NavbarService } from './Nav/navbar.service';
    import { CoreModule } from '../app/Service/core/core.module';
    import { HighchartsChartModule } from 'highcharts-angular';
    import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
    import { CountUpModule } from 'ngx-countup';

    import { ChartModule } from 'angular-highcharts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
    
    @NgModule({
     declarations: [
      AppComponent,
        SidebarComponent
  ],
     imports: [
       BrowserModule,
     AppRoutingModule,HttpClientModule,
    ChartModule,
        BrowserAnimationsModule,
        RegisterModule, SharedModule,
       CoreModule,
       HighchartsChartModule,
       CountUpModule,
       ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })      
    
 ],
     providers: [NavbarService],
     bootstrap: [AppComponent]
    })
    export class AppModule { }