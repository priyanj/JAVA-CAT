package com.cg.jcat.api.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.cg.jcat.api.dao.AnswerModel;
import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.exception.ApplicationIdNotFoundException;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;

@Service
public interface IAssessmentService {
	
	public List<AnswerModel> getAnswers(int applicationId,int assessmentStage);
	
	public boolean saveAnswers(List<AnswerModel> answerModels, int applicationId) throws SystemExceptions, OptionTextNotNullException, CountMissMatchException;
	
	public void finalized(List<AnswerModel> answerModels, int applicationId, int stage) throws SystemExceptions, OptionTextNotNullException, ApplicationIdNotFoundException, CountMissMatchException;

}
