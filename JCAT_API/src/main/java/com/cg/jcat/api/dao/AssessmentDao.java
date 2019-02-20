package com.cg.jcat.api.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.entity.Answer;
import com.cg.jcat.api.entity.AnswerHistory;
import com.cg.jcat.api.entity.Application;
import com.cg.jcat.api.entity.AssessmentQuestion;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IAnswerHistoryRepository;
import com.cg.jcat.api.repository.IAnswerRepository;
import com.cg.jcat.api.repository.IApplicationRepository;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;

@Component
public class AssessmentDao {

	private static final Logger logger = LoggerFactory.getLogger(AssessmentDao.class);

	@Autowired
	IAnswerRepository answerRepository;

	@Autowired
	IAnswerHistoryRepository answerHistoryRepository;

	@Autowired
	IApplicationRepository applicationRepository;

	@Autowired
	IAssessmentQuestionRepository assessmentQuestionRepository;

	Date date = new Date();
	String option = "option";

	public List<AnswerModel> getAnswers(int applicationId) {

		List<AnswerModel> answerModelList = new ArrayList<>();
		List<AnswerModel> answerModelList2 = new ArrayList<>();

		HashSet<Integer> questionIdList = new HashSet<>();
		HashSet<Integer> answerIdList = new HashSet<>();
		List<AssessmentQuestion> assessmentQuestionList = new ArrayList<>();
		assessmentQuestionList = assessmentQuestionRepository.findAllByIsDeletedAndAssessmentTypeForCloudable(false,
				true);
		for (AssessmentQuestion assessmentQuestion : assessmentQuestionList) {
			questionIdList.add(assessmentQuestion.getQuestionId());
		}
		for (Answer answer : answerRepository.findByApplicationId(applicationId)) {
			answerIdList.add(answer.getQuestionId());
			answerModelList.add(toAnswer(answer));
		}
		questionIdList.removeAll(answerIdList);
		for (Integer questionId : questionIdList) {
			AnswerModel answerModel = new AnswerModel();
			answerModel.setQuestionId(questionId);
			answerModel.setOptionIds(option);
			answerModel.setApplicationId(applicationId);
			answerModel.setOptionTextsEN(option);
			answerModelList2.add(answerModel);
		}
		answerModelList.addAll(answerModelList2);
		return answerModelList;
	}

	public boolean saveAnswers(List<AnswerModel> answerModels, int applicationId) throws SystemExceptions {
		boolean saveResult = false;
		List<Answer> answerList = new ArrayList<>();
		List<Answer> answersByApplicationId = getAnswersByApplicationId(applicationId);

		HashSet<Integer> answerModelIdSet = new HashSet<>();
		HashSet<Integer> answerIdSet = new HashSet<>();
		HashSet<Integer> answerIdSetCopy = new HashSet<>();

		for (AnswerModel answerModel : answerModels) {
			answerModelIdSet.add(answerModel.getAnswerId());
		}

		for (Answer answer : answersByApplicationId) {
			answerIdSet.add(answer.getAnswerId());
		}

		answerIdSetCopy.addAll(answerIdSet);
		answerIdSet.removeAll(answerModelIdSet);
		answerIdSet.retainAll(answerIdSetCopy);

		if (!answerIdSet.isEmpty()) {
			for (int answerId : answerIdSet) {
				answerHistoryRepository.save(toGetAnswerHistory(answerRepository.findByAnswerId(answerId)));
				answerRepository.deleteById(answerId);
			}

		}

		try {
			for (AnswerModel answerModel : answerModels) {
				if (!answerModel.getOptionIds().equals(option)) {
					Answer answerPrevious = answerRepository.findByAnswerId(answerModel.getAnswerId());

					if (answerPrevious != null) {
						String[] optionIdArrayNew = answerModel.getOptionIds().split(",");
						String[] optionTextArrayNew = answerModel.getOptionTextsEN().split(",");
						String[] optionIdArrayPrevious = answerPrevious.getOptionIds().split(",");
						String[] optionTextArrayPrevious = answerPrevious.getOptionTextsEN().split(",");
						
					
						Arrays.sort(optionIdArrayNew);
						Arrays.sort(optionIdArrayPrevious);

						if (!answersByApplicationId.isEmpty() && !Arrays.equals(optionIdArrayNew, optionIdArrayPrevious)
								|| !Arrays.equals(optionTextArrayNew, optionTextArrayPrevious)) {
							
							answerHistoryRepository.save(
									toGetAnswerHistory(answerRepository.findByAnswerId(answerModel.getAnswerId())));
						}
					}

					answerList.add(toAnswer(answerModel));
				}
			}

		} catch (Exception e) {
			logger.error("Error in saving history: " + e.getMessage() + " ", e);
			throw new SystemExceptions("Error in saveAnswers():" + e.getMessage());
		}

		// updating history table if answers by application id is not present
		try {
			if (!answerList.isEmpty()) {
				saveResult = answerRepository.saveAll(answerList) != null;
			}
		} catch (Exception e) {
			logger.error("Error in saving answers saveAnswers(): " + e.getMessage() + " ", e);
			throw new SystemExceptions("Error in saveAnswers():" + e.getMessage());
		}

		return saveResult;
	}

	public List<Answer> getAnswersByApplicationId(int applicationId) {
		return answerRepository.findByApplicationId(applicationId);
	}

	public Application getApplicationByApplicationId(int applicationId) {
		return applicationRepository.findByAid(applicationId);
	}

	public List<AnswerHistory> getAnswerHistory() {
		return answerHistoryRepository.findAll();
	}

	public void setCloudableInAns(int id) {
		Answer answer = answerRepository.findByAnswerId(id);
		answer.setAnswerId(id);
		answer.setDtCloudableRuleResult(true);
		answerRepository.save(answer);
	}

	public void saveApp(Application application) {
		applicationRepository.save(application);
	}

	private AnswerHistory toGetAnswerHistory(Answer answerModel) {
		AnswerHistory answerHistory = new AnswerHistory();
		answerHistory.setAnswerId(answerModel.getAnswerId());
		answerHistory.setApplicationId(answerModel.getApplicationId());
		answerHistory.setDtCloudableRuleResult(answerModel.isDtCloudableRuleResult());
		answerHistory.setDtMigrationRuleResult(answerModel.isDtMigrationRuleResult());
		answerHistory.setDtProviderRuleResult(answerModel.isDtProviderRuleResult());
		answerHistory.setOptionIds(answerModel.getOptionIds());
		answerHistory.setOptionTextsEN(answerModel.getOptionTextsEN());
		answerHistory.setQuestionId(answerModel.getQuestionId());
		answerHistory.setQuestionTextEN(answerModel.getOptionTextsEN());
		return answerHistory;
	}

	private Answer toAnswer(AnswerModel answerModel) {

		Answer answer = new Answer();
		if (answerRepository.findByAnswerId(answerModel.getAnswerId()) != null) {
			answer = answerRepository.findByAnswerId(answerModel.getAnswerId());
		}
		answer.setAnswerId(answerModel.getAnswerId());
		answer.setApplicationId(answerModel.getApplicationId());
		answer.setDtCloudableRuleResult(answerModel.isDtCloudableRuleResult());
		answer.setDtMigrationRuleResult(answerModel.isDtMigrationRuleResult());
		answer.setDtProviderRuleResult(answerModel.isDtProviderRuleResult());
		answer.setModifiedBy("Admin");
		// answer.setModifiedTime(date);
		answer.setOptionIds(answerModel.getOptionIds());
		answer.setOptionTextsEN(answerModel.getOptionTextsEN());
		answer.setQuestionId(answerModel.getQuestionId());
		answer.setQuestionTextEN(answerModel.getQuestionTextEN());
		return answer;
	}

	private AnswerModel toAnswer(Answer answer) {
		AnswerModel answerModel = new AnswerModel();
		answerModel.setAnswerId(answer.getAnswerId());
		answerModel.setApplicationId(answer.getApplicationId());
		answerModel.setDtCloudableRuleResult(answer.isDtCloudableRuleResult());
		answerModel.setDtMigrationRuleResult(answer.isDtMigrationRuleResult());
		answerModel.setDtProviderRuleResult(answer.isDtProviderRuleResult());
		answerModel.setModifiedBy("Admin");
		answerModel.setOptionIds(answer.getOptionIds());
		answerModel.setOptionTextsEN(answer.getOptionTextsEN());
		answerModel.setQuestionId(answer.getQuestionId());
		answerModel.setQuestionTextEN(answer.getQuestionTextEN());
		return answerModel;
	}

	public void setCloudprovider(Application application, String cloudProviders) {
		Application applications = application;
		applications.setDtCloudProvider(cloudProviders);
		applicationRepository.save(applications);
	}

	public void setMigrationInAnswerInAns(int answerId) {
		Answer answer = answerRepository.findByAnswerId(answerId);
		answer.setAnswerId(answerId);
		answer.setDtMigrationRuleResult(true);
		answerRepository.save(answer);
	}

	public void setCloudProviderInAnswer(int answerId) {
		Answer answer = answerRepository.findByAnswerId(answerId);
		answer.setAnswerId(answerId);
		answer.setDtCloudableRuleResult(true);
		answerRepository.save(answer);
	}

	public List<AssessmentQuestionModel> getCloudableQuestions() {
		// TODO Auto-generated method stub
		return null;
	}

}
