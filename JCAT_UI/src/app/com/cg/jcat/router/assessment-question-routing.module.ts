import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentQuestionsComponent } from '../component/assessment-question.component';
import { AddAssessmentQuestionComponent } from '../component/add-assessment-question.component';
import { AssessmentQuestionUpdateComponent } from '../component/assessment-question-update.component';

const routes: Routes = [
    {
        path: '',
        component: AssessmentQuestionsComponent
    },
    { path: 'add-assessment-question', component: AddAssessmentQuestionComponent },
    { path: 'assessment-question-update', component: AssessmentQuestionUpdateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssessmentQuestionsRoutingModule {}