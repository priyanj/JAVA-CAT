package com.cg.jcat.api.dao;

public class DTMigrationRuleModel {

	private int migrationRuleId;
	private int migrationId;
	private int executionOrder;
	private int questionId;
	private String questiontextEN;
	private String ruleOptionIds;
	private String ruleOptionTextEN;
	private String createdBy;
	private String modifiedBy;

	public int getMigrationRuleId() {
		return migrationRuleId;
	}

	public void setMigrationRuleId(int migrationRuleId) {
		this.migrationRuleId = migrationRuleId;
	}

	public int getMigrationId() {
		return migrationId;
	}

	public void setMigrationId(int migrationId) {
		this.migrationId = migrationId;
	}

	public int getExecutionOrder() {
		return executionOrder;
	}

	public void setExecutionOrder(int executionOrder) {
		this.executionOrder = executionOrder;
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public String getQuestiontextEN() {
		return questiontextEN;
	}

	public void setQuestiontextEN(String questiontextEN) {
		this.questiontextEN = questiontextEN;
	}

	public String getRuleOptionIds() {
		return ruleOptionIds;
	}

	public void setRuleOptionIds(String ruleOptionIds) {
		this.ruleOptionIds = ruleOptionIds;
	}

	public String getRuleOptionTextEN() {
		return ruleOptionTextEN;
	}

	public void setRuleOptionTextEN(String ruleOptionTextEN) {
		this.ruleOptionTextEN = ruleOptionTextEN;
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
		return "DTMigrationRuleModel [migrationRuleId=" + migrationRuleId + ", migrationId=" + migrationId
				+ ", executionOrder=" + executionOrder + ", questionId=" + questionId + ", questiontextEN="
				+ questiontextEN + ", ruleOptionIds=" + ruleOptionIds + ", ruleOptionTextEN=" + ruleOptionTextEN
				+ ", createdBy=" + createdBy + ", modifiedBy=" + modifiedBy + "]";
	}

	

}
