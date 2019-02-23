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
	boolean isDeleted=false, assessmentTypeForCloudable=true, assessmentTypeForCloudProvider=true, assessmentTypeForMigration=true;

	public List<AnswerModel> getAnswers(int applicationId,int assessmentStage) {

		List<AnswerModel> answerModelList = new ArrayList<>();
		List<AnswerModel> answerModelList2 = new ArrayList<>();

		HashSet<Integer> questionIdList = new HashSet<>();
		HashSet<Integer> answerIdList = new HashSet<>();
		List<AssessmentQuestion> assessmentQuestionList = new ArrayList<>();
		if(assessmentStage==0)
		{
			assessmentQuestionList = assessmentQuestionRepository.findAllByIsDeletedAndAssessmentTypeForCloudable(isDeleted,
					assessmentTypeForCloudable);
		}
		else
		{
			assessmentQuestionList = assessmentQuestionRepository.findAllByIsDeletedAndAssessmentTypeForCloudProviderOrAssessmentTypeForMigrationAndAssessmentTypeForCloudable(isDeleted,
					assessmentTypeForCloudProvider,assessmentTypeForMigration,!assessmentTypeForCloudable);
		}
		
		for (AssessmentQuestion assessmentQuestion : assessmentQuestionList) {
			questionIdList.add(assessmentQuestion.getQuestionId());
		}
		for (Answer answer : answerRepository.findByApplicationId(applicationId)) {
			answerIdList.add(answer.getQuestionId()); //1,2,3,4
			for(Integer questionId:questionIdList)
			{
				if(answer.getQuestionId()==questionId)
				{
					answerModelList.add(toAnswer(answer));
				}
			}
		}
		questionIdList.removeAll(answerIdList); //1,2,3,4,5,6,7 - (1,2,3,4) = 5,6,7
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
		List<Answer> answersByApplicationId = getAnswersByApplicationId(applicationId); //get previous answer eg 1,2,3,4
		
		
		try {
			
			for(AnswerModel answerModel:answerModels)
			{
				Answer answer=new Answer();
				answer = answerRepository.findByAnswerId(answerModel.getAnswerId());
				if(answer!=null && (!answer.getOptionIds().equals(answerModel.getOptionIds()))
						&& (answer.getQuestionId()==answerModel.getQuestionId())&&((!answer.getOptionTextsEN().equals(answerModel.getOptionTextsEN()))))
				{
					answerHistoryRepository.save(toGetAnswerHistory(answer));
					//answerRepository.deleteById(answer.getAnswerId());
				}
				answerList.add(toAnswer(answerModel));
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
