package com.cg.jcat.api.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.cg.jcat.api.dao.AnswerModel;
import com.cg.jcat.api.dao.ApplicationModel;
import com.cg.jcat.api.dao.AssessmentDao;
import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTCloudableRuleModel;
import com.cg.jcat.api.dao.DTMigrationRuleModel;
import com.cg.jcat.api.dao.DTProviderRuleModel;
import com.cg.jcat.api.entity.Application;
import com.cg.jcat.api.entity.DTMigration;
import com.cg.jcat.api.entity.DTProviders;
import com.cg.jcat.api.exception.ApplicationIdNotFoundException;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IDTMigrationRepository;
import com.cg.jcat.api.repository.IDTProviderRepository;
import com.cg.jcat.api.utility.QuestionTypeEnum;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestAssessmentService {

	@Autowired
	AssessmentService assessmentService;

	@Autowired
	ApplicationService applicationService;

	@Autowired
	AssessmentDao assessmentDao;

	@Autowired
	AssessmentQuestionService assessmentQuestionService;

	@Autowired
	DTCloudableRuleService dtCloudableRuleService;

	@Autowired
	DTMigrationRuleService dtMigrationRuleService;

	@Autowired
	IDTMigrationRepository dtMigrationRepository;

	@Autowired
	DTProviderRuleService dtProviderRuleService;

	@Autowired
	IDTProviderRepository dtProviderRepository;

	Date date = new Date();

	@Test
	public void testAStage1Finalized() throws SystemExceptions, OptionTextNotNullException,
			ApplicationIdNotFoundException, CountMissMatchException {

		/*
		 * Saving Assessment Questions
		 */
		boolean result = true;
		result = assessmentQuestionService.saveQuestions(getAssessmentQuestions());
		assertEquals(true, result);

		/*
		 * Saving Cloudable Rule
		 */
		boolean rule = true;
		List<DTCloudableRuleModel> dTCloudableRuleModelList = new ArrayList<DTCloudableRuleModel>();
		dTCloudableRuleModelList = getCloudableRuleModel();
		rule = dtCloudableRuleService.saveCloudableRule(dTCloudableRuleModelList);
		assertEquals(true, rule);

		/*
		 * Saving Application
		 */
		ApplicationModel applicationModel = getApplicationModel();
		applicationModel.setAid(1);
		applicationModel.setApplicationId("app");
		applicationModel.setAssessmentStage(1);
		System.out.println(applicationModel);
		applicationService.save(applicationModel);

		/*
		 * Saving Answer
		 */
		AnswerModel answerModel = getAnswerModel(1, 1, false, false, false, "Admin", "1", "a", 1, "q1");
		List<AnswerModel> answerModels = new ArrayList<>();
		answerModels.add(answerModel);
		result = assessmentService.saveAnswers(answerModels, 1);
		assertTrue(result); // check answers are saving in database or not
		assertEquals(1, assessmentService.getAnswers(1).size()); // check size of answers in database
		answerModels = assessmentService.getAnswers(1); // get answers in list

		/*
		 * Call finalize
		 */
		assessmentService.finalized(answerModels, 1, 1);
		assertEquals(1, assessmentService.getAnswers(1).size());
		assertEquals(true, assessmentService.getAnswers(1).get(0).isDtCloudableRuleResult());

		Application application = assessmentDao.getApplicationByApplicationId(1);
		assertEquals(1, application.getAssessmentStage()); // check application stage
		assertEquals(true, application.isDTCloudable()); // check dt cloudable result

	}

	/*
	 * GITC
	 */
	@Test
	public void testEprovidersGITC() throws SystemExceptions, OptionTextNotNullException, CountMissMatchException {
		boolean result = false;
		saveQuestions();

		/*
		 * int providerId, String providerName, String createdBy, Date createdTime, int
		 * evaluationOrder,String logicalOperator, String modifiedBy,Date modifiedTime
		 */
		List<DTProviders> dtProvidersList = new ArrayList<>();
		dtProvidersList.add(saveProvider(1, "GITC", "Admin", date, 1, "OR", "Admin", date));
		dtProvidersList.add(saveProvider(2, "AWS", "Admin", date, 2, "Others", "Admin", date));
		dtProviderRepository.saveAll(dtProvidersList);

		/*
		 * Saving Migration Rule int providerRuleId, int providerId, int
		 * evaluationOrder, int questionId, String questiontextEN, String ruleOptionIds,
		 * String ruleOptionTextEN
		 */
		try {

			List<DTProviderRuleModel> dtProviderRuleModelList = new ArrayList<>();
			dtProviderRuleModelList.add(getCloudProviderRule(1, 1, 1, 1, "question1", "2,3", "TB,PB"));
			dtProviderRuleModelList.add(getCloudProviderRule(2, 1, 2, 2, "question2", "1,2", "2ms,5ms"));

			Mockito.when(dtProviderRuleService.saveCloudProviderRule(dtProviderRuleModelList)).thenReturn(true);
			assertEquals(true, dtProviderRuleService.saveCloudProviderRule(dtProviderRuleModelList)); // CHECK GIVEN
																										// MIGRATION IS
			// SUCCESSFULLY SAVING
		} catch (Exception e) {

		}

		/*
		 * Saving Application
		 */

		saveApplication();

		/*
		 * Saving Answer answerId, applicationId, dtCloudableRuleResult,
		 * dtMigrationRuleResult, dtProviderRuleResult, modifiedBy, optionIds,
		 * optionTextEn, questionId, questionText
		 */

		List<AnswerModel> answerModels = new ArrayList<>();
		answerModels.add(getAnswerModel(1, 1, false, false, false, "Admin", "2,3", "TB,PB", 1, "question1"));
		answerModels.add(getAnswerModel(2, 1, false, false, false, "Admin", "1,2", "2ms,5ms", 2, "question2"));
		result = assessmentService.saveAnswers(answerModels, 1); // answerList, applicationId in parameter
		assertTrue(result); // check answers are saving in database or not
		assertEquals(2, assessmentService.getAnswers(1).size()); // check size of answers in database
		// answerModels = assessmentService.getAnswers(1); // get answers in list
		// assertEquals(1, answerModels.get(0).getAnswerId()); // check dt cloudable
		// result

		/*
		 * Call finalize for migration rule id 1 public pass
		 */
		Application application = assessmentDao.getApplicationByApplicationId(1);
		try {
			assessmentService.finalized(answerModels, 1, 2);
		} catch (Exception e) {
		}

		application = assessmentDao.getApplicationByApplicationId(1);
		assertEquals(2, application.getAssessmentStage()); // check application stage
		assertEquals("GITC", assessmentDao.getApplicationByApplicationId(1).getDtCloudProvider());

	}

	/*
	 * Public Pass
	 */
	@Test
	public void testBStage2MigrationRulePublicPass()
			throws SystemExceptions, OptionTextNotNullException, CountMissMatchException {
		boolean result = false;
		saveQuestions();
		saveMigrationPattern();

		/*
		 * Saving Migration Rule executionOrder, migrationId, questionId,
		 * questiontextEN, ruleOptionIds, optionTextEN
		 */
		try {

			List<DTMigrationRuleModel> migrationRuleList = new ArrayList<>();
			migrationRuleList.add(
					toGetMigrationRule(1, 1, 1, "Data Classification: Data classification", "1", "1. Unclassified"));
			migrationRuleList.add(toGetMigrationRule(2, 1, 2,
					"Performance: What is the desired response time for each component", "1", "1. Less than 1 sec"));
			migrationRuleList.add(toGetMigrationRule(3, 2, 3,
					"Operating System: Provide version, edition for operating system on web", "2",
					"2. Below Windows Server 2008 R2"));

			Mockito.when(dtMigrationRuleService.saveMigrationRule(migrationRuleList)).thenReturn(true);
			assertEquals(true, dtMigrationRuleService.saveMigrationRule(migrationRuleList)); // CHECK GIVEN MIGRATION IS
																								// SUCCESSFULLY SAVING
																								// OR NOT

		} catch (Exception e) {

		}

		/*
		 * Saving Application
		 */

		// saveApplication();

		/*
		 * Saving Answer answerId, applicationId, dtCloudableRuleResult,
		 * dtMigrationRuleResult, dtProviderRuleResult, modifiedBy, optionIds,
		 * optionTextEn, questionId, questionText
		 */

		List<AnswerModel> answerModels = new ArrayList<>();
		answerModels.add(getAnswerModel(1, 1, false, false, false, "Admin", "1", "1. Unclassified", 1,
				"Data Classification: Data classification"));
		answerModels.add(getAnswerModel(2, 1, false, false, false, "Admin", "1", "1. Less than 1 sec", 2,
				"Performance: What is the desired response time for each component"));
		answerModels.add(getAnswerModel(3, 1, false, false, false, "Admin", "2", "2. Below Windows Server 2008 R2", 3,
				"Operating System: Provide version, edition for operating system on web"));
		result = assessmentService.saveAnswers(answerModels, 1);
		assertTrue(result); // check answers are saving in database or not
		assertEquals(3, assessmentService.getAnswers(1).size()); // check size of answers in database
		answerModels = assessmentService.getAnswers(1); // get answers in list
		assertEquals(1, answerModels.get(0).getAnswerId()); // check dt cloudable result

		/*
		 * Call finalize for migration rule id 1 public pass
		 */
		Application application = assessmentDao.getApplicationByApplicationId(1);
		try {
			assessmentService.finalized(answerModels, 1, 2);
		} catch (Exception e) {
		}

		application = assessmentDao.getApplicationByApplicationId(1);
		assertEquals(2, application.getAssessmentStage()); // check application stage
		assertEquals("Public- Pass", assessmentDao.getApplicationByApplicationId(1).getDtMigrationPattern());
		assertEquals(true, assessmentService.getAnswers(1).get(0).isDtMigrationRuleResult());
		// System.out.println(assessmentService);
		// assertEquals(true, answerModels.get(0).isDtMigrationRuleResult());
	}

	/*
	 * Re-Plateform
	 */

	// @Ignore
	@Test
	public void testBStage2MigrationRuleRehost() throws JcatExceptions {
		boolean result = true;
		saveQuestions();
		saveMigrationPattern();

		/*
		 * Saving Migration Rule executionOrder, migrationId, questionId,
		 * questiontextEN, ruleOptionIds, optionTextEN
		 */
		try {

			List<DTMigrationRuleModel> migrationRuleList = new ArrayList<>();
			migrationRuleList.add(toGetMigrationRule(1, 1, 1,
					"Application Type: Captures the type of application whether it is:", "1,2,3", "a,b,c")); // public-pass
			migrationRuleList.add(toGetMigrationRule(2, 2, 2, "Database Server: Which database server is being used",
					"2", "2. Below MS SQL 2008")); // Re-Plateform
			migrationRuleList.add(toGetMigrationRule(3, 2, 3,
					"Web / Application Server: In case of Web application, on which Application Server this application is running",
					"2", "2. Below Tomcat 7.0.0")); // Re-Plateform
			Mockito.when(dtMigrationRuleService.saveMigrationRule(migrationRuleList)).thenReturn(true);
			assertEquals(true, dtMigrationRuleService.saveMigrationRule(migrationRuleList)); // CHECK GIVEN MIGRATION IS
			System.out.println(dtMigrationRuleService.getMigrationRule(0)); // SUCCESSFULLY SAVING
			// OR NOT
		} catch (Exception e) {

		}

		// saveApplication();

		/*
		 * Saving Answer answerId, applicationId, dtCloudableRuleResult,
		 * dtMigrationRuleResult, dtProviderRuleResult, modifiedBy, optionIds,
		 * optionTextEn, questionId, questionText
		 */

		List<AnswerModel> answerModels = new ArrayList<>();
		answerModels.add(getAnswerModel(1, 1, false, false, false, "Admin", "1", "a", 1, "q1"));
		answerModels.add(getAnswerModel(2, 1, false, false, false, "Admin", "2", "2. Below MS SQL 2008", 2,
				"Database Server: Which database server is being used")); // Re-Plateform
		answerModels.add(getAnswerModel(3, 1, false, false, false, "Admin", "2", "2. Below Tomcat 7.0.0", 3,
				"Web / Application Server: In case of Web application, on which Application Server this application is running")); // Re-Plateform

		result = assessmentService.saveAnswers(answerModels, 1);
		assertTrue(result); // check answers are saving in database or not
		assertEquals(3, assessmentService.getAnswers(1).size()); // check size of answers in database
		answerModels = assessmentService.getAnswers(1); // get answers in list
		assertEquals(1, answerModels.get(0).getAnswerId()); // check dt cloudable result
		/*
		 * Call finalize for migration rule id 1 public pass
		 */
		Application application = assessmentDao.getApplicationByApplicationId(1);
		try {
			assessmentService.finalized(answerModels, 1, 2);// 1. answerList 2.ApplicationId 3. Stage
		} catch (Exception e) {
		}

		application = assessmentDao.getApplicationByApplicationId(1);
		assertEquals(2, application.getAssessmentStage()); // check application stage
		assertEquals("Re-Plateform", assessmentDao.getApplicationByApplicationId(1).getDtMigrationPattern());
	}

	/*
	 * Rehost
	 */

	@Test
	public void testBStage2MigrationRuleRePlateform() throws JcatExceptions {
		boolean result = false;
		saveQuestions();
		saveMigrationPattern();
		/*
		 * Saving Migration Rule executionOrder, migrationId, questionId,
		 * questiontextEN, ruleOptionIds, optionTextEN
		 */
		try {

			List<DTMigrationRuleModel> migrationRuleList = new ArrayList<>();
			migrationRuleList.add(toGetMigrationRule(1, 1, 1,
					"Application Type: Captures the type of application whether it is:", "1,2,3", "a,b,c")); // public-pass
			migrationRuleList.add(toGetMigrationRule(2, 2, 2, "Database Server: Which database server is being used",
					"2", "2. Below MS SQL 2008")); // Re-Plateform
			migrationRuleList.add(toGetMigrationRule(3, 2, 3,
					"Web / Application Server: In case of Web application, on which Application Server this application is running",
					"2", "2. Below Tomcat 7.0.0")); // Re-Plateform
			Mockito.when(dtMigrationRuleService.saveMigrationRule(migrationRuleList)).thenReturn(true);
			assertEquals(true, dtMigrationRuleService.saveMigrationRule(migrationRuleList)); // CHECK GIVEN MIGRATION IS
			System.out.println(dtMigrationRuleService.getMigrationRule(0)); // SUCCESSFULLY SAVING
			// OR NOT
		} catch (Exception e) {

		}

		System.out.println(dtMigrationRuleService.getMigrationRule(0));

		/*
		 * Saving Application
		 */

		// saveApplication();

		/*
		 * Saving Answer answerId, applicationId, dtCloudableRuleResult,
		 * dtMigrationRuleResult, dtProviderRuleResult, modifiedBy, optionIds,
		 * optionTextEn, questionId, questionText
		 */

		List<AnswerModel> answerModels = new ArrayList<>();
		answerModels.add(getAnswerModel(1, 1, false, false, false, "Admin", "1,2", "a,b", 1, "q1"));
		answerModels.add(getAnswerModel(2, 1, false, false, false, "Admin", "3", "3. Above MS SQL 2008", 2,
				"Database Server: Which database server is being used")); // Re-Plateform
		answerModels.add(getAnswerModel(3, 1, false, false, false, "Admin", "3", "3. Above Tomcat 7.0.0", 3,
				"Web / Application Server: In case of Web application, on which Application Server this application is running")); // Re-Plateform
		result = assessmentService.saveAnswers(answerModels, 1);
		assertTrue(result); // check answers are saving in database or not
		assertEquals(3, assessmentService.getAnswers(1).size()); // check size of answers in database
		answerModels = assessmentService.getAnswers(1); // get answers in list
		assertEquals(1, answerModels.get(0).getAnswerId()); // check dt cloudable result

		/*
		 * Call finalize for migration rule id 1 public pass
		 */
		Application application = assessmentDao.getApplicationByApplicationId(1);
		try {
			assessmentService.finalized(answerModels, 1, 2);
		} catch (Exception e) {
		}

		application = assessmentDao.getApplicationByApplicationId(1);
		assertEquals(2, application.getAssessmentStage()); // check application stage
		assertEquals("Rehost", assessmentDao.getApplicationByApplicationId(1).getDtMigrationPattern());
	}

	private void saveMigrationPattern() {
		/*
		 * Migration pattern save createdBy, createdTime,
		 * evaluationOrder,logicalOperator, migrationPattern,migrationId,modifiedBy
		 */
		DTMigration dtMigration = getMigrationPattern("Admin", date, 1, "AND", "Public- Pass", 1, "Admin");
		dtMigrationRepository.save(dtMigration);
		dtMigration = getMigrationPattern("Admin", date, 1, "OR", "Re-Plateform", 2, "Admin");
		dtMigrationRepository.save(dtMigration);
		dtMigration = getMigrationPattern("Admin", date, 1, "Others", "Rehost", 3, "Admin");
		dtMigrationRepository.save(dtMigration);
	}

	private void saveApplication() throws SystemExceptions {
		/*
		 * Saving Application
		 */
		ApplicationModel applicationModel = getApplicationModel();
		applicationModel.setAid(1);
		applicationModel.setApplicationId("App");
		applicationModel.setAssessmentStage(1);
		applicationService.save(applicationModel);
	}

	private DTProviders saveProvider(int providerId, String providerName, String createdBy, Date createdTime,
			int evaluationOrder, String logicalOperator, String modifiedBy, Date modifiedTime) {
		DTProviders dtProviders = new DTProviders();
		dtProviders.setCreatedBy(createdBy);
		dtProviders.setCreatedTime(createdTime);
		dtProviders.setEvaluationOrder(evaluationOrder);
		dtProviders.setLogicalOperator(logicalOperator);
		dtProviders.setModifiedBy(modifiedBy);
		dtProviders.setModifiedTime(modifiedTime);
		dtProviders.setProviderId(providerId);
		dtProviders.setProviderName(providerName);
		return dtProviders;
	}

	private void saveQuestions() {
		/*
		 * Saving Assessment Questions
		 */
		boolean result = true;
		result = assessmentQuestionService.saveQuestions(getAssessmentQuestions());
		AssessmentQuestionModel assessmentQuestionModel = new AssessmentQuestionModel();
		assessmentQuestionModel = getAssessmentQuestions();
		assessmentQuestionModel.setQuestionId(2);
		assessmentQuestionModel.setQuestionTextEN("q2");
		result = false;
		result = assessmentQuestionService.saveQuestions(assessmentQuestionModel);
		assessmentQuestionModel = getAssessmentQuestions();
		assessmentQuestionModel.setQuestionId(3);
		assessmentQuestionModel.setQuestionTextEN("q3");
		result = false;
		result = assessmentQuestionService.saveQuestions(assessmentQuestionModel);
		assertEquals(true, result);

	}

	/*
	 * Setter for answers
	 */
	private AnswerModel getAnswerModel(int answerId, int applicationId, boolean dtCloudableRuleResult,
			boolean dtMigrationRuleResult, boolean dtProviderRuleResult, String modifiedBy, String optionIds,
			String optionTextEn, int questionId, String questionText) {
		AnswerModel answerModel = new AnswerModel();
		answerModel.setAnswerId(answerId);
		answerModel.setApplicationId(applicationId);
		answerModel.setDtCloudableRuleResult(dtCloudableRuleResult);
		answerModel.setDtMigrationRuleResult(dtMigrationRuleResult);
		answerModel.setDtProviderRuleResult(dtProviderRuleResult);
		answerModel.setModifiedBy(modifiedBy);
		answerModel.setOptionIds(optionIds);
		answerModel.setOptionTextsEN(optionTextEn);
		answerModel.setQuestionId(questionId);
		answerModel.setQuestionTextEN(questionText);
		return answerModel;
	}

	/*
	 * Setter for Assessment Questions
	 */
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
		assessmentQuestionModel.setQuestionDescriptionEN("e1");
		assessmentQuestionModel.setQuestionDescriptionLang2("e2");
		assessmentQuestionModel.setQuestionId(1);
		assessmentQuestionModel.setQuestionTextEN("q1");
		assessmentQuestionModel.setQuestionTextLang2("e1");
		//assessmentQuestionModel.setCreatedTime(date);
		assessmentQuestionModel.setQuestionType(QuestionTypeEnum.LONG_ANSWER);
		assessmentQuestionModel.setNumberOfOptions(2);
		return assessmentQuestionModel;
	}

	/*
	 * List of cloudable rule
	 */
	public List<DTCloudableRuleModel> getCloudableRuleModel() {
		List<DTCloudableRuleModel> dtCloudableRuleModelist = new ArrayList<DTCloudableRuleModel>();
		DTCloudableRuleModel dtCloudableRuleModel = new DTCloudableRuleModel();
		dtCloudableRuleModel.setOptionIds("1");
		dtCloudableRuleModel.setOptionTextsEN("a");
		dtCloudableRuleModel.setQuestionId(1);
		dtCloudableRuleModel.setQuestionTextEN("q1");
		dtCloudableRuleModel.setExecutionOrder(1);
		dtCloudableRuleModelist.add(dtCloudableRuleModel);
		return dtCloudableRuleModelist;
	}

	/*
	 * Get migration rule
	 */
	private DTMigrationRuleModel toGetMigrationRule(int executionOrder, int migrationId, int questionId,
			String questiontextEN, String ruleOptionIds, String optionTextEN) {

		DTMigrationRuleModel dtMigrationRuleModel = new DTMigrationRuleModel();
		dtMigrationRuleModel.setExecutionOrder(executionOrder);
		dtMigrationRuleModel.setMigrationId(migrationId);
		dtMigrationRuleModel.setQuestionId(questionId);
		dtMigrationRuleModel.setQuestiontextEN(questiontextEN);
		dtMigrationRuleModel.setRuleOptionIds(ruleOptionIds);
		dtMigrationRuleModel.setRuleOptionTextEN(optionTextEN);
		return dtMigrationRuleModel;
	}

	private DTMigration getMigrationPattern(String createdBy, Date createdTime, int evaluationOrder,
			String logicalOperator, String migrationPattern, int migrationId, String modifiedBy) {
		DTMigration dtMigration = new DTMigration();
		dtMigration.setCreatedBy(createdBy);
		dtMigration.setCreatedTtime(createdTime);
		dtMigration.setEvaluationOrder(evaluationOrder);
		dtMigration.setLogicalOperator(logicalOperator);
		dtMigration.setMigration_pattern(migrationPattern);
		dtMigration.setMigrationId(migrationId);
		dtMigration.setModifiedBy(modifiedBy);
		dtMigrationRepository.save(dtMigration);
		return dtMigration;
	}

	private DTProviderRuleModel getCloudProviderRule(int providerRuleId, int providerId, int evaluationOrder,
			int questionId, String questiontextEN, String ruleOptionIds, String ruleOptionTextEN) {
		DTProviderRuleModel dtProviderRuleModel = new DTProviderRuleModel();
		dtProviderRuleModel.setProviderRuleId(providerRuleId);
		dtProviderRuleModel.setProviderId(providerId);
		dtProviderRuleModel.setEvaluationOrder(evaluationOrder);
		dtProviderRuleModel.setQuestionId(questionId);
		dtProviderRuleModel.setQuestiontextEN(questiontextEN);
		dtProviderRuleModel.setRuleOptionIds(ruleOptionIds);
		dtProviderRuleModel.setRuleOptionTextEN(ruleOptionTextEN);
		return dtProviderRuleModel;
	}
	
	private ApplicationModel getApplicationModel() {
		ApplicationModel appLicationModel=new ApplicationModel();
		appLicationModel.setApplicationId("App1");
		appLicationModel.setApplicationName("Application1");
		appLicationModel.setApplicationDescription("To check cloudable or not");
		appLicationModel.setApplicationDepartment("vg");
		appLicationModel.setApplicationUser(1);
		appLicationModel.setDtCloudProvider("GITC");
		appLicationModel.setDtMigrationPattern("Rehost");
		appLicationModel.setPriority(5);
		appLicationModel.setReCloudProvider("AWS");
		appLicationModel.setAssessmentStage(1);
		appLicationModel.setCreatedBy("Admin");
		
		return appLicationModel;
	}

}
