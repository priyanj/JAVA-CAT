package com.cg.jcat.api.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.cg.jcat.api.exception.SystemExceptions;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestAssessmentDao {

	@Autowired
	AssessmentDao assessmentDao;

	@Autowired
	AssessmentQuestionDao assessmentQuestionDao;

	@Test
	public void getAnswers() {

		assertNotNull(assessmentDao.getAnswers(1,0)); //**** changes
	}

	@Test
	public void testSaveAnswers() throws SystemExceptions {
		boolean result = false;
		
		/*
		 * int answerId, int ApplicationId, boolean dtCloudableRuleResult,
		 * boolean dtMigrationRuleResult, boolean dtProviderRuleResult, String modifiedBy, 
		 * String optionIds, String optionTextsEN, int questionId, String questionTextEn
		 * */

		List<AnswerModel> answerModels = new ArrayList<>();
		answerModels.add(getAnswerModel(1,1,true,true,true,"Admin","1,2,3","a,b,c",1,"q1"));
		answerModels.add(getAnswerModel(2,1,true,true,true,"Admin","1,2","a,b",1,"q1"));
		answerModels.add(getAnswerModel(3,1,true,true,true,"Admin","1","a",1,"q1"));
		result = assessmentDao.saveAnswers(answerModels, 1);
		assertTrue(result);
		assertEquals(3, assessmentDao.getAnswers(1,0).size()); //****
		assertEquals(0, assessmentDao.getAnswerHistory().size());
		
		List<AnswerModel> answerModels1 = new ArrayList<>();
		answerModels1.add(getAnswerModel(2,1,true,true,true,"Admin","1,2","a,b",1,"q1"));
		answerModels1.add(getAnswerModel(3,1,true,true,true,"Admin","1","a",1,"q1"));
		result = assessmentDao.saveAnswers(answerModels1, 1);
		assertTrue(result);
		assertEquals(2, assessmentDao.getAnswers(1,0).size()); //****
		assertEquals(1, assessmentDao.getAnswerHistory().size()); //delete one answer from answers
		
		List<AnswerModel> answerModels2 = new ArrayList<>();
		answerModels2.add(getAnswerModel(2,1,true,true,true,"Admin","1,2,3","a,b",1,"q1"));
		answerModels2.add(getAnswerModel(3,1,true,true,true,"Admin","1,2","a",1,"q1"));
		result = assessmentDao.saveAnswers(answerModels2, 1);
		assertTrue(result);
		assertEquals(2, assessmentDao.getAnswers(1,0).size()); //****
		assertEquals(3, assessmentDao.getAnswerHistory().size()); //modified all answers

	}

	private AnswerModel getAnswerModel(int answerId, int ApplicationId, boolean dtCloudableRuleResult,
			boolean dtMigrationRuleResult, boolean dtProviderRuleResult, String modifiedBy, 
			String optionIds, String optionTextsEN, int questionId, String questionTextEn) {
		AnswerModel answerModel = new AnswerModel();
		answerModel.setAnswerId(answerId);
		answerModel.setApplicationId(ApplicationId);
		answerModel.setDtCloudableRuleResult(dtCloudableRuleResult);
		answerModel.setDtMigrationRuleResult(dtMigrationRuleResult);
		answerModel.setDtProviderRuleResult(dtProviderRuleResult);
		answerModel.setModifiedBy(modifiedBy);
		answerModel.setOptionIds(optionIds);
		answerModel.setOptionTextsEN(optionTextsEN);
		answerModel.setQuestionId(questionId);
		answerModel.setQuestionTextEN(questionTextEn);

		return answerModel;
	}

}
