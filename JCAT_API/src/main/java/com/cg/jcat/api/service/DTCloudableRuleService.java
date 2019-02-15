package com.cg.jcat.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.dao.AssessmentQuestionDao;
import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTCloudableRuleDao;
import com.cg.jcat.api.dao.DTCloudableRuleModel;
import com.cg.jcat.api.exception.SystemExceptions;

@Component
public class DTCloudableRuleService implements IDTCloudableRuleService {

	@Autowired
	DTCloudableRuleDao dTCloudableRuleDAO;
	
	@Autowired
	AssessmentQuestionDao assessmentQuestionDao;

	@Override
	public List<DTCloudableRuleModel> getCloudableRule() {

		return dTCloudableRuleDAO.getCloudableRule();
	}

	@Override
	public DTCloudableRuleModel getCloudableRuleById(int cloudableRuleId) {
		return dTCloudableRuleDAO.getCloudableRuleById(cloudableRuleId);
	}

	@Override
	public boolean saveCloudableRule(List<DTCloudableRuleModel> dTCloudableRuleModelList) throws SystemExceptions {
		return dTCloudableRuleDAO.saveCloudableRule(dTCloudableRuleModelList);
	}
	
	@Override
	public List<AssessmentQuestionModel> getCloudableQuestions() {
		
		return assessmentQuestionDao.getCloudableQuestions();
	}

}
