import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatChartComponent } from './stat-chart/stat-chart.component';
import { StatSimpleComponent } from './stat-simple/stat-simple.component';


@NgModule({
  declarations: [
    AppComponent,
    StatChartComponent,
    StatSimpleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
