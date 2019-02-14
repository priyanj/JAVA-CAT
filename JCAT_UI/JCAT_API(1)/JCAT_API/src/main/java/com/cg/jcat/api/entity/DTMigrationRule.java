package com.cg.jcat.api.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "dt_migration_rule")
public class DTMigrationRule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "migration_rule_id")
	private int migrationRuleId;

	@Column(name = "execution_order")
	private int executionOrder;

	@Lob
	@Column(name = "question_text_EN")
	private String questionTextEN;

	@Lob
	@Column(name = "rule_option_ids")
	private String ruleOptionIds;

	@Lob
	@Column(name = "rule_option_text_EN")
	private String ruleOptionTextEN;

	@CreatedBy
	@NotNull
	@Column(name = "created_by")
	private String createdBy;

	@CreatedDate
	@NotNull
	@Column(name = "created_time")
	private Date createdTime;

	@LastModifiedBy
	@Column(name = "modified_by")
	private String modifiedBy;

	@LastModifiedDate
	@Column(name = "modified_time")
	private Date modifiedTime;

	@OneToOne(fetch = FetchType.EAGER)
	private DTMigration dtMigration;

	@OneToOne(fetch = FetchType.EAGER)
	private AssessmentQuestion assessmentQuestion;

	public int getMigrationRuleId() {
		return migrationRuleId;
	}

	public void setMigrationRuleId(int migrationRuleId) {
		this.migrationRuleId = migrationRuleId;
	}

	public int getExecutionOrder() {
		return executionOrder;
	}

	public void setExecutionOrder(int executionOrder) {
		this.executionOrder = executionOrder;
	}

	public String getQuestionTextEN() {
		return questionTextEN;
	}

	public void setQuestionTextEN(String questionTextEN) {
		this.questionTextEN = questionTextEN;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public String getQuestiontextEN() {
		return questionTextEN;
	}

	public void setQuestiontextEN(String questiontextEN) {
		this.questionTextEN = questiontextEN;
	}

	public String getRuleOptionIds() {
		return ruleOptionIds;
	}

	public void setRuleOptionIds(String ruleOptionIds) {
		this.ruleOptionIds = ruleOptionIds;
	}

	public String getRuleOptionTextEN() {
		return ruleOptionTextEN;
	}

	public void setRuleOptionTextEN(String ruleOptionTextEN) {
		this.ruleOptionTextEN = ruleOptionTextEN;
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

	public DTMigration getDtMigration() {
		return dtMigration;
	}

	public void setDtMigration(DTMigration dtMigration) {
		this.dtMigration = dtMigration;
	}

	public AssessmentQuestion getAssessmentQuestion() {
		return assessmentQuestion;
	}

	public void setAssessmentQuestion(AssessmentQuestion assessmentQuestion) {
		this.assessmentQuestion = assessmentQuestion;
	}

	@Override
	public String toString() {
		return "DTMigrationRule [migrationRuleId=" + migrationRuleId + ", executionOrder=" + executionOrder
				+ ", questionTextEN=" + questionTextEN + ", ruleOptionIds=" + ruleOptionIds + ", ruleOptionTextEN="
				+ ruleOptionTextEN + ", createdBy=" + createdBy + ", createdTime=" + createdTime + ", modifiedBy="
				+ modifiedBy + ", modifiedTime=" + modifiedTime + "]";
	}

}
