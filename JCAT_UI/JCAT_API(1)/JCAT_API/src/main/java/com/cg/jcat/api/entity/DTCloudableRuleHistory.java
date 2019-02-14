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
import javax.validation.constraints.NotNull;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "dt_cloudable_rule_history")
public class DTCloudableRuleHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	@Column(name = "cloudable_rule_id")
	private int cloudableRuleId;

	@Column(name = "execution_order")
	private int executionOrder;

	@Lob
	@Column(name = "question_text_EN")
	private String questiontTextEN;

	@Lob
	@Column(name = "rule_option_ids")
	private String ruleOptionIds;

	@Lob
	@Column(name = "rule_option_text_EN")
	private String ruleOptionTextEN;

	@Column(name = "created_by")
	@NotNull
	private String createdBy;

	@Column(name = "created_time")
	@NotNull
	private Date createdTime;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "questionId")
	private AssessmentQuestion assessmentQuestion;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCloudableRuleId() {
		return cloudableRuleId;
	}

	public void setCloudableRuleId(int cloudableRuleId) {
		this.cloudableRuleId = cloudableRuleId;
	}

	public int getExecutionOrder() {
		return executionOrder;
	}

	public void setExecutionOrder(int executionOrder) {
		this.executionOrder = executionOrder;
	}

	public String getQuestiontTextEN() {
		return questiontTextEN;
	}

	public void setQuestiontTextEN(String questiontTextEN) {
		this.questiontTextEN = questiontTextEN;
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

	public AssessmentQuestion getAssessmentQuestion() {
		return assessmentQuestion;
	}

	public void setAssessmentQuestion(AssessmentQuestion assessmentQuestion) {
		this.assessmentQuestion = assessmentQuestion;
	}

}
