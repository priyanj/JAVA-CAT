package com.cg.jcat.api.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "dt_providers")
public class DTProviders {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "provider_id")
	private int providerId;

	@Column(name = "evaluation_order")
	private int evaluationOrder;

	@Column(name = "provider_name")
	private String providerName;

	@Column(name = "logical_operator")
	private String logicalOperator;

	@NotNull
	@Column(name = "created_by")
	private String createdBy;

	@NotNull
	@Column(name = "created_time")
	private Date createdTime;

	@Column(name = "modified_by")
	private String modifiedBy;

	@Column(name = "modified_time")
	private Date modifiedTime;

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

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
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
		return "CloudProviders [providerId=" + providerId + ", evaluationOrder=" + evaluationOrder + ", providerName="
				+ providerName + ", logicalOperator=" + logicalOperator + ", createdBy=" + createdBy + ", createdTime="
				+ createdTime + ", modifiedBy=" + modifiedBy + ", modifiedTime=" + modifiedTime + "]";
	}

}
