package com.cg.jcat.api.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

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

import com.cg.jcat.api.entity.DTProviders;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;
import com.cg.jcat.api.repository.IDTProviderRepository;
import com.cg.jcat.api.utility.QuestionTypeEnum;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestProviderRuleDao {

	@Autowired
	private DTProviderRuleDao ProviderRuleDao;

	@Autowired
	private IDTProviderRepository providerRepository;

	@Autowired
	AssessmentQuestionDao assessmentQuestionDao;

	@Autowired
	IAssessmentQuestionRepository assessmentQuestionRepository;

	@Test
	// @Ignore
	public void testsaveCloudProvider() {
		providerRepository.save(getProvider());
		assertNotNull(ProviderRuleDao.getCloudProvider());
	}

	private DTProviders getProvider() {
		Date date = new Date();
		DTProviders providers = new DTProviders();
		providers.setCreatedBy("Admin");
		providers.setCreatedTime(date);
		providers.setEvaluationOrder(1);
		providers.setEvaluationOrder(1);
		providers.setLogicalOperator("OR");
		providers.setProviderName("gitc");
		return providers;
	}

	@Test
	// @Ignore
	public void testGetCloudProvider() {
		providerRepository.save(getProvider());
		assertNotNull(ProviderRuleDao.getCloudProvider());
		assertEquals(1, ProviderRuleDao.getCloudProvider().size());
	}

	@Test
	// @Ignore
	public void testGetCloudProviderRules() throws SystemExceptions {
		List<DTProviderRuleModel> cloudProviderRuleModelList = new ArrayList<DTProviderRuleModel>();

		assertNotNull(ProviderRuleDao.getCloudProviderRules(0));
		assertEquals(1, ProviderRuleDao.getCloudProviderRules(0).size());
	}

	@Test
	// @Ignore
	public void testSaveCloudProviderRule() throws SystemExceptions {

		boolean result = true;
		result = assessmentQuestionDao.saveQuestions(getAssessmentQuestions());
		assertEquals(true, result);

		result = providerRepository.save(getProvider()) != null;
		assertEquals(true, result);

		List<DTProviderRuleModel> providerRuleList = new ArrayList<>();
		providerRuleList.add(getcloudProviderRuleModel());
		assertEquals(true, ProviderRuleDao.saveProviderRule(providerRuleList)); // saving 2 migration rule

		assertEquals(1, ProviderRuleDao.getCountOfProviderRule());

	}

	private DTProviderRuleModel getcloudProviderRuleModel() {

		DTProviderRuleModel DTProviderRuleModel = new DTProviderRuleModel();
		DTProviderRuleModel.setEvaluationOrder(1);
		DTProviderRuleModel.setProviderId(1);
		DTProviderRuleModel.setQuestionId(1);
		DTProviderRuleModel.setQuestiontextEN("1");
		DTProviderRuleModel.setRuleOptionIds("1");
		DTProviderRuleModel.setRuleOptionTextEN("1");

		return DTProviderRuleModel;
	}

	List<QuestionOptionModel> getQuestionOptionModel() {
		List<QuestionOptionModel> list = new ArrayList<>();
		QuestionOptionModel questionOptionModel = new QuestionOptionModel();
		questionOptionModel.setOptionTextEN("ENGLISH");
		questionOptionModel.setOptionTextLang2("ä ö ü ß Ä Ö Ü");
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
