import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RollComponent } from './pages/roll/roll.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
	declarations: [AppComponent, RollComponent, HomeComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
