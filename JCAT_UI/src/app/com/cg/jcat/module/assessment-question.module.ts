import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AssessmentQuestionsRoutingModule } from '../router/assessment-question-routing.module';
import { AssessmentQuestionsComponent } from '../component/assessment-question.component';
import { AssessmentQuestionsService } from '../service/assessment-questions.service';
import { AddAssessmentQuestionComponent } from '../component/add-assessment-question.component';
import { AssessmentQuestionUpdateComponent } from '../component/assessment-question-update.component';

@NgModule({
    imports: [CommonModule, AssessmentQuestionsRoutingModule,DataTablesModule,FormsModule,ReactiveFormsModule],
    declarations: [AssessmentQuestionsComponent,AddAssessmentQuestionComponent,AssessmentQuestionUpdateComponent],
    providers: [AssessmentQuestionsService]
})

export class AssessmentQuestionsModule {}