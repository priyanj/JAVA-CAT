package com.cg.jcat.api.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.entity.AssessmentQuestion;
import com.cg.jcat.api.entity.DTCloudableRule;
import com.cg.jcat.api.entity.DTCloudableRuleHistory;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;
import com.cg.jcat.api.repository.IDTCloudableRuleHistoryRepository;
import com.cg.jcat.api.repository.IDTCloudableRuleRepository;

@Component
public class DTCloudableRuleDao {
	private static final Logger logger = LoggerFactory.getLogger(DTCloudableRuleDao.class);
	@Autowired
	IDTCloudableRuleRepository dtCloudableRuleRepository;
	@Autowired
	IDTCloudableRuleHistoryRepository dtcloudableRuleHistoryRepository;
	@Autowired
	IAssessmentQuestionRepository assessmentQuestionRepository;

	public List<DTCloudableRuleModel> getCloudableRule() {
		List<DTCloudableRule> dtCloudableRuleList = new ArrayList<DTCloudableRule>();
		dtCloudableRuleList = dtCloudableRuleRepository.findAll();
		List<DTCloudableRuleModel> DTCloudableRuleModelList = new ArrayList<DTCloudableRuleModel>();
		return getCloudableModelRule(dtCloudableRuleList, DTCloudableRuleModelList);
	}

	private List<DTCloudableRuleModel> getCloudableModelRule(List<DTCloudableRule> dtCloudableRuleList,
			List<DTCloudableRuleModel> dtCloudableRuleModelList) {
		for (DTCloudableRule dTCloudableRule : dtCloudableRuleList) {
			dtCloudableRuleModelList.add(toDTCloudableRuleModel(dTCloudableRule));
		}
		return dtCloudableRuleModelList;
	}

	private DTCloudableRuleModel toDTCloudableRuleModel(DTCloudableRule dtCloudableRule) {
		DTCloudableRuleModel dtCloudableRuleModel = new DTCloudableRuleModel();
		dtCloudableRuleModel.setCloudableRuleId(dtCloudableRule.getCloudableRuleId());
		dtCloudableRuleModel.setOptionIds(dtCloudableRule.getOptionIds());
		dtCloudableRuleModel.setExecutionOrder(dtCloudableRule.getExecutionOrder());
		dtCloudableRuleModel.setOptionTextsEN(dtCloudableRule.getOptionTextsEN());
		dtCloudableRuleModel.setQuestionTextEN(dtCloudableRule.getQuestionTextEN());
		dtCloudableRuleModel.setQuestionId(dtCloudableRule.getAssessmentQuestion().getQuestionId());
		return dtCloudableRuleModel;
	}

	private DTCloudableRule toCloudablerule(DTCloudableRuleModel dtCloudableRuleModel) {
		Optional<AssessmentQuestion> assessmentQuestionOptional = assessmentQuestionRepository
				.findById(dtCloudableRuleModel.getQuestionId());
		AssessmentQuestion assessmentQuestion = assessmentQuestionOptional.get();
		DTCloudableRule dtCloudableRule = new DTCloudableRule();
		if(dtCloudableRuleRepository.findByCloudableRuleId(dtCloudableRuleModel.getCloudableRuleId()) != null)
		{
			dtCloudableRule=dtCloudableRuleRepository.findByCloudableRuleId(dtCloudableRuleModel.getCloudableRuleId());
		}
		
		dtCloudableRule.setCloudableRuleId(dtCloudableRuleModel.getCloudableRuleId());
		dtCloudableRule.setOptionIds(dtCloudableRuleModel.getOptionIds());
		dtCloudableRule.setOptionTextsEN(dtCloudableRuleModel.getOptionTextsEN());
		dtCloudableRule.setAssessmentQuestion(assessmentQuestion);
		dtCloudableRule.setQuestionTextEN(dtCloudableRuleModel.getQuestionTextEN());
		dtCloudableRule.setExecutionOrder(dtCloudableRuleModel.getExecutionOrder());
		dtCloudableRule.setCreatedBy("user1");
		return dtCloudableRule;
	}

	private DTCloudableRule findByCloudableRuleId(int cloudableRuleId) {
		return dtCloudableRuleRepository.findByCloudableRuleId(cloudableRuleId);
	}

	public DTCloudableRuleModel getCloudableRuleById(int cloudableRuleId) {
		return getCloudableRuleModelbyId(cloudableRuleId);
	}

	private DTCloudableRuleModel getCloudableRuleModelbyId(int cloudableRuleId) {

		return toDTCloudableRuleModel(findByCloudableRuleId(cloudableRuleId));
	}

	public boolean saveCloudableRule(List<DTCloudableRuleModel> dtCloudableRuleModelList) throws SystemExceptions {
		boolean saveRule = false;
		try {
			saveRule = toSaveCloudablerule(dtCloudableRuleModelList);
		} catch (Exception e) {
			logger.error("Error in saveCloudableRule(): " + e.getMessage() + " ", e);
			throw new SystemExceptions("Error in saveCloudableRule():" + e.getMessage());
		}
		return saveRule;
	}

	private boolean toSaveCloudablerule(List<DTCloudableRuleModel> dtCloudableRuleModelList) {
		int cloudabeRuleLength = 0;
		cloudabeRuleLength = dtCloudableRuleRepository.findAll().size();
		if (cloudabeRuleLength != 0) {
			saveCloudableRuleHistory();
			dtCloudableRuleRepository.deleteAll();
			return saveCloudableRuleList(dtCloudableRuleModelList);
		} else {
			return saveCloudableRuleList(dtCloudableRuleModelList);
		}

	}

	private boolean saveCloudableRuleList(List<DTCloudableRuleModel> dtCloudableRuleModelList) {
		List<DTCloudableRule> dtCloudableRuleList = new ArrayList<DTCloudableRule>();
		for (DTCloudableRuleModel cloudableRuleModel : dtCloudableRuleModelList) {
			dtCloudableRuleList.add(toCloudablerule(cloudableRuleModel));
		}
		dtCloudableRuleRepository.saveAll(dtCloudableRuleList);
		return true;
	}

	private void saveCloudableRuleHistory() {
		List<DTCloudableRule> dtCloudableRuleList = new ArrayList<DTCloudableRule>();
		List<DTCloudableRuleHistory> dtCloudableRuleHistoryList = new ArrayList<DTCloudableRuleHistory>();
		dtCloudableRuleList = dtCloudableRuleRepository.findAll();
		for (DTCloudableRule cloudableRule : dtCloudableRuleList) {
			dtCloudableRuleHistoryList.add(toCloudableRuleHistory(cloudableRule));
		}
		dtcloudableRuleHistoryRepository.saveAll(dtCloudableRuleHistoryList);
	}

	private DTCloudableRuleHistory toCloudableRuleHistory(DTCloudableRule cloudableRule) {
		Date date = new Date();
		DTCloudableRuleHistory dtCloudableRuleHistory = new DTCloudableRuleHistory();

		dtCloudableRuleHistory.setCloudableRuleId(cloudableRule.getCloudableRuleId());
		dtCloudableRuleHistory.setAssessmentQuestion(cloudableRule.getAssessmentQuestion());
		dtCloudableRuleHistory.setQuestiontTextEN(cloudableRule.getQuestionTextEN());
		dtCloudableRuleHistory.setRuleOptionIds(cloudableRule.getOptionIds());
		dtCloudableRuleHistory.setRuleOptionTextEN(cloudableRule.getOptionTextsEN());
		dtCloudableRuleHistory.setExecutionOrder(cloudableRule.getExecutionOrder());
		dtCloudableRuleHistory.setCreatedBy("Admin");
		dtCloudableRuleHistory.setCreatedTime(new Date());
		return dtCloudableRuleHistory;
	}

}
