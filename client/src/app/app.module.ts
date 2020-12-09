import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RollComponent} from './pages/roll/roll.component';
import {HomeComponent} from './pages/home/home.component';
import {ExerciseComponent} from './pages/exercise/exercise.component';
import {TableComponent} from './components/table/table.component';
import { ExtrasComponent } from './pages/extras/extras.component';

@NgModule({
	declarations: [
		AppComponent,
		RollComponent,
		HomeComponent,
		ExerciseComponent,
		TableComponent,
		ExtrasComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
