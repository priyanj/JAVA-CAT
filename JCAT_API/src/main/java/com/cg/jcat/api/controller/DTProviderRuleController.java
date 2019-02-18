package com.cg.jcat.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.JcatApiApplication;
import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTProviderRuleModel;
import com.cg.jcat.api.dao.DTProvidersModel;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.service.IDTProviderRuleService;

@Component
public class DTProviderRuleController implements IDTProviderRuleController {

	private static final Logger logger = LoggerFactory.getLogger(JcatApiApplication.class);

	@Autowired
	private IDTProviderRuleService dtCloudProviderService;

	@Override
	public List<DTProvidersModel> getCloudProvider() throws SystemExceptions {
		try {
			return dtCloudProviderService.getCloudProvider();
		} catch (Exception e) {
			logger.error("Error in getting all cloud providers : getCloudProvider()", e);
			throw new SystemExceptions("getCloudProvider()");
		}
	}

	@Override
	public boolean saveCloudProviderRule(List<DTProviderRuleModel> cloudProviderRuleModelList)
			throws SystemExceptions, OptionTextNotNullException, CountMissMatchException {
		System.out.println(cloudProviderRuleModelList);
		return dtCloudProviderService.saveCloudProviderRule(cloudProviderRuleModelList);
	}

	@Override
	public List<DTProviderRuleModel> getCloudProviderRules(int providerId) {

		return dtCloudProviderService.getCloudProviderRules(providerId);
	}

	@Override
	public List<AssessmentQuestionModel> getProviderQuestions() throws SystemExceptions {
		return dtCloudProviderService.getProviderQuestions();
	}

}
