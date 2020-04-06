import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MazeComponent } from './components/maze/maze.component';


const routes: Routes = [
  { path: '', redirectTo: '/maze', pathMatch: 'full' },
  { path: 'maze', component: MazeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
