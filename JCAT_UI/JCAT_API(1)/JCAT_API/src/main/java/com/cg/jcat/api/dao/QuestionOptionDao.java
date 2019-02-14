package com.cg.jcat.api.dao;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.cg.jcat.api.entity.QuestionOption;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.repository.IQuestionOptionRepository;

@Component
public class QuestionOptionDao {

	@Autowired
	private IQuestionOptionRepository questionRepository;

	public List<QuestionOptionModel> getQuestionOptions() throws JcatExceptions {
		List<QuestionOption> questionOptionList = new ArrayList<>();
		try {
			questionOptionList = questionRepository.findAll();
		} catch (Exception e) {

		}
		List<QuestionOptionModel> questionOptionDaoList = new ArrayList<QuestionOptionModel>();
		return togetQuestionOptions(questionOptionList, questionOptionDaoList);
	}

	private List<QuestionOptionModel> togetQuestionOptions(List<QuestionOption> questionOptionList,
			List<QuestionOptionModel> questionOptionDaoList) {

		for (QuestionOption questionOption : questionOptionList) {
			questionOptionDaoList.add(toQuestionOptionDao(questionOption));
		}
		return questionOptionDaoList;
	}

	private QuestionOptionModel toQuestionOptionDao(QuestionOption questionOption) {

		QuestionOptionModel questionOptionModel = new QuestionOptionModel();
		questionOptionModel.setOptionId(questionOption.getOptionId());
		questionOptionModel.setOptionTextEN(questionOption.getOptionTextEN());
		questionOptionModel.setOptionTextLang2(questionOption.getOptionTextLang2());
		// questionOptionModel.setQuestionId(questionOption.getQuestionId());
		return questionOptionModel;
	}

	private QuestionOption toQuestionOption(QuestionOptionModel questionOptionModel) {

		QuestionOption questionOption = new QuestionOption();
		questionOption.setOptionId(questionOptionModel.getOptionId());
		questionOption.setOptionTextEN(questionOptionModel.getOptionTextEN());
		questionOption.setOptionTextLang2(questionOptionModel.getOptionTextLang2());
		// questionOption.setQuestionId(questionOptionModel.getQuestionId());
		return questionOption;
	}

	public QuestionOptionModel saveQuestionOptions(QuestionOptionModel questionOptionModel) {
		try {
			saveQuestionOption(questionOptionModel);
		} catch (Exception e) {
			return null;
		}
		return null;
	}

	public boolean saveQuestionOption(QuestionOptionModel questionOptionModel) {
		boolean saveResult = false;
		saveResult = questionRepository.save(toQuestionOption(questionOptionModel)) != null;
		return saveResult;
	}

	public boolean updateQuestionOption(QuestionOptionModel questionOptionModel) {
		boolean updateResult = false;
		updateResult = questionRepository.saveAndFlush(toQuestionOption(questionOptionModel)) != null;
		return updateResult;
	}

	public QuestionOption findByOptionId(int optionId) {
		return questionRepository.findByOptionId(optionId);
	}

	public QuestionOption findByOptionTextEN(String optionTextEN) {
		return questionRepository.findByOptionTextEN(optionTextEN);
	}
}
