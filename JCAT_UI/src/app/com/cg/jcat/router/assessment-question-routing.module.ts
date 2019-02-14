import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentQuestionsComponent } from '../component/assessment-question.component';

const routes: Routes = [
    {
        path: '',
        component: AssessmentQuestionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssessmentQuestionsRoutingModule {}