package com.cg.jcat.api.dao;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;
import com.cg.jcat.api.utility.QuestionTypeEnum;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestDTCloudableRule {
	@Autowired
	DTCloudableRuleDao dTCloudableRuleDAO;

	@Autowired
	AssessmentQuestionDao assessmentQuestionDao;

	@Autowired
	IAssessmentQuestionRepository assessmentQuestionRepository;

	public List<DTCloudableRuleModel> getCloudableRuleModel() {
		List<DTCloudableRuleModel> dtCloudableRuleModelist = new ArrayList<DTCloudableRuleModel>();
		DTCloudableRuleModel dtCloudableRuleModel = new DTCloudableRuleModel();
		dtCloudableRuleModel.setOptionIds("1");
		dtCloudableRuleModel.setOptionTextsEN("Yes");
		dtCloudableRuleModel.setQuestionId(1);
		dtCloudableRuleModel.setQuestionTextEN("Question Text");
		dtCloudableRuleModel.setExecutionOrder(1);
		dtCloudableRuleModelist.add(dtCloudableRuleModel);
		return dtCloudableRuleModelist;
	}

	@Test
	@Ignore
	public void testGetCloudableRule() throws SystemExceptions {
		List<DTCloudableRuleModel> dtCloudableRuleModelList = new ArrayList<DTCloudableRuleModel>();
		dtCloudableRuleModelList = getCloudableRuleModel();
		dTCloudableRuleDAO.saveCloudableRule(dtCloudableRuleModelList);
		assertEquals(1, dTCloudableRuleDAO.getCloudableRule().size());
	}

	@Test
	// @Ignore
	public void testSaveCloudableRule() throws SystemExceptions {
		boolean result = true;
		boolean rule = true;
		result = assessmentQuestionDao.saveQuestions(getAssessmentQuestions());
		assertEquals(true, result);
		// Assert.assertTrue(result);
		// assertEquals(Assert.assertTrue, result);
		List<DTCloudableRuleModel> dTCloudableRuleModelList = new ArrayList<DTCloudableRuleModel>();
		dTCloudableRuleModelList = getCloudableRuleModel();
		rule = dTCloudableRuleDAO.saveCloudableRule(dTCloudableRuleModelList);
		assertEquals(true, rule);
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

	List<QuestionOptionModel> getQuestionOptionModel() {
		List<QuestionOptionModel> list = new ArrayList<>();
		QuestionOptionModel questionOptionModel = new QuestionOptionModel();
		questionOptionModel.setOptionTextEN("ENGLISH");
		questionOptionModel.setOptionTextLang2("ä ö ü ß Ä Ö Ü");
		list.add(questionOptionModel);
		return list;
	}

}
