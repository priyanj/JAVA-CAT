package com.cg.jcat.api.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "dt_migration_rule_history")
public class DTMigrationRuleHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column
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

	@Column(name = "created_by")
	private String createdBy;

	@Column(name = "created_time")
	private Date createdTime;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "migrationId")
	private DTMigration dtMigration;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "questionId")
	private AssessmentQuestion assessmentQuestion;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
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

	public int getMigrationRuleId() {
		return migrationRuleId;
	}

	public void setMigrationRuleId(int migrationRuleId) {
		this.migrationRuleId = migrationRuleId;
	}

	@Override
	public String toString() {
		return "DTMigrationRuleHistory [id=" + id + ", migrationRuleId=" + migrationRuleId + ", executionOrder="
				+ executionOrder + ", questionTextEN=" + questionTextEN + ", ruleOptionIds=" + ruleOptionIds
				+ ", ruleOptionTextEN=" + ruleOptionTextEN + ", createdBy=" + createdBy + ", createdTime=" + createdTime
				+ "]";
	}

}
