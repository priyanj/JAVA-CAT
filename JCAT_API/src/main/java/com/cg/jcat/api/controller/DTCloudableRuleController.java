package com.cg.jcat.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.dao.DTCloudableRuleModel;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.service.IDTCloudableRuleService;

@Component
public class DTCloudableRuleController implements IDTCloudableRuleController {
	private static final Logger logger = LoggerFactory.getLogger(DTCloudableRuleController.class);

	@Autowired
	IDTCloudableRuleService iDTCloudableRuleService;

	@Override
	public List<DTCloudableRuleModel> getCloudableRule() throws SystemExceptions {
		try {
			return iDTCloudableRuleService.getCloudableRule();

		} catch (Exception e) {
			logger.error("Error in getting all cloudable rules : getCloudableRule()", e);
			throw new SystemExceptions("getCloudableRule()");
		}
	}

	@Override
	public DTCloudableRuleModel getCloudableRuleById(int cloudableRuleId) {

		return iDTCloudableRuleService.getCloudableRuleById(cloudableRuleId);
	}

	@Override
	public boolean saveCloudableRule(List<DTCloudableRuleModel> dTCloudableRuleModelList) throws SystemExceptions {

		return iDTCloudableRuleService.saveCloudableRule(dTCloudableRuleModelList);
	}

}
