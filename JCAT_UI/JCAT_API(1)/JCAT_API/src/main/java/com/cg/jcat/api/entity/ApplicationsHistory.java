package com.cg.jcat.api.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "applications_history")
public class ApplicationsHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@NotNull
	@Column(name = "aid")
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

	@Column(name = "is_activate")
	private boolean isActivate;

	@NotNull
	@ColumnDefault("0")
	@Column(name = "assessment_stage")
	private int assessmentStage;

	@ColumnDefault("0")
	@Column(name = "is_assessment_completed")
	private boolean isAssessmentCompleted;

	@Column(name = "assessment_done_time")
	private Date assessmentDoneTime;

	@ColumnDefault("0")
	@Column(name = "is_dt_cloudable")
	private boolean isDtCloudable;

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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public Date getAssessmentDoneTime() {
		return assessmentDoneTime;
	}

	public void setAssessmentDoneTime(Date assessmentDoneTime) {
		this.assessmentDoneTime = assessmentDoneTime;
	}

	public boolean isDtCloudable() {
		return isDtCloudable;
	}

	public void setDtCloudable(boolean isDtCloudable) {
		this.isDtCloudable = isDtCloudable;
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
		return "ApplicationsHistory [id=" + id + ", aid=" + aid + ", applicationId=" + applicationId
				+ ", applicationName=" + applicationName + ", applicationDescription=" + applicationDescription
				+ ", applicationDepartment=" + applicationDepartment + ", priority=" + priority + ", applicationUser="
				+ applicationUser + ", isDeleted=" + isDeleted + ", isActivate=" + isActivate + ", assessmentStage="
				+ assessmentStage + ", isAssessmentCompleted=" + isAssessmentCompleted + ", assessmentDoneTime="
				+ assessmentDoneTime + ", isDtCloudable=" + isDtCloudable + ", isReCloudable=" + isReCloudable
				+ ", dtMigrationPattern=" + dtMigrationPattern + ", reMigrationPattern=" + reMigrationPattern
				+ ", dtCloudProvider=" + dtCloudProvider + ", reCloudProvider=" + reCloudProvider + ", createdBy="
				+ createdBy + ", createdTime=" + createdTime + ", modifiedBy=" + modifiedBy + ", modifiedTime="
				+ modifiedTime + "]";
	}

}
