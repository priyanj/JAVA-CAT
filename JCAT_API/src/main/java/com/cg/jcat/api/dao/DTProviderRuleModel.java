package com.cg.jcat.api.dao;

public class DTProviderRuleModel {

	private int providerRuleId;
	private int providerId;
	private int evaluationOrder;
	private int questionId;
	private String questiontextEN;
	private String ruleOptionIds; // in case multiple options comma separated
	private String ruleOptionTextEN; // in case multiple options comma separated
	private String createdBy;
	private String modifiedBy;

	public int getProviderRuleId() {
		return providerRuleId;
	}

	public void setProviderRuleId(int providerRuleId) {
		this.providerRuleId = providerRuleId;
	}

	public int getProviderId() {
		return providerId;
	}

	public void setProviderId(int providerId) {
		this.providerId = providerId;
	}

	public int getEvaluationOrder() {
		return evaluationOrder;
	}

	public void setEvaluationOrder(int evaluationOrder) {
		this.evaluationOrder = evaluationOrder;
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
		return "DTProviderRuleModel [providerRuleId=" + providerRuleId + ", providerId=" + providerId
				+ ", evaluationOrder=" + evaluationOrder + ", questionId=" + questionId + ", questiontextEN="
				+ questiontextEN + ", ruleOptionIds=" + ruleOptionIds + ", ruleOptionTextEN=" + ruleOptionTextEN
				+ ", createdBy=" + createdBy + ", modifiedBy=" + modifiedBy + "]";
	}

	

}
