import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponents } from '../component/user.component';


const routes: Routes = [
  { path: '',component: UserComponents}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
