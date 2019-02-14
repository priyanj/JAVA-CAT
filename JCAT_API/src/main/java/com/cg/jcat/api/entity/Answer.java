package com.cg.jcat.api.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Answer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "answer_id")
	private int answerId;

	@Column(name = "application_id")
	private int applicationId;

	@Column(name = "question_id")
	private int questionId;

	@Lob
	@Column(name = "question_text_EN")
	private String questionTextEN;

	@Lob
	@Column(name = "option_ids")
	private String optionIds;

	@Lob
	@Column(name = "option_texts_EN")
	private String optionTextsEN;

	// @ColumnDefault("0")
	@Column(name = "dt_cloudable_rule_result")
	private boolean dtCloudableRuleResult;

	// @ColumnDefault("0")
	@Column(name = "dt_migration_rule_result")
	private boolean dtMigrationRuleResult;

	// @ColumnDefault("0")
	@Column(name = "dt_provider_rule_result")
	private boolean dtProviderRuleResult;

	@Column(name = "modified_by")
	private String modifiedBy;

	@Column(name = "modified_time")
	private Date modifiedTime;

	public int getAnswerId() {
		return answerId;
	}

	public void setAnswerId(int answerId) {
		this.answerId = answerId;
	}

	public int getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public String getQuestionTextEN() {
		return questionTextEN;
	}

	public void setQuestionTextEN(String questionTextEN) {
		this.questionTextEN = questionTextEN;
	}

	public String getOptionIds() {
		return optionIds;
	}

	public void setOptionIds(String optionIds) {
		this.optionIds = optionIds;
	}

	public String getOptionTextsEN() {
		return optionTextsEN;
	}

	public void setOptionTextsEN(String optionTextsEN) {
		this.optionTextsEN = optionTextsEN;
	}

	public boolean isDtCloudableRuleResult() {
		return dtCloudableRuleResult;
	}

	public void setDtCloudableRuleResult(boolean dtCloudableRuleResult) {
		this.dtCloudableRuleResult = dtCloudableRuleResult;
	}

	public boolean isDtMigrationRuleResult() {
		return dtMigrationRuleResult;
	}

	public void setDtMigrationRuleResult(boolean dtMigrationRuleResult) {
		this.dtMigrationRuleResult = dtMigrationRuleResult;
	}

	public boolean isDtProviderRuleResult() {
		return dtProviderRuleResult;
	}

	public void setDtProviderRuleResult(boolean dtProviderRuleResult) {
		this.dtProviderRuleResult = dtProviderRuleResult;
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
		return "Answer [answerId=" + answerId + ", applicationId=" + applicationId + ", questionId=" + questionId
				+ ", questionTextEN=" + questionTextEN + ", optionIds=" + optionIds + ", optionTextsEN=" + optionTextsEN
				+ ", dtCloudableRuleResult=" + dtCloudableRuleResult + ", dtMigrationRuleResult="
				+ dtMigrationRuleResult + ", dtProviderRuleResult=" + dtProviderRuleResult + ", modifiedBy="
				+ modifiedBy + ", modifiedTime=" + modifiedTime + "]";
	}

}
