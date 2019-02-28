package com.cg.jcat.api.dao;

public class ApplicationModel {

	private int aid;
	private String applicationId;
	private String applicationName;
	private String applicationDescription;
	private String applicationDepartment;
	private int priority;
	private int applicationUser;
	private int assessmentStage;
	private boolean isDTCloudable;
	private boolean isRECloudable;
	private boolean isAssessmentCompleted;
	private String dtMigrationPattern;
	private String reMigrationPattern;
	private String dtCloudProvider;
	private String reCloudProvider;
	private String createdBy;
	private String modifiedBy;

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

	public int getAssessmentStage() {
		return assessmentStage;
	}

	public void setAssessmentStage(int assessmentStage) {
		this.assessmentStage = assessmentStage;
	}

	public boolean getIsDTCloudable() {
		return isDTCloudable;
	}

	public void setDTCloudable(boolean isDTCloudable) {
		this.isDTCloudable = isDTCloudable;
	}

	public boolean isRECloudable() {
		return isRECloudable;
	}

	public void setRECloudable(boolean isRECloudable) {
		this.isRECloudable = isRECloudable;
	}
	

	public boolean getIsAssessmentCompleted() {
		return isAssessmentCompleted;
	}

	public void setIsAssessmentCompleted(boolean isAssessmentCompleted) {
		this.isAssessmentCompleted = isAssessmentCompleted;
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

	@Override
	public String toString() {
		return "ApplicationModel [aid=" + aid + ", applicationId=" + applicationId + ", applicationName="
				+ applicationName + ", applicationDescription=" + applicationDescription + ", applicationDepartment="
				+ applicationDepartment + ", priority=" + priority + ", applicationUser=" + applicationUser
				+ ", assessmentStage=" + assessmentStage + ", isDTCloudable=" + isDTCloudable + ", isRECloudable="
				+ isRECloudable + ", isAssessmentCompleted=" + isAssessmentCompleted + ", dtMigrationPattern="
				+ dtMigrationPattern + ", reMigrationPattern=" + reMigrationPattern + ", dtCloudProvider="
				+ dtCloudProvider + ", reCloudProvider=" + reCloudProvider + ", createdBy=" + createdBy
				+ ", modifiedBy=" + modifiedBy + "]";
	}

}
