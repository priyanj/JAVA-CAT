package com.cg.jcat.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cg.jcat.api.dao.DTMigrationModel;
import com.cg.jcat.api.dao.DTMigrationRuleModel;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;

@Service
public interface IDTMigrationRuleService {

	public List<DTMigrationRuleModel> getMigrationRule(int migrationId) throws JcatExceptions;

	public boolean saveMigrationRule(List<DTMigrationRuleModel> dtMigrationRuleModel)
			throws SystemExceptions, OptionTextNotNullException;

	public List<DTMigrationModel> getMigrationPattern();

}
