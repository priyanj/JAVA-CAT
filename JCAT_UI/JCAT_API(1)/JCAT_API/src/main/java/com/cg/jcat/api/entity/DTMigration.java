package com.cg.jcat.api.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "dt_migration")
public class DTMigration {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int migrationId;
	private int evaluationOrder;
	private String migration_pattern;
	private String logicalOperator;
	@NotNull
	private String createdBy;
	@NotNull
	private Date createdTime;
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
		return migration_pattern;
	}

	public void setMigration_pattern(String migration_pattern) {
		this.migration_pattern = migration_pattern;
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
		return createdTime;
	}

	public void setCreatedTtime(Date createdTtime) {
		this.createdTime = createdTtime;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public Date getModified_time() {
		return modifiedTime;
	}

	public void setModified_time(Date modified_time) {
		this.modifiedTime = modified_time;
	}

	@Override
	public String toString() {
		return "DTMigration [migrationId=" + migrationId + ", evaluationOrder=" + evaluationOrder
				+ ", migration_pattern=" + migration_pattern + ", logicalOperator=" + logicalOperator + ", createdBy="
				+ createdBy + ", createdTtime=" + createdTime + ", modifiedBy=" + modifiedBy + ", modifiedTime="
				+ modifiedTime + "]";
	}
}
