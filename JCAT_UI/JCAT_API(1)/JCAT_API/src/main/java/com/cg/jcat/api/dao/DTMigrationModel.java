package com.cg.jcat.api.dao;

import java.util.Date;

public class DTMigrationModel {

	private int migrationId;
	private int evaluationOrder;
	private String migrationPattern;
	private String logicalOperator;
	private String createdBy;
	private Date createdTtime;
	private String modifiedBy;
	private Date modifiedTime;

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

	public String getMigration_pattern() {
		return migrationPattern;
	}

	public void setMigration_pattern(String migration_pattern) {
		this.migrationPattern = migration_pattern;
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

	public Date getCreatedTtime() {
		return createdTtime;
	}

	public void setCreatedTtime(Date createdTtime) {
		this.createdTtime = createdTtime;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public Date getModifiedTime() {
		return modifiedTime;
	}

	public void setModifiedTime(Date modifiedTime) {
		this.modifiedTime = modifiedTime;
	}

	@Override
	public String toString() {
		return "DTMigrationModel [migrationId=" + migrationId + ", evaluationOrder=" + evaluationOrder
				+ ", migration_pattern=" + migrationPattern + ", logicalOperator=" + logicalOperator + ", createdBy="
				+ createdBy + ", createdTtime=" + createdTtime + ", modifiedBy=" + modifiedBy + ", modifiedTime="
				+ modifiedTime + "]";
	}

}
