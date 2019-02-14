package com.cg.jcat.api.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "dt_provider_rule_history")
public class DTProviderRuleHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@NotNull
	@Column(name = "provider_rule_id")
	private int providerRuleId;

	@Column(name = "execution_order")
	private int executionOrder;

	@Lob
	@NotNull
	@Column(name = "question_text_EN")
	private String questionTextEN;

	@Lob
	@NotNull
	@Column(name = "rule_option_ids")
	private String ruleOptionIds;

	@Lob
	@NotNull
	@Column(name = "rule_option_text_EN")
	private String ruleOptionTextEN;

	@NotNull
	@Column(name = "created_by")
	private String createdBy;

	@NotNull
	@Column(name = "created_time")
	private Date createdTime;

	@OneToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name="providerId")
	private DTProviders dtProviders;

	@OneToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name="questionId")
	private AssessmentQuestion assessmentQuestion;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProviderRuleId() {
		return providerRuleId;
	}

	public void setProviderRuleId(int providerRuleId) {
		this.providerRuleId = providerRuleId;
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

	public DTProviders getDtProviders() {
		return dtProviders;
	}

	public void setDtProviders(DTProviders dtProviders) {
		this.dtProviders = dtProviders;
	}

	public AssessmentQuestion getAssessmentQuestion() {
		return assessmentQuestion;
	}

	public void setAssessmentQuestion(AssessmentQuestion assessmentQuestion) {
		this.assessmentQuestion = assessmentQuestion;
	}

	@Override
	public String toString() {
		return "DTProviderRuleHistory [id=" + id + ", providerRuleId=" + providerRuleId + ", executionOrder="
				+ executionOrder + ", questionTextEN=" + questionTextEN + ", ruleOptionIds=" + ruleOptionIds
				+ ", ruleOptionTextEN=" + ruleOptionTextEN + ", createdBy=" + createdBy + ", createdTime=" + createdTime
				+ ", dtProviders=" + dtProviders + ", assessmentQuestion=" + assessmentQuestion + "]";
	}

}
