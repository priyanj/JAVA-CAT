import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { DtCloudableComponent } from '../component/dt-cloudable.component';
import { DtCloudableRoutingModule } from '../router/dt-cloudable-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule,FormsModule,DataTablesModule,DtCloudableRoutingModule,TranslateModule.forChild()],
    declarations: [DtCloudableComponent]
})

export class DtCloudableModule {}
