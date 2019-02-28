package com.cg.jcat.api.service;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.cg.jcat.api.dao.AssessmentDao;
import com.cg.jcat.api.dao.DTCloudableRuleDao;
import com.cg.jcat.api.dao.DTCloudableRuleModel;
import com.cg.jcat.api.dao.DTMigrationModel;
import com.cg.jcat.api.dao.DTMigrationRuleDao;
import com.cg.jcat.api.dao.DTMigrationRuleModel;
import com.cg.jcat.api.dao.DTProviderRuleDao;
import com.cg.jcat.api.dao.DTProviderRuleModel;
import com.cg.jcat.api.dao.DTProvidersModel;
import com.cg.jcat.api.entity.Answer;
import com.cg.jcat.api.entity.Application;
import com.cg.jcat.api.exception.ApplicationIdNotFoundException;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.dao.AnswerModel;

@Component
public class AssessmentService implements IAssessmentService {

	private static final Logger logger = LoggerFactory.getLogger(AssessmentDao.class);

	@Autowired
	AssessmentDao assessmentDao;

	@Autowired
	DTCloudableRuleDao dtCloudableRuleDao;

	@Autowired
	DTMigrationRuleDao dtMigrationRuleDao;

	@Autowired
	DTProviderRuleDao dtProviderRuleDao;

	Date date = new Date();

	@Override
	public List<AnswerModel> getAnswers(int applicationId,int assessmentStage) {
		return assessmentDao.getAnswers(applicationId,assessmentStage);
	}

	@Override
	public boolean saveAnswers(List<AnswerModel> answerModels, int applicationId)
			throws SystemExceptions, OptionTextNotNullException, CountMissMatchException {
		boolean afterSavedValue = false;
		StringBuilder strBuff = new StringBuilder();
		for (AnswerModel answerModel : answerModels) {
			if (StringUtils.isEmpty(answerModel.getOptionTextsEN())) {
				strBuff.append("Option text for question " + answerModel.getQuestionId() + " is empty!\n");
				throw new OptionTextNotNullException(strBuff.toString());
			} else {
				String optionText[] = answerModel.getOptionTextsEN().split(",");
				String optionIds[] = answerModel.getOptionIds().split(",");
				if (optionText.length != optionIds.length) {
					strBuff.append("Number of options for question " + answerModel.getQuestionId()
							+ " does not macthes with number of option text!\n");
				}
			}
		}
		if (strBuff.length() == 0) {

			afterSavedValue = assessmentDao.saveAnswers(answerModels, applicationId);
		} else {
			logger.error(
					"Error option text number of option text and option ids should be same :: " + strBuff.toString());
			throw new CountMissMatchException(strBuff.toString());
		}
		return afterSavedValue;
	}

	@Override
	public void finalized(List<AnswerModel> answerModels, int applicationId, int stage) throws SystemExceptions,
			OptionTextNotNullException, ApplicationIdNotFoundException, CountMissMatchException {

		Application application = assessmentDao.getApplicationByApplicationId(applicationId);
		if (application != null) {
			saveAnswers(answerModels, applicationId);

			switch (stage) {
			case 1:
				stage1(application,stage);
				break;

			case 2:
				stage2(application,stage);
				break;

			default:
				logger.error("Error stage does not exist in finalized()! with given stage " + stage);
			}
		} else {
			logger.error("Error Application does not exist ! with given id " + applicationId);
			throw new ApplicationIdNotFoundException(Integer.toString(applicationId));
		}

	}

	private void stage1(Application application,int stage) {
		System.out.println(application);
		application.setIsAssessmentStage(stage);
		assessmentDao.saveApp(application);
		cloudableCheck(application);
	}

	private void stage2(Application application,int stage) {
		migrationCheck(application);
		cloudProviderCheck(application);
		application.setIsAssessmentStage(stage);
		application.setAssessmentCompleted(true);
		application.setAssessmentCompletionTime(date);
		assessmentDao.saveApp(application);
	}

	public boolean cloudableCheck(Application application) {
		int cloudableRuleFlag = 0;

		List<DTCloudableRuleModel> cloudableRuleList = dtCloudableRuleDao.getCloudableRule();
		List<Answer> answersList = assessmentDao.getAnswersByApplicationId(application.getAid());

		for (DTCloudableRuleModel cloudableRule : cloudableRuleList) {
			System.out.println("---------------------------------------------------------------");
			String[] cloudableRuleArray = cloudableRule.getOptionIds().split(",");
			for (Answer answers : answersList) {
				String[] answerOptionIdsArray = answers.getOptionIds().split(",");
//				if (cloudableRule.getQuestionId() == (answers.getQuestionId()) //For previous version of jcat
//						&& Arrays.equals(cloudableRuleArray, answerOptionIdsArray)) {
//					System.out.println("*****");
//					assessmentDao.setCloudableInAns(answers.getAnswerId());
//					cloudableRuleFlag++;
//				}
				if (cloudableRule.getQuestionId() == (answers.getQuestionId())
						&& Arrays.asList(cloudableRuleArray).containsAll(Arrays.asList(answerOptionIdsArray))) {
					assessmentDao.setCloudableInAns(answers.getAnswerId());
					cloudableRuleFlag++;
				}
			}
		}
		if (cloudableRuleFlag == cloudableRuleList.size()) {
			application.setDTCloudable(true);
			assessmentDao.saveApp(application);
			return true;
		} else {
			application.setDTCloudable(false);
			assessmentDao.saveApp(application);
			return false;
		}

	}

	public void migrationCheck(Application application) {
		List<Answer> allanswers = assessmentDao.getAnswersByApplicationId(application.getAid());
		for (DTMigrationModel migrationDAO : dtMigrationRuleDao.getMigrationPattern()) {
			int count = 0;
			HashSet numberOfRules = new HashSet();
			for (DTMigrationRuleModel migrationRuleDAO : dtMigrationRuleDao
					.getMigrationRule(migrationDAO.getMigrationId())) {
				for (Answer answers : allanswers) {
					if (answers.getQuestionId() == migrationRuleDAO.getQuestionId()) {

						numberOfRules.add(migrationRuleDAO.getQuestionId());
						String[] migrationRuleIdsArray = migrationRuleDAO.getRuleOptionIds().split(",");
						String[] answerOptionIdsArray = answers.getOptionIds().split(",");
						
//						if (Arrays.equals(migrationRuleIdsArray, answerOptionIdsArray)) {
//							assessmentDao.setMigrationInAnswerInAns(answers.getAnswerId());
//							count++;
//						}
						if (Arrays.asList(migrationRuleIdsArray).containsAll(Arrays.asList(answerOptionIdsArray))) {
							assessmentDao.setMigrationInAnswerInAns(answers.getAnswerId());
							count++;
						}
					}
				}
			}
			if (migrationDAO.getLogicalOperator().equalsIgnoreCase("AND") && (count == numberOfRules.size())) {
				application.setIsAssessmentStage(2);
				application.setDtMigrationPattern(migrationDAO.getMigrationPattern());
				assessmentDao.saveApp(application);
				break;
			}
			if (migrationDAO.getLogicalOperator().equalsIgnoreCase("OR") && count >= 1) {
				application.setDtMigrationPattern(migrationDAO.getMigrationPattern());
				assessmentDao.saveApp(application);
				break;
			}
			if (migrationDAO.getLogicalOperator().equalsIgnoreCase("Others")) {
				application.setDtMigrationPattern(migrationDAO.getMigrationPattern());
				assessmentDao.saveApp(application);
				break;
			}

		}
	}

	public void cloudProviderCheck(Application application) {

		List<Answer> allanswers = assessmentDao.getAnswersByApplicationId(application.getAid());

		for (DTProvidersModel cloudProvider : dtProviderRuleDao.getCloudProvider()) {
			int count = 0, numberOfRules = 0;
			for (DTProviderRuleModel cloudProviderRuleDAO : dtProviderRuleDao
					.getCloudProviderRules(cloudProvider.getProviderId())) {
				for (Answer answers : allanswers) {
					if (answers.getQuestionId() == cloudProviderRuleDAO.getQuestionId()) {
						String[] cloudProviderRuleArray = cloudProviderRuleDAO.getRuleOptionIds().split(",");
						String[] answerOptionIdsArray = answers.getOptionIds().split(",");
						numberOfRules++;
						
						/*if (Arrays.equals(cloudProviderRuleArray, answerOptionIdsArray)) {
							//assessmentDao.setCloudProviderInAnswer(answers.getAnswerId());
							count++;
						}*/
						if (Arrays.asList(cloudProviderRuleArray).containsAll(Arrays.asList(answerOptionIdsArray))) {
							assessmentDao.setCloudProviderInAnswer(answers.getAnswerId());
							count++;
						}
					}
				}
			}
			if ("OR".equalsIgnoreCase(cloudProvider.getLogicalOperator()) && count > 0) {
				assessmentDao.setCloudprovider(application, cloudProvider.getProviderName());
				break;
			}
			if (numberOfRules == count) {
				assessmentDao.setCloudprovider(application, cloudProvider.getProviderName());
				break;
			}
		}

	}

}
