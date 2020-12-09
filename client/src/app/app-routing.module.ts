import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {RollComponent} from './pages/roll/roll.component';
import {ExerciseComponent} from './pages/exercise/exercise.component';
import {ExtrasComponent} from './pages/extras/extras.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'roll',
		component: RollComponent
	},
	{
		path: 'exercise',
		component: ExerciseComponent
	},
	{
		path: 'extras',
		component: ExtrasComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
