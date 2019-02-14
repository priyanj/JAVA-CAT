package com.cg.jcat.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.dao.AssessmentQuestionDao;
import com.cg.jcat.api.dao.AssessmentQuestionModel;

@Component
public class AssessmentQuestionService implements IAssessmentQuestionService {

	@Autowired
	AssessmentQuestionDao assessmentQuestionDao;

	@Override
	public List<AssessmentQuestionModel> getQuestions() {
		return assessmentQuestionDao.getQuestions();
	}

	@Override
	public boolean saveQuestions(AssessmentQuestionModel assessmentQuestionsModel) {
		return assessmentQuestionDao.saveQuestions(assessmentQuestionsModel);
	}

	@Override
	public boolean deleteQuestion(int questionId) {
		return assessmentQuestionDao.deleteAssessmentQuestionById(questionId);
	}

	@Override
	public boolean updateQuestion(AssessmentQuestionModel assessmentQuestionModel) {
		return assessmentQuestionDao.updateQuestions(assessmentQuestionModel);
	}

	@Override
	public AssessmentQuestionModel getQuestionById(int questionId) {
		return assessmentQuestionDao.getQuestionById(questionId);
	}

}
