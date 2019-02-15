import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JcatComponent } from './jcat.component';

const routes: Routes = [
  {
      path: '',
      component: JcatComponent,
      children: [
          { path: '', redirectTo: 'dashboard' },
          { path: 'user', loadChildren: './module/user.module#UserModule' },
          { path: 'application', loadChildren: './module/application.module#ApplicationModule' },
          { path: 'dashboard', loadChildren: './module/dashboard.module#DashboardModule' },
          { path: 'assessment-questions', loadChildren: './module/assessment-question.module#AssessmentQuestionsModule'},
          { path: 'dt-migration-pattern', loadChildren: './module/dt-migration-pattern.module#DTMigrationPatternModule'},
          { path: 'dt-cloud-provider', loadChildren: './module/dt-cloud-provider.module#ForCloudProviderModule'}
      ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JcatRoutingModule { }
