import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from '../component/application.component';
import { AssesstApplicationComponent } from '../component/assesst-application.component';

const routes: Routes = [
    { path: '', component: ApplicationComponent},  
    { path: 'assesst-application', component: AssesstApplicationComponent },  
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule {}
