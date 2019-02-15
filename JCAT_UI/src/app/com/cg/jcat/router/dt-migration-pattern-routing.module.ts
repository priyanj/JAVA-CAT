import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DTMigrationPatternComponent } from '../component/dt-migration-pattern.component';
import { DTMigrationPatternComponentRule } from '../component/dt-migration-pattern-rule.component';

const routes: Routes = [
    {
        path: '',
        component: DTMigrationPatternComponent
    },
    { path: 'dt-migration-pattern-rule', component: DTMigrationPatternComponentRule },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DTMigrationPatternRoutingModule {}
