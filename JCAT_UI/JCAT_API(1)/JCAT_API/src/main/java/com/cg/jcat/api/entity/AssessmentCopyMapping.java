package com.cg.jcat.api.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class AssessmentCopyMapping {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "mapping_id")
	private int mappingId;

	@NotNull
	@Column(name = "source_aid")
	private int sourceAid;

	@NotNull
	@Column(name = "target_aid")
	private int targetAid;

	@NotNull
	@Column(name = "created_by")
	private String createdBy;

	@NotNull
	@Column(name = "created_time")
	private Date createdTime;

	public int getMappingId() {
		return mappingId;
	}

	public void setMappingId(int mappingId) {
		this.mappingId = mappingId;
	}

	public int getSourceAid() {
		return sourceAid;
	}

	public void setSourceAid(int sourceAid) {
		this.sourceAid = sourceAid;
	}

	public int getTargetAid() {
		return targetAid;
	}

	public void setTargetAid(int targetAid) {
		this.targetAid = targetAid;
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

	@Override
	public String toString() {
		return "assessmentCopyMapping [mappingId=" + mappingId + ", sourceAid=" + sourceAid + ", targetAid=" + targetAid
				+ ", createdBy=" + createdBy + ", createdTime=" + createdTime + "]";
	}

}
