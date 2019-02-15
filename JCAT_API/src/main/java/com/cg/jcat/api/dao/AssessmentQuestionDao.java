package com.cg.jcat.api.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.cg.jcat.api.entity.AssessmentQuestion;
import com.cg.jcat.api.entity.QuestionOption;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;
import com.cg.jcat.api.service.IQuestionOptionService;

@Component
public class AssessmentQuestionDao {

	@Autowired
	IAssessmentQuestionRepository assessmentQuestionRepository;

	@Autowired
	IQuestionOptionService questionOptionService;


	boolean isDeleted = false, assessmentTypeForMigration=true, assessmentTypeForCloudProvider=true,assessmentTypeForCloudable = true;;

	public List<AssessmentQuestionModel> getQuestions() {
		List<AssessmentQuestionModel> assessmentQuestionDAOList = new ArrayList<AssessmentQuestionModel>();
		List<AssessmentQuestion> assessmentQuestionList = assessmentQuestionRepository.findAll();
		return toGetQuestions(assessmentQuestionList, assessmentQuestionDAOList);
	}

	public List<AssessmentQuestionModel> toGetQuestions(List<AssessmentQuestion> assessmentQuestionList,
			List<AssessmentQuestionModel> assessmentQuestionDAOList) {

		for (AssessmentQuestion assessmentQuestion : assessmentQuestionList) {
			assessmentQuestionDAOList.add(toAssessmentQuestionDao(assessmentQuestion));
		}
		return assessmentQuestionDAOList;
	}

	public boolean saveQuestions(AssessmentQuestionModel assessmentQuestionsModel) {
		return assessmentQuestionRepository.save(toAssessmentQuestionService(assessmentQuestionsModel)) != null;
	}

	public boolean deleteAssessmentQuestionById(int questionId) {
		AssessmentQuestion assessmentQuestion = new AssessmentQuestion();
		assessmentQuestion = findByQuestionId(questionId);
		assessmentQuestion.setDeleted(true);
		if (assessmentQuestion.isDeleted()) {
			assessmentQuestionRepository.saveAndFlush(assessmentQuestion);
			return true;
		} else {
			return false;
		}
	}

	public boolean updateQuestions(AssessmentQuestionModel assessmentQuestionModel) {
		System.out.println(assessmentQuestionModel);
		boolean result = false;
		result = assessmentQuestionRepository
				.saveAndFlush(toAssessmentQuestionService(assessmentQuestionModel)) != null;
		return result;
	}

	private AssessmentQuestion toAssessmentQuestionService(AssessmentQuestionModel assessmentQuestionsModel) {
		AssessmentQuestion assessmentQuestion = new AssessmentQuestion();
		if (assessmentQuestionRepository.findByQuestionId(assessmentQuestionsModel.getQuestionId()) != null) {
			assessmentQuestion = assessmentQuestionRepository
					.findByQuestionId(assessmentQuestionsModel.getQuestionId());
		}
		assessmentQuestion.setAssessmentTypeForCloudable(assessmentQuestionsModel.isAssessmentTypeForCloudable());
		assessmentQuestion
				.setAssessmentTypeForCloudProvider(assessmentQuestionsModel.isAssessmentTypeForCloudProvider());
		assessmentQuestion.setAssessmentTypeForMigration(assessmentQuestionsModel.isAssessmentTypeForMigration());
		assessmentQuestion.setCreatedBy(assessmentQuestionsModel.getCreatedBy());
		assessmentQuestion.setDeleted(assessmentQuestionsModel.isDeleted());
		assessmentQuestion.setDisplayOrder(assessmentQuestionsModel.getDisplayOrder());
		assessmentQuestion.setModifiedBy(assessmentQuestionsModel.getModifiedBy());
		assessmentQuestion.setQuestionDescriptionEN(assessmentQuestionsModel.getQuestionDescriptionEN());
		assessmentQuestion.setQuestionDescriptionLang2(assessmentQuestionsModel.getQuestionDescriptionLang2());
		assessmentQuestion.setQuestionId(assessmentQuestionsModel.getQuestionId());
		assessmentQuestion.setQuestionTextEN(assessmentQuestionsModel.getQuestionTextEN());
		assessmentQuestion.setQuestionTextLang2(assessmentQuestionsModel.getQuestionTextLang2());
		assessmentQuestion.setQuestionType(assessmentQuestionsModel.getQuestionType());
		assessmentQuestion.setNumberOfOptions(assessmentQuestionsModel.getNumberOfOptions());
		//assessmentQuestion.setCreatedTime(assessmentQuestionsModel.getCreatedTime());
		List<QuestionOption> questionOptionList = new ArrayList<>();

		try {
			for (QuestionOptionModel questionOptionModel : assessmentQuestionsModel.getQuestionOptionModel()) {
				questionOptionList.add(toQuestionOption(questionOptionModel, assessmentQuestion));
			}
			assessmentQuestion.setQuestionOption(questionOptionList);
		} catch (Exception e) {
		}
		return assessmentQuestion;
	}

	public QuestionOption toQuestionOption(QuestionOptionModel questionOptionModel,
			AssessmentQuestion assessmentQuestion) {
		QuestionOption questionOption = new QuestionOption();
		questionOption.setOptionId(questionOptionModel.getOptionId());
		questionOption.setOptionTextEN(questionOptionModel.getOptionTextEN());
		questionOption.setOptionTextLang2(questionOptionModel.getOptionTextLang2());
		questionOption.setAssessmentQuestion(assessmentQuestion);
		return questionOption;
	}

	public QuestionOptionModel toQuestionOptionModel(QuestionOption questionOption,
			AssessmentQuestionModel assessmentQuestionModel) {
		QuestionOptionModel questionOptionModel = new QuestionOptionModel();
		questionOptionModel.setOptionId(questionOption.getOptionId());
		questionOptionModel.setOptionTextEN(questionOption.getOptionTextEN());
		questionOptionModel.setOptionTextLang2(questionOption.getOptionTextLang2());
		//questionOptionModel.setAssessmentQuestionModel(assessmentQuestionModel);
		return questionOptionModel;
	}

	private AssessmentQuestionModel toAssessmentQuestionDao(AssessmentQuestion assessmentQuestion) {
		AssessmentQuestionModel assessmentQuestionModel = new AssessmentQuestionModel();
		assessmentQuestionModel.setAssessmentTypeForCloudable(assessmentQuestion.isAssessmentTypeForCloudable());
		assessmentQuestionModel
				.setAssessmentTypeForCloudProvider(assessmentQuestion.isAssessmentTypeForCloudProvider());
		assessmentQuestionModel.setAssessmentTypeForMigration(assessmentQuestion.isAssessmentTypeForMigration());
		assessmentQuestionModel.setCreatedBy(assessmentQuestion.getCreatedBy());
		assessmentQuestionModel.setDeleted(assessmentQuestion.isDeleted());
		assessmentQuestionModel.setDisplayOrder(assessmentQuestion.getDisplayOrder());
		assessmentQuestionModel.setModifiedBy(assessmentQuestion.getModifiedBy());
		assessmentQuestionModel.setQuestionDescriptionEN(assessmentQuestion.getQuestionDescriptionEN());
		assessmentQuestionModel.setQuestionDescriptionLang2(assessmentQuestion.getQuestionDescriptionLang2());
		assessmentQuestionModel.setQuestionId(assessmentQuestion.getQuestionId());
		assessmentQuestionModel.setQuestionTextEN(assessmentQuestion.getQuestionTextEN());
		assessmentQuestionModel.setQuestionTextLang2(assessmentQuestion.getQuestionTextLang2());
		assessmentQuestionModel.setQuestionType(assessmentQuestion.getQuestionType());
		assessmentQuestionModel.setNumberOfOptions(assessmentQuestion.getNumberOfOptions());
		List<QuestionOptionModel> questionOptionModelList = new ArrayList<>();
		for (QuestionOption questionOption : assessmentQuestion.getQuestionOption()) {
			questionOptionModelList.add(toQuestionOptionModel(questionOption, assessmentQuestionModel));
		}
		assessmentQuestionModel.setQuestionOptionModel(questionOptionModelList);
		return assessmentQuestionModel;
	}

	private AssessmentQuestionModel toAssessmentQuestionModel(AssessmentQuestion assessmentQuestion) {
		AssessmentQuestionModel assessmentQuestionModel = new AssessmentQuestionModel();
		assessmentQuestionModel.setAssessmentTypeForCloudable(assessmentQuestion.isAssessmentTypeForCloudable());
		assessmentQuestionModel
				.setAssessmentTypeForCloudProvider(assessmentQuestion.isAssessmentTypeForCloudProvider());
		assessmentQuestionModel.setAssessmentTypeForMigration(assessmentQuestion.isAssessmentTypeForMigration());
		assessmentQuestionModel.setCreatedBy(assessmentQuestion.getCreatedBy());
		assessmentQuestionModel.setDeleted(assessmentQuestion.isDeleted());
		assessmentQuestionModel.setDisplayOrder(assessmentQuestion.getDisplayOrder());
		assessmentQuestionModel.setModifiedBy(assessmentQuestion.getModifiedBy());
		assessmentQuestionModel.setQuestionDescriptionEN(assessmentQuestion.getQuestionDescriptionEN());
		assessmentQuestionModel.setQuestionDescriptionLang2(assessmentQuestion.getQuestionDescriptionLang2());
		assessmentQuestionModel.setQuestionId(assessmentQuestion.getQuestionId());
		assessmentQuestionModel.setQuestionTextEN(assessmentQuestion.getQuestionTextEN());
		assessmentQuestionModel.setQuestionTextLang2(assessmentQuestion.getQuestionTextLang2());
		assessmentQuestionModel.setQuestionType(assessmentQuestion.getQuestionType());
		assessmentQuestionModel.setNumberOfOptions(assessmentQuestion.getNumberOfOptions());
		return assessmentQuestionModel;
	}

	public AssessmentQuestionModel getQuestionById(int questionId) {
		return toAssessmentQuestionModel(findByQuestionId(questionId));
	}

	public AssessmentQuestion findByQuestionId(int questionId) {
		return assessmentQuestionRepository.findByQuestionId(questionId);
	}

	public AssessmentQuestion findByQuestionTextEn(String questionTextEN) {
		return assessmentQuestionRepository.findByQuestionTextEN(questionTextEN);
	}

	public List<AssessmentQuestionModel> getQuestionsByMigrationId() {
		List<AssessmentQuestion> assessmentQuestion = assessmentQuestionRepository.findAllByIsDeletedAndAssessmentTypeForMigration(isDeleted,assessmentTypeForMigration);
		List<AssessmentQuestionModel> assessmentQuestionModel1 = new ArrayList<>();
		return toGetQuestions(assessmentQuestion, assessmentQuestionModel1) ;
	}
	
	public List<AssessmentQuestionModel> getQuestionsByProvider() {
		List<AssessmentQuestion> assessmentQuestion = assessmentQuestionRepository.findAllByIsDeletedAndAssessmentTypeForCloudProvider(isDeleted,assessmentTypeForCloudProvider);
		List<AssessmentQuestionModel> assessmentQuestionModel1 = new ArrayList<>();
		return toGetQuestions(assessmentQuestion, assessmentQuestionModel1) ;
	}
	public List<AssessmentQuestionModel> getCloudableQuestions() {

		List<AssessmentQuestionModel> assessmentQuestionModelList = new ArrayList<AssessmentQuestionModel>();
		List<AssessmentQuestion> assessmentQuestionList =assessmentQuestionRepository.findAllByIsDeletedAndAssessmentTypeForCloudable(isDeleted,
				assessmentTypeForCloudable);
		
		return toGetQuestions(assessmentQuestionList, assessmentQuestionModelList);
	}

}
