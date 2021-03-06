package com.cg.jcat.api.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTCloudableRuleModel;
import com.cg.jcat.api.entity.AssessmentQuestion;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.utility.QuestionTypeEnum;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/assessmentQuestion")
public interface IAssessmentQuestionController {

	@GetMapping("/getCloudableQuestion")
	public List<AssessmentQuestionModel> getCloudableQuestions();
	
	@GetMapping("/getAll")
	public List<AssessmentQuestion> getQuestions();

	@GetMapping("/get/question/{questionId}")
	public AssessmentQuestionModel getQuestionById(@PathVariable int questionId);
	
	@GetMapping(value = "/getQuestionType",produces = {MediaType.APPLICATION_JSON_VALUE})
	public List<QuestionTypeEnum> getQuestionType(); 

	@PostMapping("/createQuestion")
	public void saveQuestions(@RequestBody AssessmentQuestionModel question);

	@PutMapping("/updateQuestion")
	public void updateQuestion(@RequestBody AssessmentQuestionModel question);

	@DeleteMapping("/deleteQuestion/{questionId}")
	public void deleteQuestion(@PathVariable int questionId);
	
	@GetMapping("/getPatternAndProviderQuestions")
	public List<AssessmentQuestionModel> getPatternAndProviderQuestions();

}
