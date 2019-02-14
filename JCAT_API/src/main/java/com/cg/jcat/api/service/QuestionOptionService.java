package com.cg.jcat.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.dao.QuestionOptionDao;
import com.cg.jcat.api.dao.QuestionOptionModel;
import com.cg.jcat.api.exception.JcatExceptions;

@Component
public class QuestionOptionService implements IQuestionOptionService {

	@Autowired
	QuestionOptionDao questionOptionDao;

	@Override
	public List<QuestionOptionModel> getQuestionOptions() throws JcatExceptions {
		return questionOptionDao.getQuestionOptions();
	}

	@Override
	public boolean saveQuestionOption(QuestionOptionModel questionOptionModel) {
		return questionOptionDao.saveQuestionOptions(questionOptionModel) != null;
	}

	@Override
	public boolean updateQuestionOption(QuestionOptionModel questionOptionModel) {
		return questionOptionDao.updateQuestionOption(questionOptionModel);
	}

}
