import { QuestionOption } from "./QuestionOption";
export class AssessmentQuestions{
    questionId : number;
    questionText : string;
    questionTextLang2 : string;
    questionDescriptionEN : string;
    questionDescriptionLang2 : string;
    questionType : string;
    displayOrder : number;
    numberOfOptions : number;
    isActive : number;
    isDeleted : boolean;
    assessmentTypeForMigration : boolean;
    assessmentTypeForCloudProvider : boolean;
    assessmentTypeForCloudable : boolean;
    createdBy : string;
    modifiedBy : string;
    public questionOptionModel : Array<QuestionOption> = [];

}