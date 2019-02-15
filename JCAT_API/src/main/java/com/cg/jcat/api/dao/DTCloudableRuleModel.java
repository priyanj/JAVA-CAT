package com.cg.jcat.api.dao;

public class DTCloudableRuleModel {

	private int cloudableRuleId;
	private int executionOrder;
	private String questionTextEN;
	private String optionIds;
	private String optionTextsEN;
	private int questionId;
	private String createdBy;
	private String modifiedBy;


	public int getCloudableRuleId() {
		return cloudableRuleId;
	}

	public void setCloudableRuleId(int cloudableRuleId) {
		this.cloudableRuleId = cloudableRuleId;
	}

	public int getExecutionOrder() {
		return executionOrder;
	}

	public void setExecutionOrder(int executionOrder) {
		this.executionOrder = executionOrder;
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

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	@Override
	public String toString() {
		return "DTCloudableRuleModel [cloudableRuleId=" + cloudableRuleId + ", executionOrder=" + executionOrder
				+ ", questionTextEN=" + questionTextEN + ", optionIds=" + optionIds + ", optionTextsEN=" + optionTextsEN
				+ ", questionId=" + questionId + ", createdBy=" + createdBy + ", modifiedBy=" + modifiedBy + "]";
	}

	 

}
