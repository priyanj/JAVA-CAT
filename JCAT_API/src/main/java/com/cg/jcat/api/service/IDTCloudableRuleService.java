package com.cg.jcat.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTCloudableRuleModel;
import com.cg.jcat.api.exception.SystemExceptions;

@Service
public interface IDTCloudableRuleService {

	public List<DTCloudableRuleModel> getCloudableRule();

	public DTCloudableRuleModel getCloudableRuleById(int cloudableRuleId);

	public boolean saveCloudableRule(List<DTCloudableRuleModel> dtCloudableRuleModelList) throws SystemExceptions;

	public List<AssessmentQuestionModel> getCloudableQuestions();
}
