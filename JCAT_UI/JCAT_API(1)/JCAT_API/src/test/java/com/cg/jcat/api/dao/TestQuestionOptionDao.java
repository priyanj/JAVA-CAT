package com.cg.jcat.api.dao;

import static org.junit.Assert.*;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.cg.jcat.api.entity.QuestionOption;

import ch.qos.logback.core.net.SyslogOutputStream;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestQuestionOptionDao {

	@Autowired
	QuestionOptionDao questionOptionDao;

	@Test
	public void testASaveQuestionOption() {
		QuestionOptionModel questionOption = toGetQuestionOption();
		assertEquals(true, questionOptionDao.saveQuestionOption(questionOption));
	}

	@Test
	public void getBQuestionOption() {

		QuestionOptionModel questionOption = toGetQuestionOption();
		questionOptionDao.saveQuestionOption(questionOption);
		QuestionOption found = questionOptionDao.findByOptionTextEN(questionOption.getOptionTextEN());
		assertEquals(found.getOptionTextEN(), questionOption.getOptionTextEN());
	}

	@Test
	public void getCUpdateQuestionOption() {
		QuestionOptionModel questionOption = toGetQuestionOption();
		questionOption.setOptionTextEN("updated text");
		questionOptionDao.updateQuestionOption(questionOption);
		QuestionOption found = questionOptionDao.findByOptionTextEN(questionOption.getOptionTextEN());
		found.setOptionTextEN("updated text");

		assertEquals("updated text", found.getOptionTextEN());
	}

	private QuestionOptionModel toGetQuestionOption() {

		QuestionOptionModel questionOption = new QuestionOptionModel();
		questionOption.setOptionId(3);
		questionOption.setOptionTextEN("text1");
		questionOption.setOptionTextLang2("lang1");
		return questionOption;
	}

}
