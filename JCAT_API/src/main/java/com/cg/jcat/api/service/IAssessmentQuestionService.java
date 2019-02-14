package com.cg.jcat.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cg.jcat.api.dao.AssessmentQuestionModel;

@Service
public interface IAssessmentQuestionService {

	public List<AssessmentQuestionModel> getQuestions();

	public boolean saveQuestions(AssessmentQuestionModel assessmentQuestionModel);

	public boolean updateQuestion(AssessmentQuestionModel question);

	public boolean deleteQuestion(int questionId);

	public AssessmentQuestionModel getQuestionById(int questionId);

}
