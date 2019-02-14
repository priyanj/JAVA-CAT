package com.cg.jcat.api.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.cg.jcat.api.entity.AssessmentQuestion;
import com.cg.jcat.api.entity.DTMigration;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;
import com.cg.jcat.api.repository.IDTMigrationRepository;
import com.cg.jcat.api.utility.QuestionTypeEnum;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestMigrationRuleDao {

	@Autowired
	DTMigrationRuleDao dtMigrationRuleDao;

	@Autowired
	AssessmentQuestionDao assessmentQuestionDao;

	@Autowired
	IDTMigrationRepository dtMigrationRepository;

	@Autowired
	IAssessmentQuestionRepository assessmentQuestionRepository;

	Date date = new Date();

	@Test
	public void testASaveMigrationRule() throws SystemExceptions {
		boolean result = true;
		AssessmentQuestion assessmentQuestion = new AssessmentQuestion();
		assessmentQuestion.setQuestionTextEN("text");
		result = assessmentQuestionDao.saveQuestions(getAssessmentQuestions());
		assertEquals(true, result);

		DTMigration dtMigration = new DTMigration();
		dtMigration.setCreatedBy("Admin");
		dtMigration.setCreatedTtime(date);
		dtMigration.setEvaluationOrder(1);
		dtMigration.setEvaluationOrder(1);
		dtMigration.setLogicalOperator("OR");
		dtMigration.setMigration_pattern("Rehost");
		result = dtMigrationRepository.save(dtMigration) != null;
		assertEquals(true, result);

		List<DTMigrationRuleModel> migrationRuleList = new ArrayList<>();
		migrationRuleList.add(toGetMigrationRule());
		int previousCountOfHistory = 0, previousSaveMigrationRuleCount;
		previousCountOfHistory = dtMigrationRuleDao.getCountOfMigrationRuleHistoryRule();
		previousSaveMigrationRuleCount = dtMigrationRuleDao.getCountOfMigrationRule();

		assertEquals(true, dtMigrationRuleDao.saveDTMigrationRule(migrationRuleList)); // saving 1 migration rule
		assertEquals(1, dtMigrationRuleDao.getCountOfMigrationRule()); // after save method its size should be 1 because
																		// previous data deleted
		assertEquals(dtMigrationRuleDao.getCountOfMigrationRuleHistoryRule(),
				previousCountOfHistory + previousSaveMigrationRuleCount); // neWhistoryTableSize= migrationRuleCount+
																			// previousSizeOfHistory
	}

	@Test
	public void testGetMigrationRule() throws SystemExceptions {
		assertNotNull(dtMigrationRuleDao.toGetMigrationRule());
		assertEquals(1, dtMigrationRuleDao.toGetMigrationRule().size());
	}

	@Test
	public void testGetMigrationPattern() {
		assertNotNull(dtMigrationRuleDao.getMigrationPattern());
	}

	private DTMigrationRuleModel toGetMigrationRule() {

		DTMigrationRuleModel dtMigrationRuleModel = new DTMigrationRuleModel();
		dtMigrationRuleModel.setMigrationRuleId(4);
		dtMigrationRuleModel.setMigrationId(1);
		dtMigrationRuleModel.setExecutionOrder(11);
		dtMigrationRuleModel.setQuestionId(1);
		dtMigrationRuleModel.setQuestiontextEN("11");
		dtMigrationRuleModel.setRuleOptionIds("11");
		dtMigrationRuleModel.setRuleOptionTextEN("11");
		return dtMigrationRuleModel;
	}

	List<QuestionOptionModel> getQuestionOptionModel() {
		List<QuestionOptionModel> list = new ArrayList<>();
		QuestionOptionModel questionOptionModel = new QuestionOptionModel();
		questionOptionModel.setOptionTextEN("ENGLISH");
		questionOptionModel.setOptionTextLang2("ä ö ü ß Ä Ö Ü");
		list.add(questionOptionModel);
		return list;
	}

	AssessmentQuestionModel getAssessmentQuestions() {
		Date date = new Date();
		AssessmentQuestionModel assessmentQuestionModel = new AssessmentQuestionModel();
		assessmentQuestionModel.setAssessmentTypeForCloudable(true);
		assessmentQuestionModel.setAssessmentTypeForCloudProvider(true);
		assessmentQuestionModel.setAssessmentTypeForMigration(true);
		assessmentQuestionModel.setCreatedBy("Admin");
		assessmentQuestionModel.setDeleted(false);
		assessmentQuestionModel.setDisplayOrder(2);
		assessmentQuestionModel.setModifiedBy("Admin");
		assessmentQuestionModel.setQuestionDescriptionEN("Engl");
		assessmentQuestionModel.setQuestionDescriptionLang2("Germ");
		assessmentQuestionModel.setQuestionId(1);
		assessmentQuestionModel.setQuestionTextEN("Engl");
		assessmentQuestionModel.setQuestionTextLang2("Germ");
		assessmentQuestionModel.setQuestionType(QuestionTypeEnum.LONG_ANSWER);
		assessmentQuestionModel.setNumberOfOptions(2);
		assessmentQuestionModel.setQuestionOptionModel(getQuestionOptionModel());
		return assessmentQuestionModel;
	}

}
