import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserslistComponent } from './userslist/userslist.component';

const routes: Routes = [
  {path : '',component: UserslistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
