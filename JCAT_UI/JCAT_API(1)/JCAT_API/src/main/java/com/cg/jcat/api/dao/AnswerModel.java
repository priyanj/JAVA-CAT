package com.cg.jcat.api.dao;

public class AnswerModel {

	private int answerId;

	private int applicationId;

	private int questionId;

	private String questionTextEN;

	private String optionIds;

	private String optionTextsEN;

	private boolean dtCloudableRuleResult;

	private boolean dtMigrationRuleResult;

	private boolean dtProviderRuleResult;

	private String modifiedBy;

	public int getAnswerId() {
		return answerId;
	}

	public void setAnswerId(int answerId) {
		this.answerId = answerId;
	}

	public int getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public String getQuestionTextEN() {
		return questionTextEN;
	}

	public void setQuestionTextEN(String questionTextEN) {
		this.questionTextEN = questionTextEN;
	}

	public String getOptionIds() {
		return optionIds;
	}

	public void setOptionIds(String optionIds) {
		this.optionIds = optionIds;
	}

	public String getOptionTextsEN() {
		return optionTextsEN;
	}

	public void setOptionTextsEN(String optionTextsEN) {
		this.optionTextsEN = optionTextsEN;
	}

	public boolean isDtCloudableRuleResult() {
		return dtCloudableRuleResult;
	}

	public void setDtCloudableRuleResult(boolean dtCloudableRuleResult) {
		this.dtCloudableRuleResult = dtCloudableRuleResult;
	}

	public boolean isDtMigrationRuleResult() {
		return dtMigrationRuleResult;
	}

	public void setDtMigrationRuleResult(boolean dtMigrationRuleResult) {
		this.dtMigrationRuleResult = dtMigrationRuleResult;
	}

	public boolean isDtProviderRuleResult() {
		return dtProviderRuleResult;
	}

	public void setDtProviderRuleResult(boolean dtProviderRuleResult) {
		this.dtProviderRuleResult = dtProviderRuleResult;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	@Override
	public String toString() {
		return "AnswerModel [answerId=" + answerId + ", applicationId=" + applicationId + ", questionId=" + questionId
				+ ", questionTextEN=" + questionTextEN + ", optionIds=" + optionIds + ", optionTextsEN=" + optionTextsEN
				+ ", dtCloudableRuleResult=" + dtCloudableRuleResult + ", dtMigrationRuleResult="
				+ dtMigrationRuleResult + ", dtProviderRuleResult=" + dtProviderRuleResult + ", modifiedBy="
				+ modifiedBy + "]";
	}

}
