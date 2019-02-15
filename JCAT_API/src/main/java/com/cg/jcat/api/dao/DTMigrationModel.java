package com.cg.jcat.api.dao;

public class DTMigrationModel {

	private int migrationId;
	private int evaluationOrder;
	private String migrationPattern;
	private String logicalOperator;
	private String createdBy;
	private String modifiedBy;
	public int getMigrationId() {
		return migrationId;
	}
	public void setMigrationId(int migrationId) {
		this.migrationId = migrationId;
	}
	public int getEvaluationOrder() {
		return evaluationOrder;
	}
	public void setEvaluationOrder(int evaluationOrder) {
		this.evaluationOrder = evaluationOrder;
	}
	public String getMigrationPattern() {
		return migrationPattern;
	}
	public void setMigrationPattern(String migrationPattern) {
		this.migrationPattern = migrationPattern;
	}
	public String getLogicalOperator() {
		return logicalOperator;
	}
	public void setLogicalOperator(String logicalOperator) {
		this.logicalOperator = logicalOperator;
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
		return "DTMigrationModel [migrationId=" + migrationId + ", evaluationOrder=" + evaluationOrder
				+ ", migrationPattern=" + migrationPattern + ", logicalOperator=" + logicalOperator + ", createdBy="
				+ createdBy + ", modifiedBy=" + modifiedBy + "]";
	}
}
