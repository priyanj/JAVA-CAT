package com.cg.jcat.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTCloudableRuleModel;
import com.cg.jcat.api.entity.AssessmentQuestion;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;
import com.cg.jcat.api.service.IAssessmentQuestionService;
import com.cg.jcat.api.utility.QuestionTypeEnum;

@Component
public class AssessmentQuestionController implements IAssessmentQuestionController {

	private static final Logger logger = LoggerFactory.getLogger(AssessmentQuestionController.class);

	@Autowired
	private IAssessmentQuestionRepository repository;

	@Autowired
	private IAssessmentQuestionService assessmentQuestionService;

	@Override
	public List<AssessmentQuestion> getQuestions() {
		try {
			return repository.findAll();
		} catch (Exception e) {
			logger.error("Error getting assessment questions");
		}
		return repository.findAll();
	}
	
	@Override
	public List<QuestionTypeEnum> getQuestionType() {
		
		return assessmentQuestionService.getQuestionType();
	} 

	@Override
	public void saveQuestions(AssessmentQuestionModel assessmentQuestionModel) {
		System.out.println(assessmentQuestionModel);
		assessmentQuestionService.saveQuestions(assessmentQuestionModel);
	}

	@Override
	public void updateQuestion(AssessmentQuestionModel question) {
		assessmentQuestionService.updateQuestion(question);

	}

	@Override
	public void deleteQuestion(int questionId) {
		try {
			assessmentQuestionService.deleteQuestion(questionId);

		} catch (Exception e) {
			logger.error("Error deleting assessment questions");
		}

	}

	@Override
	public AssessmentQuestionModel getQuestionById(int questionId) {
		return assessmentQuestionService.getQuestionById(questionId);
	}

	
	@Override
	public List<AssessmentQuestionModel> getCloudableQuestions() {
		
		return assessmentQuestionService.getCloudableQuestions();
	}

}
