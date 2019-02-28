package com.cg.jcat.api.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.cg.jcat.api.entity.AssessmentQuestion;
import com.cg.jcat.api.entity.DTMigration;
import com.cg.jcat.api.entity.DTMigrationRule;
import com.cg.jcat.api.entity.DTMigrationRuleHistory;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;
import com.cg.jcat.api.repository.IDTMigrationRepository;
import com.cg.jcat.api.repository.IDTMigrationRuleHistoryRepository;
import com.cg.jcat.api.repository.IDTMigrationRuleRepository;

@Component
public class DTMigrationRuleDao {

	@Autowired
	IDTMigrationRuleRepository dtMigrationRuleRepository;

	@Autowired
	IDTMigrationRepository dtMigrationRepository;

	@Autowired
	IDTMigrationRuleHistoryRepository dtMigrationRuleHistoryRepository;

	@Autowired
	IAssessmentQuestionRepository assessmentQuestionRepository;

	@Autowired
	AssessmentQuestionDao assessmentQuestionDao;

	boolean afterSaved = false;
	int countOfHistoryRule = 0;

	public List<DTMigrationRuleModel> getMigrationRule(int migrationId) {
		List<DTMigrationRuleModel> dtMigrationRuleModelIST = new ArrayList<DTMigrationRuleModel>();
		List<DTMigrationRule> dtMigrationRuleLIST;
		if (migrationId == 0) {
			dtMigrationRuleLIST = dtMigrationRuleRepository.findAll(); // find all if id is 0
			return toGetMigrationRule(dtMigrationRuleLIST, dtMigrationRuleModelIST);
		} else {
			dtMigrationRuleLIST = dtMigrationRuleRepository
					.findByDtMigration(dtMigrationRepository.findById(migrationId));
			return toGetMigrationRule(dtMigrationRuleLIST, dtMigrationRuleModelIST);
		}

	}

	public List<DTMigrationRuleModel> toGetMigrationRule(List<DTMigrationRule> dtMigrationRuleLIST,
			List<DTMigrationRuleModel> dtMigrationRuleModelIST) {

		for (DTMigrationRule assessmentQuestion : dtMigrationRuleLIST) {
			dtMigrationRuleModelIST.add(toGetMigrationRuleModel(assessmentQuestion));
		}
		return dtMigrationRuleModelIST;
	}

	public List<DTMigrationRule> toGetMigrationRule() {
		return dtMigrationRuleRepository.findAll();
	}

	@Transactional
	public boolean saveDTMigrationRule(List<DTMigrationRuleModel> dtMigrationRuleModelList) throws SystemExceptions {
		countOfHistoryRule = getCountOfMigrationRuleHistoryRule();
		int id=0;
		
		for(DTMigrationRuleModel dtMigrationRuleModel:dtMigrationRuleModelList)
		{
			id=dtMigrationRuleModel.getMigrationId();
		}
	 
		
		if (getCountOfMigrationRule() != 0) {
			try {
				   List<DTMigrationRule> deletedRules= dtMigrationRuleRepository.deleteAllByDtMigration(dtMigrationRepository.findByMigrationId(id));
//				saveMigrationRuleHistory(toGetMigrationRule());
				saveMigrationRuleHistory(deletedRules);
			} catch (Exception e) {
				throw new SystemExceptions("saveDTMigrationRule()");
			}
		}

	    //		dtMigrationRuleRepository.deleteAll();
		afterSaved = saveAllMigrationRule(dtMigrationRuleModelList);
		return afterSaved;
	}

	public int getCountOfMigrationRuleHistoryRule() {

		return dtMigrationRuleHistoryRepository.findAll().size();
	}

	public int getCountOfMigrationRule() {
		return dtMigrationRuleRepository.findAll().size();
	}

	public boolean saveAllMigrationRule(List<DTMigrationRuleModel> dtMigrationRuleModelList) {
		List<DTMigrationRule> dtMigrationRules = new ArrayList<>();
		for (DTMigrationRuleModel dtMigrationRuleModel : dtMigrationRuleModelList) {
			dtMigrationRules.add(toGetMigrationRule(dtMigrationRuleModel));
		}
		return dtMigrationRuleRepository.saveAll(dtMigrationRules) != null;

	}

	public boolean updateMigrationRule(DTMigrationRuleModel dtMigrationRuleModel) {
		boolean updateResult = false;
		updateResult = dtMigrationRuleRepository.saveAndFlush(toGetMigrationRule(dtMigrationRuleModel)) != null;
		return updateResult;
	}

	/*
	 * MIGRATION PATTERN
	 */

	public List<DTMigrationModel> getMigrationPattern() {
		List<DTMigration> dtMigrationLIST = dtMigrationRepository.findAll();
		return toGetMigration(dtMigrationLIST);
	}

	public List<DTMigrationModel> toGetMigration(List<DTMigration> dtMigrationLIST) {
		List<DTMigrationModel> dtMigrationModelIST = new ArrayList<>();
		for (DTMigration assessmentQuestion : dtMigrationLIST) {
			dtMigrationModelIST.add(toGetDTMigration(assessmentQuestion));
		}
		return dtMigrationModelIST;
	}

	/*
	 * Migration Rule History Getter
	 */

	public void saveMigrationRuleHistory(List<DTMigrationRule> dtMigrationRuleList) {
		for (DTMigrationRule dtMigrationRule : dtMigrationRuleList) {
			dtMigrationRuleHistoryRepository.save(toGetMigrationRuleHistory(dtMigrationRule));
		}
	}

	public DTMigrationRuleHistory toGetMigrationRuleHistory(DTMigrationRule dtMigrationRule) {
		Date date = new Date();
		DTMigrationRuleHistory dtMigrationRuleHistory = new DTMigrationRuleHistory();
		dtMigrationRuleHistory.setCreatedBy(dtMigrationRule.getCreatedBy());
		dtMigrationRuleHistory.setCreatedTime(date);
		dtMigrationRuleHistory.setExecutionOrder(dtMigrationRule.getExecutionOrder());
		dtMigrationRuleHistory.setDtMigration(dtMigrationRule.getDtMigration());
		dtMigrationRuleHistory.setMigrationRuleId(dtMigrationRule.getMigrationRuleId());
		dtMigrationRuleHistory.setAssessmentQuestion(dtMigrationRule.getAssessmentQuestion());
		dtMigrationRuleHistory.setQuestionTextEN(dtMigrationRule.getQuestiontextEN());
		dtMigrationRuleHistory.setRuleOptionIds(dtMigrationRule.getRuleOptionIds());
		dtMigrationRuleHistory.setRuleOptionTextEN(dtMigrationRule.getRuleOptionTextEN());
		return dtMigrationRuleHistory;
	}

	/*
	 * Migration Rule Model Getter
	 */

	public DTMigrationRuleModel toGetMigrationRuleModel(DTMigrationRule dtMigrationRule) {
		DTMigrationRuleModel dtMigrationRuleModel = new DTMigrationRuleModel();
		dtMigrationRuleModel.setExecutionOrder(dtMigrationRule.getExecutionOrder());
		dtMigrationRuleModel.setMigrationId(dtMigrationRule.getDtMigration().getMigrationId());
		dtMigrationRuleModel.setMigrationRuleId(dtMigrationRule.getMigrationRuleId());
		dtMigrationRuleModel.setQuestionId(dtMigrationRule.getAssessmentQuestion().getQuestionId());
		dtMigrationRuleModel.setQuestiontextEN(dtMigrationRule.getQuestiontextEN());
		dtMigrationRuleModel.setRuleOptionIds(dtMigrationRule.getRuleOptionIds());
		dtMigrationRuleModel.setRuleOptionTextEN(dtMigrationRule.getRuleOptionTextEN());
		dtMigrationRuleModel.setCreatedBy(dtMigrationRule.getCreatedBy());
		dtMigrationRuleModel.setModifiedBy(dtMigrationRule.getModifiedBy());
		return dtMigrationRuleModel;
	}

	/*
	 * Migration Rule Getter
	 */

	public DTMigrationRule toGetMigrationRule(DTMigrationRuleModel dtMigrationRuleModel) {
		Date date = new Date();
		DTMigrationRule dtMigrationRule = new DTMigrationRule();

		Optional<DTMigration> dtMigrationOptional = dtMigrationRepository
				.findById(dtMigrationRuleModel.getMigrationId());
		DTMigration dtMigration = dtMigrationOptional.get();
		Optional<AssessmentQuestion> assessmentQuestionOptional = assessmentQuestionRepository
				.findById(dtMigrationRuleModel.getQuestionId());
		AssessmentQuestion assessmentQuestion = assessmentQuestionOptional.get();

		if(dtMigrationRuleRepository.findByMigrationRuleId(dtMigrationRuleModel.getMigrationRuleId()) != null)
		{
			dtMigrationRule=dtMigrationRuleRepository.findByMigrationRuleId(dtMigrationRuleModel.getMigrationRuleId());
		}
		dtMigrationRule.setExecutionOrder(dtMigrationRuleModel.getExecutionOrder());
		dtMigrationRule.setDtMigration(dtMigration);
		dtMigrationRule.setMigrationRuleId(dtMigrationRuleModel.getMigrationRuleId());
		dtMigrationRule.setAssessmentQuestion(assessmentQuestion);
		dtMigrationRule.setQuestiontextEN(dtMigrationRuleModel.getQuestiontextEN());
		dtMigrationRule.setRuleOptionIds(dtMigrationRuleModel.getRuleOptionIds());
		dtMigrationRule.setRuleOptionTextEN(dtMigrationRuleModel.getRuleOptionTextEN());
//		dtMigrationRule.setCreatedBy("Admin");
		dtMigrationRule.setCreatedBy(dtMigrationRuleModel.getCreatedBy());
		return dtMigrationRule;
	}

	/*
	 * Migration Getter
	 */

	public DTMigrationModel toGetDTMigration(DTMigration dtMigration) {
		DTMigrationModel dtMigrationModel = new DTMigrationModel();
		dtMigrationModel.setCreatedBy(dtMigration.getCreatedBy());
		dtMigrationModel.setEvaluationOrder(dtMigration.getEvaluationOrder());
		dtMigrationModel.setLogicalOperator(dtMigration.getLogicalOperator());
		dtMigrationModel.setMigrationPattern(dtMigration.getMigration_pattern());
		dtMigrationModel.setMigrationId(dtMigration.getMigrationId());
		dtMigrationModel.setModifiedBy(dtMigration.getModifiedBy());
		return dtMigrationModel;
	}

	public List<AssessmentQuestionModel> getQuestionsByMigrationId() {
		return assessmentQuestionDao.getQuestionsByMigrationId();
	}
}

/*
 * public boolean saveMigrationRule(DTMigrationRuleModel dtMigrationRuleModel) {
 * try { return saveDTMigrationRule(dtMigrationRuleModel); }catch (Exception e)
 * { System.out.print(ExceptionMessages.SaveUsersToDB + e); return false; } }
 */
