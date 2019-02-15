package com.cg.jcat.api.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTProviderRuleDao;
import com.cg.jcat.api.dao.DTProviderRuleModel;
import com.cg.jcat.api.dao.DTProvidersModel;
import com.cg.jcat.api.dao.UserDao;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;

@Component
public class DTProviderRuleService implements IDTProviderRuleService {

	private static final Logger logger = LoggerFactory.getLogger(UserDao.class);

	@Autowired
	private DTProviderRuleDao dtCloudProviderDao;

	@Override
	public List<DTProvidersModel> getCloudProvider() {
		List<DTProvidersModel> providersModel = dtCloudProviderDao.getCloudProvider();
		logger.info("Retriving all providers from DB!, number of providers " + providersModel.size());
		return providersModel;
	}

	@Override
	public boolean saveCloudProviderRule(List<DTProviderRuleModel> cloudProviderRuleModelList)
			throws SystemExceptions, OptionTextNotNullException, CountMissMatchException {
		boolean afterSavedValue = false;

		StringBuilder strBuff = new StringBuilder();
		for (DTProviderRuleModel cloudProviderRuleModel : cloudProviderRuleModelList) {
			if (StringUtils.isEmpty(cloudProviderRuleModel.getRuleOptionTextEN())) {
				strBuff.append("Option text for question " + cloudProviderRuleModel.getQuestionId() + " is empty!\n");
				logger.error("Option text can't be null :", strBuff.toString());
				throw new OptionTextNotNullException(strBuff.toString());
			} else {
				String optionText[] = cloudProviderRuleModel.getRuleOptionTextEN().split(",");
				String optionIds[] = cloudProviderRuleModel.getRuleOptionIds().split(",");
				if (optionText.length != optionIds.length) {
					strBuff.append("Number of options for question " + cloudProviderRuleModel.getQuestionId()
							+ " does not macthes with number of option text!\n");
				}
			}
		}
		if (strBuff.length() == 0) {

			afterSavedValue = dtCloudProviderDao.saveProviderRule(cloudProviderRuleModelList);
		} else {
			logger.error(
					"Error option text number of option text and option ids should be same :: " + strBuff.toString());
			throw new CountMissMatchException(strBuff.toString());
		}

		return afterSavedValue;
	}

	@Override
	//
	public List<DTProviderRuleModel> getCloudProviderRules(int providerId) {
		List<DTProviderRuleModel> DTProviderRuleModel = dtCloudProviderDao.getCloudProviderRules(providerId);
		logger.info("Retriving all providers from DB! based on id, number of providers " + DTProviderRuleModel.size());
		return DTProviderRuleModel;
	}

	@Override
	public List<AssessmentQuestionModel> getProviderQuestions() {
		// TODO Auto-generated method stub
		return dtCloudProviderDao.getProviderQuestions();
	}

}
