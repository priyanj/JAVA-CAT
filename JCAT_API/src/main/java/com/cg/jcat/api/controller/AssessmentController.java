package com.cg.jcat.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.cg.jcat.api.dao.AnswerModel;
import com.cg.jcat.api.exception.ApplicationIdNotFoundException;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.service.IAssessmentService;

@Component
public class AssessmentController implements IAssessmentController {

	@Autowired
	IAssessmentService answerService;

	@Override
	public List<AnswerModel> getAnswers(int applicationId, int questionId) {
		return answerService.getAnswers(applicationId, questionId);
	}

	@Override
	public boolean saveAnswers(List<AnswerModel> answerModels, int applicationId)
			throws SystemExceptions, OptionTextNotNullException, CountMissMatchException {
		return answerService.saveAnswers(answerModels, applicationId);
	}

	@Override
	public void finalized(List<AnswerModel> answerModels, int applicationId, int assessmentStage)
			throws SystemExceptions, OptionTextNotNullException, ApplicationIdNotFoundException,
			CountMissMatchException {
		answerService.finalized(answerModels, applicationId, assessmentStage);
	}

}
