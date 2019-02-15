import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DTMigrationPatternRoutingModule } from '../router/dt-migration-pattern-routing.module';
import { DTMigrationPatternComponent } from '../component/dt-migration-pattern.component';
import { DTMigrationPatternComponentRule } from '../component/dt-migration-pattern-rule.component';

@NgModule({
    imports: [CommonModule, DTMigrationPatternRoutingModule, FormsModule,ReactiveFormsModule,DataTablesModule],
    declarations: [DTMigrationPatternComponent,DTMigrationPatternComponentRule]
})

export class DTMigrationPatternModule {}
