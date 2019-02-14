package com.cg.jcat.api.dao;

public class DTProvidersModel {

	private int providerId;
	private int evaluationOrder;
	private String providerName;
	private String logicalOperator;

	public String getLogicalOperator() {
		return logicalOperator;
	}

	public void setLogicalOperator(String logicalOperator) {
		this.logicalOperator = logicalOperator;
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

	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}

	@Override
	public String toString() {
		return "CloudProvidersModel [providerId=" + providerId + ", evaluationOrder=" + evaluationOrder
				+ ", providerName=" + providerName + "]";
	}

}
