package com.cg.jcat.api.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "question_option")
public class QuestionOption {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "option_id")
	private int optionId;

	@Column(name = "option_text_EN")
	@NotNull
	private String optionTextEN;

	@Lob
	@Column(name = "option_text_lang2")
	private String optionTextLang2;

	@ManyToOne
	// @JoinColumn(name = "question_id")
	private AssessmentQuestion assessmentQuestion;

	public int getOptionId() {
		return optionId;
	}

	public void setOptionId(int optionId) {
		this.optionId = optionId;
	}

	public String getOptionTextEN() {
		return optionTextEN;
	}

	public void setOptionTextEN(String optionTextEN) {
		this.optionTextEN = optionTextEN;
	}

	public String getOptionTextLang2() {
		return optionTextLang2;
	}

	public void setOptionTextLang2(String optionTextLang2) {
		this.optionTextLang2 = optionTextLang2;
	}

	@JsonIgnore
	public AssessmentQuestion getAssessmentQuestion() {
		return assessmentQuestion;
	}

	public void setAssessmentQuestion(AssessmentQuestion assessmentQuestion) {
		this.assessmentQuestion = assessmentQuestion;
	}

	@Override
	public String toString() {
		return "QuestionOption [optionId=" + optionId + ", optionTextEN=" + optionTextEN + ", optionTextLang2="
				+ optionTextLang2 + "]";
	}

}
