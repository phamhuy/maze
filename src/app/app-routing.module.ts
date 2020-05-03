import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MazeComponent } from './components/maze/maze.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/maze', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'maze', component: MazeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
