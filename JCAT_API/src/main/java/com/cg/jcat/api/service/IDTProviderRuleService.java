package com.cg.jcat.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTProviderRuleModel;
import com.cg.jcat.api.dao.DTProvidersModel;
import com.cg.jcat.api.entity.DTProviderRule;
import com.cg.jcat.api.entity.DTProviderRuleHistory;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;

@Service
public interface IDTProviderRuleService {

	List<DTProvidersModel> getCloudProvider();

	boolean saveCloudProviderRule(List<DTProviderRuleModel> cloudProviderRuleModelList)
			throws SystemExceptions, OptionTextNotNullException, CountMissMatchException;

	List<DTProviderRuleModel> getCloudProviderRules(int providerId);

	List<AssessmentQuestionModel> getProviderQuestions();

}
