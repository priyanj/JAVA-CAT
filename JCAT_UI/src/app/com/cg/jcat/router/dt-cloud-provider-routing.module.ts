import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForCloudProviderComponent } from '../component/dt-cloud-provider.component';
import { DTCloudProviderComponentRule } from '../component/dt-cloud-provider-rule.component';

const routes: Routes = [
    {
        path: '',
        component: ForCloudProviderComponent
    },
    {
        path:'dt-cloud-provider-rule' , component : DTCloudProviderComponentRule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ForCloudProviderRoutingModule {}
