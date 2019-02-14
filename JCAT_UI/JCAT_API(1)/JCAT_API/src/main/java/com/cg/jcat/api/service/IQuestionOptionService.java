package com.cg.jcat.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cg.jcat.api.dao.QuestionOptionModel;
import com.cg.jcat.api.dao.UserModel;
import com.cg.jcat.api.exception.JcatExceptions;

@Service
public interface IQuestionOptionService {

	public List<QuestionOptionModel> getQuestionOptions() throws JcatExceptions;

	public boolean saveQuestionOption(QuestionOptionModel questionOptionModel);

	public boolean updateQuestionOption(QuestionOptionModel questionOptionModel);

}
