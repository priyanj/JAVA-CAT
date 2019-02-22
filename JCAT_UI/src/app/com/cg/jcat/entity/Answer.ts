export class Answer {
    answerId: number;
    applicationId: number;
    questionId: number;
    questionTextEN: string;
    optionIds: string;
    optionTextsEN: string;
    dtCloudableRuleResult: boolean;
    dtMigrationRuleResult: boolean;
    dtProviderRuleResult: boolean;
    modifiedBy: string;
}