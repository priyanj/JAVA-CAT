import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ForCloudProviderRoutingModule } from '../router/dt-cloud-provider-routing.module';
import { ForCloudProviderComponent } from '../component/dt-cloud-provider.component';
import { DTCloudProviderComponentRule } from '../component/dt-cloud-provider-rule.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, ForCloudProviderRoutingModule, DataTablesModule,FormsModule,TranslateModule.forChild()],
    declarations: [ForCloudProviderComponent,DTCloudProviderComponentRule]
})

export class ForCloudProviderModule {}
