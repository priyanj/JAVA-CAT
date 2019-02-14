import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JCATLoginComponent } from '../component/login.component';

const routes: Routes = [
  {
    path: '', component: JCATLoginComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
