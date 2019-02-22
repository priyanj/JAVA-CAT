package com.cg.jcat.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cg.jcat.api.dao.AnswerModel;
import com.cg.jcat.api.exception.ApplicationIdNotFoundException;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/assessment")
public interface IAssessmentController {

	@GetMapping("answer/get/{applicationId}")
	public List<AnswerModel> getAnswers(@PathVariable int applicationId);
	
	@GetMapping("answer/get/{applicationId}/{assessmentStage}")
	public List<AnswerModel> getAnswers(@PathVariable int applicationId, int assessmentStage);
	
	@PostMapping("answer/create/{applicationId}")
	public boolean saveAnswers(@RequestBody List<AnswerModel> answerModels, @PathVariable int applicationId)
			throws SystemExceptions, OptionTextNotNullException, CountMissMatchException;
	

	@PostMapping("finalize/{applicationId}/{assessmentStage}")
	public void finalized(@RequestBody List<AnswerModel> answerModels, @PathVariable int applicationId,
			@PathVariable int assessmentStage) throws SystemExceptions, OptionTextNotNullException,
			ApplicationIdNotFoundException, CountMissMatchException;

}
