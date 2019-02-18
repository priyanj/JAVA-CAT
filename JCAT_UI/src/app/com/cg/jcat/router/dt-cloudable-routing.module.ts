import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DtCloudableComponent } from '../component/dt-cloudable.component';

const routes: Routes = [
    {
        path: '',
        component: DtCloudableComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DtCloudableRoutingModule {}
