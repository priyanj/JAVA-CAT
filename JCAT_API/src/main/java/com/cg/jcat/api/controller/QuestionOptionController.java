package com.cg.jcat.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.cg.jcat.api.dao.QuestionOptionModel;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.service.IQuestionOptionService;

@Component
public class QuestionOptionController implements IQuestionOptionController{
	private static final Logger logger = LoggerFactory.getLogger(QuestionOptionController.class);
	
	@Autowired
	private IQuestionOptionService questionOptionService;
	
	@Override
	public List<QuestionOptionModel> getQuestionOptions() {
		try {
			return questionOptionService.getQuestionOptions();
		} catch (JcatExceptions e) {
			logger.error("Error in getting options in getQuestionOptions()" + e);
			return null;
		}
	}
	
	@Override
	public void saveQuestionOption(QuestionOptionModel questionOptionModel) {
		try {
				questionOptionService.saveQuestionOption(questionOptionModel);
		} catch (Exception e) {
			logger.error("Error while saving question option in saveQuestionOption()" + e);
		}
	}

	@Override
	public void updateQuestionOption(QuestionOptionModel questionOptionModel) {
		try {
			questionOptionService.updateQuestionOption(questionOptionModel);
		} catch (Exception e) {
			logger.error("Error while updating question options in updateQuestionOption()" + e);
		}
	}

}
