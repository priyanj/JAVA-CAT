package com.cg.jcat.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTMigrationModel;
import com.cg.jcat.api.dao.DTMigrationRuleModel;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.service.IDTMigrationRuleService;

@Component
public class DTMigrationRuleController implements IDTMigrationRuleController {

	private static final Logger logger = LoggerFactory.getLogger(DTMigrationRuleController.class);

	@Autowired
	IDTMigrationRuleService dtMigrationRuleService;

	@Override
	public List<DTMigrationRuleModel> getMigrationRule(int migrationId) {
		try {
			return dtMigrationRuleService.getMigrationRule(migrationId);
		} catch (JcatExceptions e) {
			logger.error("Error in getting rules in getMigrationRule()" + e);
			return null;
		}
	}

	@Override
	public void saveMigrationRule(List<DTMigrationRuleModel> dtMigrationRuleModel) throws SystemExceptions {
		try {
			dtMigrationRuleService.saveMigrationRule(dtMigrationRuleModel);
		} catch (JcatExceptions e) {
			logger.error("Error in saveMigration()");
		}

	}

	@Override
	public List<DTMigrationModel> getMigration() {
		return dtMigrationRuleService.getMigrationPattern();
	}

	@Override
	public List<AssessmentQuestionModel> getQuestionsByMigrationId() {
		return dtMigrationRuleService.getQuestionsByMigrationId();
	}

}
