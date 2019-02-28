package com.cg.jcat.api.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.cg.jcat.api.entity.AssessmentQuestion;
import com.cg.jcat.api.entity.DTMigrationRule;
import com.cg.jcat.api.entity.DTProviderRule;
import com.cg.jcat.api.entity.DTProviderRuleHistory;
import com.cg.jcat.api.entity.DTProviders;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;
import com.cg.jcat.api.repository.IDTProviderRepository;
import com.cg.jcat.api.repository.IDTProviderRuleHistory;
import com.cg.jcat.api.repository.IDTProviderRuleRepository;

@Component
public class DTProviderRuleDao {

	private static final Logger logger = LoggerFactory.getLogger(UserDao.class);

	@Autowired
	private IDTProviderRuleRepository cloudProviderRuleRepository;

	@Autowired
	private IDTProviderRepository cloudProviderRepository;

	@Autowired
	private IDTProviderRuleHistory providerRuleHistory;

	@Autowired
	private IAssessmentQuestionRepository assessmentQuestionRepository;
	
	@Autowired
	private AssessmentQuestionDao assessmentQuestionDao;

	/*
	 * GET ALL PROVIDERS PRESENT IN DATABASE
	 * 
	 */

	public List<DTProvidersModel> getCloudProvider() {
		List<DTProviders> CloudProviderList = cloudProviderRepository.findAll();
		List<DTProvidersModel> CloudProvidersModelList = new ArrayList<>();
		return toCloudProviderModelList(CloudProviderList, CloudProvidersModelList);
	}

	/*
	 * CONVERTING ALL PROVIDERS LIST TO PROVIDERMODEL LIST AND ADD PROVIDERMODE TO
	 * PROVIDERMODELIST
	 * 
	 */
	private List<DTProvidersModel> toCloudProviderModelList(List<DTProviders> cloudProviderList,
			List<DTProvidersModel> cloudProvidersModelList) {
		for (DTProviders cloudProviders : cloudProviderList) {
			cloudProvidersModelList.add(toCloudProviderMode(cloudProviders));
		}
		return cloudProvidersModelList;
	}

	/*
	 * CONVERTING ALL PROVIDERS TO PROVIDERMODEL
	 * 
	 */

	private DTProvidersModel toCloudProviderMode(DTProviders cloudProviders) {
		DTProvidersModel cloudProvidersModel = new DTProvidersModel();
		cloudProvidersModel.setProviderId(cloudProviders.getProviderId());
		cloudProvidersModel.setEvaluationOrder(cloudProviders.getEvaluationOrder());
		cloudProvidersModel.setProviderName(cloudProviders.getProviderName());
		cloudProvidersModel.setLogicalOperator(cloudProviders.getLogicalOperator());
		return cloudProvidersModel;
	}

	/*
	 * GET ALL PROVIDERS RULES BASED ON THE ID PRESENT IN DATABASE IN CASE NO ID IS
	 * PRESENT ALL RULES WILL BE SEND
	 * 
	 */

	public List<DTProviderRuleModel> getCloudProviderRules(int providerId) {
		List<DTProviderRule> cloudProviderRuleList = new ArrayList<>();
		if (providerId == 0) {
			cloudProviderRuleList = cloudProviderRuleRepository.findAll();
		} else {

			cloudProviderRuleList = cloudProviderRuleRepository
					.findByDtProviders(cloudProviderRepository.findById(providerId));

		}
		List<DTProviderRuleModel> cloudProviderRuleModelList = new ArrayList<>();
		return toCloudProviderRuleModelList(cloudProviderRuleList, cloudProviderRuleModelList);
	}

	/*
	 * CONVERTING ALL PROVIDERMODEL LIST TO PROVIDERS LIST AND ADD PROVIDER TO
	 * PROVIDERLIST
	 * 
	 */

	private List<DTProviderRuleModel> toCloudProviderRuleModelList(List<DTProviderRule> cloudProviderRuleList,
			List<DTProviderRuleModel> cloudProviderRuleModelList) {
		for (DTProviderRule cloudProviderRule : cloudProviderRuleList) {
			cloudProviderRuleModelList.add(toCloudProviderRuleModel(cloudProviderRule));
		}
		return cloudProviderRuleModelList;
	}

	/*
	 * CONVERTING ALL PROVIDERMODEL TO PROVIDERS
	 * 
	 */

	private DTProviderRuleModel toCloudProviderRuleModel(DTProviderRule cloudProviderRule) {
		DTProviderRuleModel cloudProviderRuleModel = new DTProviderRuleModel();
		cloudProviderRuleModel.setProviderId(cloudProviderRule.getDtProviders().getProviderId());
		cloudProviderRuleModel.setProviderRuleId(cloudProviderRule.getProviderRuleId());
		cloudProviderRuleModel.setQuestionId(cloudProviderRule.getAssessmentQuestion().getQuestionId());
		cloudProviderRuleModel.setEvaluationOrder(cloudProviderRule.getExecutionOrder());
		cloudProviderRuleModel.setQuestiontextEN(cloudProviderRule.getQuestiontextEN());
		cloudProviderRuleModel.setRuleOptionIds(cloudProviderRule.getRuleOptionIds());
		cloudProviderRuleModel.setRuleOptionTextEN(cloudProviderRule.getRuleOptionTextEN());
		cloudProviderRuleModel.setCreatedBy(cloudProviderRule.getCreatedBy());
		cloudProviderRuleModel.setModifiedBy(cloudProviderRule.getModifiedBy());
		return cloudProviderRuleModel;
	}

	/*
	 * SAVE PROVIDERS TO THE DATABASE WHICH ACCEPTS LIST OF PROVIDERMODEL AND CHECK
	 * IF PREVIOUSLY ANY RULE IS PRESENT IN THE RULE TABLE AND IF NOT PRESENT IT
	 * WILL SAVE THE LIST TO THE DATA BASE AND IF ALREADY SOME ARE PRESENT THEN 1ST
	 * MOVE THEM TO THE HISTORY TABLE THEN SAVE THE RULES TO THE DATABASE
	 * 
	 */
	@Transactional
	public boolean saveProviderRule(List<DTProviderRuleModel> cloudProviderRuleModel) throws SystemExceptions {
		boolean savedValue = false;
		
		int id = 0;
		
		for(DTProviderRuleModel dtproviderRuleModel:cloudProviderRuleModel)
		{
			id=dtproviderRuleModel.getProviderId();
		}
//	    List<DTProviderRule> deletedRules= cloudProviderRuleRepository.deleteAllByDtProviders(cloudProviderRepository.findByProviderId(id));
		
		
		try {
			List<DTProviderRule> cloudProviderRuleList = getProviderRules();
			System.out.println("********"+cloudProviderRuleRepository.findAll());
			System.out.println("getCountOfProviderRule()"+cloudProviderRuleRepository.findAll().size());
			if (getCountOfProviderRule() != 0) {
				List<DTProviderRule> deletedRules = cloudProviderRuleRepository.deleteAllByDtProviders(cloudProviderRepository.findByProviderId(id));
			    System.out.println(deletedRules);
			    try {
				saveProviderRuleHistory(deletedRules);
			    }catch (Exception e) {
			    	logger.error("Error in saveProviderRuleHistory(): " + e.getMessage() + " ", e);
					throw new SystemExceptions("Error in saveProviderRuleHistory():" + e.getMessage());
				}
			}
//			cloudProviderRuleRepository.deleteAll();
			savedValue = saveDTCloudProviderRule(cloudProviderRuleModel);

		} catch (Exception e) {
			logger.error("Error in saveProviderRule(): " + e.getMessage() + " ", e);
			throw new SystemExceptions("Error in saveProviderRule():" + e.getMessage());
		}

		return savedValue;
	}

	/*
	 * GET ALL PROVIDERS PRESENT IN BATABSE IN PROVIDER RULE TABLE
	 * 
	 */

	private List<DTProviderRule> getProviderRules() {

		return cloudProviderRuleRepository.findAll();
	}

	/*
	 * GET HOW MANY PROVIDERS ARE PRESENT IN BATABSE IN PROVIDER RULE TABLE
	 * 
	 */

	public int getCountOfProviderRule() {

		return cloudProviderRuleRepository.findAll().size();
	}

	/*
	 * MOVE ALL THE PROVIDERS PRESENT IN THE PROVIDERS HISTORY TABLE ADD EACH
	 * PROVIDERS TO PROVIDERS HISTORY TABLE AND THEN ADD TO THE PROVIDER HISTORY
	 * 
	 */

	private void saveProviderRuleHistory(List<DTProviderRule> cloudProviderRule) {
		List<DTProviderRuleHistory> providerRuleHistoryList = new ArrayList<>();
		for (DTProviderRule providerRule : cloudProviderRule) {
			providerRuleHistoryList.add(toProviderHistory(providerRule));
		}
		System.out.println("*********HHH*");
		System.out.println(providerRuleHistoryList);
		providerRuleHistory.saveAll(providerRuleHistoryList);
	}

	private DTProviderRuleHistory toProviderHistory(DTProviderRule providerRule) {
		Date date = new Date();
		DTProviderRuleHistory providerRuleHistory = new DTProviderRuleHistory();
		providerRuleHistory.setDtProviders(providerRule.getDtProviders());
		providerRuleHistory.setProviderRuleId(providerRule.getProviderRuleId());
		providerRuleHistory.setExecutionOrder(providerRule.getExecutionOrder());
		providerRuleHistory.setAssessmentQuestion(providerRule.getAssessmentQuestion());
		providerRuleHistory.setQuestionTextEN(providerRule.getRuleOptionIds());
		providerRuleHistory.setRuleOptionIds(providerRule.getRuleOptionTextEN());
		providerRuleHistory.setRuleOptionTextEN(providerRule.getRuleOptionTextEN());
		providerRuleHistory.setCreatedBy(providerRule.getCreatedBy());
		providerRuleHistory.setCreatedTime(date);
		return providerRuleHistory;
	}

	public boolean saveDTCloudProviderRule(List<DTProviderRuleModel> cloudProviderRuleModel) {
		boolean saveResult = false;
		List<DTProviderRule> cloudProviderRule = new ArrayList<>();
		List<DTProviderRule> cloudProvidersaved = cloudProviderRuleRepository
				.saveAll(toCloudProviderRuleList(cloudProviderRuleModel, cloudProviderRule));
		if (cloudProvidersaved != null) {
			saveResult = true;
		}
		return saveResult;
	}

	private List<DTProviderRule> toCloudProviderRuleList(List<DTProviderRuleModel> cloudProviderRuleModel,
			List<DTProviderRule> cloudProviderRule) {
		for (DTProviderRuleModel providerRuleModel : cloudProviderRuleModel) {
			DTProviderRule providerRule = new DTProviderRule();
			cloudProviderRule.add(toCloudProviderRule(providerRuleModel, providerRule));
		}

		return cloudProviderRule;
	}

	private DTProviderRule toCloudProviderRule(DTProviderRuleModel cloudProviderRuleModel,
			DTProviderRule cloudProviderRule) {

		Date date = new Date();
		Optional<DTProviders> dtProvidersOptional = cloudProviderRepository
				.findById(cloudProviderRuleModel.getProviderId());
		DTProviders dtProviders = dtProvidersOptional.get();

		Optional<AssessmentQuestion> assessmentQuestionOptional = assessmentQuestionRepository
				.findById(cloudProviderRuleModel.getQuestionId());
		AssessmentQuestion assessmentQuestion = assessmentQuestionOptional.get();

		if(cloudProviderRuleRepository.findByProviderRuleId(cloudProviderRuleModel.getProviderRuleId()) != null)
		{
			cloudProviderRule=cloudProviderRuleRepository.findByProviderRuleId(cloudProviderRuleModel.getProviderRuleId());
		}
		cloudProviderRule.setDtProviders(dtProviders);
		cloudProviderRule.setExecutionOrder(cloudProviderRuleModel.getEvaluationOrder());
		cloudProviderRule.setAssessmentQuestion(assessmentQuestion);
		cloudProviderRule.setQuestiontextEN(cloudProviderRuleModel.getQuestiontextEN());
		cloudProviderRule.setRuleOptionIds(cloudProviderRuleModel.getRuleOptionIds());
		cloudProviderRule.setRuleOptionTextEN(cloudProviderRuleModel.getRuleOptionTextEN());
		cloudProviderRule.setCreatedBy(cloudProviderRuleModel.getCreatedBy());
		cloudProviderRule.setModifiedBy(cloudProviderRuleModel.getModifiedBy());
		return cloudProviderRule;
	}

	public List<AssessmentQuestionModel> getProviderQuestions() {
		return assessmentQuestionDao.getQuestionsByProvider();
	}

}
