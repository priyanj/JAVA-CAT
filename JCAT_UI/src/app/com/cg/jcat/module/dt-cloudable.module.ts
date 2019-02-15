import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { DtCloudableComponent } from '../component/dt-cloudable.component';
import { DtCloudableRoutingModule } from '../router/dt-cloudable-routing.module';

@NgModule({
    imports: [CommonModule,FormsModule,DataTablesModule,DtCloudableRoutingModule],
    declarations: [DtCloudableComponent]
})

export class DtCloudableModule {}
