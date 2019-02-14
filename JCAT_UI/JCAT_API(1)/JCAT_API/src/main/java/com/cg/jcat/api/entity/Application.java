package com.cg.jcat.api.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "application", uniqueConstraints = { @UniqueConstraint(columnNames = "application_id") })
public class Application {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int aid;

	@NotNull
	@Column(name = "application_id")
	private String applicationId;

	@Column(name = "application_name")
	private String applicationName;

	@Lob
	@Column(name = "application_description")
	private String applicationDescription;

	@Column(name = "application_department")
	private String applicationDepartment;

	@Column(name = "priority")
	private int priority;

	@Column(name = "application_user")
	private int applicationUser;

	@ColumnDefault("0")
	@Column(name = "is_deleted")
	private boolean isDeleted;

	@ColumnDefault("1")
	@Column(name = "is_activate")
	private boolean isActivate = true;

	@ColumnDefault("0")
	@Column(name = "assessment_stage")
	@NotNull
	private int assessmentStage;

	@Column(name = "is_assessment_completed")
	private boolean isAssessmentCompleted;

	@Column(name = "assessment_completion_time")
	private Date assessmentCompletionTime;

	@ColumnDefault("0")
	@Column(name = "is_dt_cloudable")
	private boolean isDTCloudable;

	@ColumnDefault("0")
	@Column(name = "is_re_cloudable")
	private boolean isReCloudable;

	@Column(name = "dt_migration_pattern")
	private String dtMigrationPattern;

	@Column(name = "re_migration_pattern")
	private String reMigrationPattern;

	@Column(name = "dt_cloud_provider")
	private String dtCloudProvider;

	@Column(name = "re_cloud_provider")
	private String reCloudProvider;

	@CreatedBy
	@Column(name = "created_by")
	@NotNull(message = "set created By")
	private String createdBy;

	@CreatedDate
	@Column(name = "created_time")
	@NotNull(message = "set created time")
	private Date createdTime;

	@LastModifiedBy
	@Column(name = "modified_by")
	private String modifiedBy;

	@LastModifiedDate
	@Column(name = "modified_time")
	private Date modifiedTime;
	
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public int getAid() {
		return aid;
	}

	public void setAid(int aid) {
		this.aid = aid;
	}

	public String getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public String getApplicationDescription() {
		return applicationDescription;
	}

	public void setApplicationDescription(String applicationDescription) {
		this.applicationDescription = applicationDescription;
	}

	public String getApplicationDepartment() {
		return applicationDepartment;
	}

	public void setApplicationDepartment(String applicationDepartment) {
		this.applicationDepartment = applicationDepartment;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public int getApplicationUser() {
		return applicationUser;
	}

	public void setApplicationUser(int applicationUser) {
		this.applicationUser = applicationUser;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public boolean isActivate() {
		return isActivate;
	}

	public void setActivate(boolean isActivate) {
		this.isActivate = isActivate;
	}

	public int getAssessmentStage() {
		return assessmentStage;
	}

	public void setAssessmentStage(int assessmentStage) {
		this.assessmentStage = assessmentStage;
	}

	public boolean isAssessmentCompleted() {
		return isAssessmentCompleted;
	}

	public void setAssessmentCompleted(boolean isAssessmentCompleted) {
		this.isAssessmentCompleted = isAssessmentCompleted;
	}

	public Date getAssessmentCompletionTime() {
		return assessmentCompletionTime;
	}

	public void setAssessmentCompletionTime(Date assessmentCompletionTime) {
		this.assessmentCompletionTime = assessmentCompletionTime;
	}

	public boolean isDTCloudable() {
		return isDTCloudable;
	}

	public void setDTCloudable(boolean isDTCloudable) {
		this.isDTCloudable = isDTCloudable;
	}

	public boolean isReCloudable() {
		return isReCloudable;
	}

	public void setReCloudable(boolean isReCloudable) {
		this.isReCloudable = isReCloudable;
	}

	public String getDtMigrationPattern() {
		return dtMigrationPattern;
	}

	public void setDtMigrationPattern(String dtMigrationPattern) {
		this.dtMigrationPattern = dtMigrationPattern;
	}

	public String getReMigrationPattern() {
		return reMigrationPattern;
	}

	public void setReMigrationPattern(String reMigrationPattern) {
		this.reMigrationPattern = reMigrationPattern;
	}

	public String getDtCloudProvider() {
		return dtCloudProvider;
	}

	public void setDtCloudProvider(String dtCloudProvider) {
		this.dtCloudProvider = dtCloudProvider;
	}

	public String getReCloudProvider() {
		return reCloudProvider;
	}

	public void setReCloudProvider(String reCloudProvider) {
		this.reCloudProvider = reCloudProvider;
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

	public Date getCreatedTime() {
		return createdTime;
	}

	public Date getModifiedTime() {
		return modifiedTime;
	}

	@Override
	public String toString() {
		return "Application [aid=" + aid + ", applicationId=" + applicationId + ", applicationName=" + applicationName
				+ ", applicationDescription=" + applicationDescription + ", applicationDepartment="
				+ applicationDepartment + ", priority=" + priority + ", applicationUser=" + applicationUser
				+ ", isDeleted=" + isDeleted + ", isActivate=" + isActivate + ", assessmentStage=" + assessmentStage
				+ ", isAssessmentCompleted=" + isAssessmentCompleted + ", assessmentCompletionTime="
				+ assessmentCompletionTime + ", isDTCloudable=" + isDTCloudable + ", isReCloudable=" + isReCloudable
				+ ", dtMigrationPattern=" + dtMigrationPattern + ", reMigrationPattern=" + reMigrationPattern
				+ ", dtCloudProvider=" + dtCloudProvider + ", reCloudProvider=" + reCloudProvider + ", createdBy="
				+ createdBy + ", createdTime=" + createdTime + ", modifiedBy=" + modifiedBy + ", modifiedTime="
				+ modifiedTime + "]";
	}

}
