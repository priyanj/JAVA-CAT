package com.cg.jcat.api.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTMigrationModel;
import com.cg.jcat.api.dao.DTMigrationRuleDao;
import com.cg.jcat.api.dao.DTMigrationRuleModel;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;

@Component
public class DTMigrationRuleService implements IDTMigrationRuleService {

	private static final Logger logger = LoggerFactory.getLogger(DTMigrationRuleDao.class);

	@Autowired
	DTMigrationRuleDao dtMigrationRuleDao;

	@Override
	public List<DTMigrationRuleModel> getMigrationRule(int migrationId) throws JcatExceptions {
		List<DTMigrationRuleModel> migrationRuleModels = dtMigrationRuleDao.getMigrationRule(migrationId);
		logger.info("Retriving all providers from DB!, number of providers ");
		return migrationRuleModels;
	}

	@Override
	public boolean saveMigrationRule(List<DTMigrationRuleModel> dtMigrationRuleModels)
			throws SystemExceptions, OptionTextNotNullException {
		boolean afterSavedValue = false;
		StringBuffer strBuff = new StringBuffer();
		for (DTMigrationRuleModel migrationRuleModel : dtMigrationRuleModels) {
			if (StringUtils.isEmpty(migrationRuleModel.getQuestiontextEN())) {
				strBuff.append("Option text for question " + migrationRuleModel.getQuestionId() + " is empty!\n");
			} else {
				String optionText[] = migrationRuleModel.getRuleOptionTextEN().split(",");
				String optionIds[] = migrationRuleModel.getRuleOptionIds().split(",");
				if (optionText.length != optionIds.length) {
					strBuff.append("Number of options for question " + migrationRuleModel.getQuestionId()
							+ " does not macthes with number of option text!\n");
				}
			}
		}
		if (strBuff.length() == 0) {

			afterSavedValue = dtMigrationRuleDao.saveDTMigrationRule(dtMigrationRuleModels);
		} else {
			logger.error("Error option text can't be null,and number of option text and option ids should be same :: "
					+ strBuff.toString());
			throw new OptionTextNotNullException(strBuff.toString());
		}
		System.out.println(afterSavedValue);
		return afterSavedValue;

	}

	@Override
	public List<DTMigrationModel> getMigrationPattern() {
		return dtMigrationRuleDao.getMigrationPattern();
	}

	@Override
	public List<AssessmentQuestionModel> getQuestionsByMigrationId() {
		// TODO Auto-generated method stub
		return dtMigrationRuleDao.getQuestionsByMigrationId();
	}

}
