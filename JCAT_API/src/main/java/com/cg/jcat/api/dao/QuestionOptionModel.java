package com.cg.jcat.api.dao;

public class QuestionOptionModel {

	private int optionId;

	private String optionTextEN;

	private String optionTextLang2;

	private AssessmentQuestionModel assessmentQuestionModel;

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

	public AssessmentQuestionModel getAssessmentQuestionModel() {
		return assessmentQuestionModel;
	}

	public void setAssessmentQuestionModel(AssessmentQuestionModel assessmentQuestionModel) {
		this.assessmentQuestionModel = assessmentQuestionModel;
	}

	@Override
	public String toString() {
		return "QuestionOptionModel [optionId=" + optionId + ", optionTextEN=" + optionTextEN + ", optionTextLang2="
				+ optionTextLang2 + ", assessmentQuestionModel=" + assessmentQuestionModel + "]";
	}

}
