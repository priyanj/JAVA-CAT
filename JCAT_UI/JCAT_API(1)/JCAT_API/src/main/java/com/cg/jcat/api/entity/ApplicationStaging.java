package com.cg.jcat.api.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;

@Entity
public class ApplicationStaging {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String applicationId;
	private String applicationName;
	private String applicationDescription;
	private String applicationDepartment;
	private int priority;
	private String userName;
	@ColumnDefault("'Initial'")
	private String stage;
	private String errorDescription;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getStage() {
		return stage;
	}

	public void setStage(String stage) {
		this.stage = stage;
	}

	public String getErrorDescription() {
		return errorDescription;
	}

	public void setErrorDescription(String errorDescription) {
		this.errorDescription = errorDescription;
	}

	@Override
	public String toString() {
		return "ApplicationStaging [id=" + id + ", applicationId=" + applicationId + ", applicationName="
				+ applicationName + ", applicationDescription=" + applicationDescription + ", applicationDepartment="
				+ applicationDepartment + ", priority=" + priority + ", userName=" + userName + ", stage=" + stage
				+ ", errorDescription=" + errorDescription + "]";
	}

}
