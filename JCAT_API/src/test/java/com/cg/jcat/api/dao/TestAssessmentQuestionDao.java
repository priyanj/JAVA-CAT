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

import com.cg.jcat.api.entity.AssessmentQuestion;
import com.cg.jcat.api.repository.IAssessmentQuestionRepository;
import com.cg.jcat.api.utility.QuestionTypeEnum;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestAssessmentQuestionDao {

	@Autowired
	AssessmentQuestionDao assessmentQuestionDao;

	@Autowired
	IAssessmentQuestionRepository assessmentQuestionRepository;

	@Test
	public void testSaveQuestions() {
		boolean result = true;
		result = assessmentQuestionDao.saveQuestions(getAssessmentQuestions());
		assertEquals(true, result);
	}

	@Test
	@Ignore
	public void testGetQuestions() {
		boolean result = true;
		result = assessmentQuestionDao.saveQuestions(getAssessmentQuestions());
		assertEquals(true, result);
		assertNotNull(assessmentQuestionDao.getQuestions());
	}

	@Test
	public void testDeleteQuestionById() {
		assessmentQuestionDao.deleteAssessmentQuestionById(1);
		AssessmentQuestion assessmentQuestion = assessmentQuestionDao.findByQuestionId(1);
		assertEquals(true, assessmentQuestion.isDeleted());

	}

	@Test
	public void updateQuestions() {

		AssessmentQuestionModel assessmentQuestionModel = getAssessmentQuestions();
		assessmentQuestionDao.saveQuestions(assessmentQuestionModel);
		assessmentQuestionModel.setDisplayOrder(3);
		// updating display order
		assessmentQuestionDao.updateQuestions(assessmentQuestionModel);
		AssessmentQuestion assessmentQuestion = assessmentQuestionDao.findByQuestionId(1);
		assertEquals(assessmentQuestionModel.getDisplayOrder(), assessmentQuestion.getDisplayOrder());

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
		questionOptionModel.setOptionTextLang2("ä ö ü ß Ä Ö Ü");
		list.add(questionOptionModel);
		return list;
	}
}
