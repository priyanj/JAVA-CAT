package com.cg.jcat.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.dao.DTCloudableRuleModel;
import com.cg.jcat.api.exception.SystemExceptions;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/dtcloudableRule")
public interface IDTCloudableRuleController {

	@GetMapping("/getAll")
	public List<DTCloudableRuleModel> getCloudableRule() throws SystemExceptions;
	
	@GetMapping("/getCloudableQuestion")
	public List<AssessmentQuestionModel> getCloudableQuestions();

	@GetMapping("/get/{cloudableRuleId}")
	public DTCloudableRuleModel getCloudableRuleById(@PathVariable int cloudableRuleId);

	@PostMapping("/create")
	public boolean saveCloudableRule(@RequestBody List<DTCloudableRuleModel> dTCloudableRuleModelList)
			throws SystemExceptions;

}
