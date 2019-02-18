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
import com.cg.jcat.api.dao.DTProviderRuleModel;
import com.cg.jcat.api.dao.DTProvidersModel;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/cloudProvider")
public interface IDTProviderRuleController {

	@GetMapping("/getAll")
	public List<DTProvidersModel> getCloudProvider() throws SystemExceptions;

	@GetMapping("/getAllRules/{providerId}")
	public List<DTProviderRuleModel> getCloudProviderRules(@PathVariable int providerId);

	@PostMapping("/create")
	public boolean saveCloudProviderRule(@RequestBody List<DTProviderRuleModel> cloudProviderRuleModelList)
			throws SystemExceptions, OptionTextNotNullException, CountMissMatchException;
	
	@GetMapping("/get/questions")
	public List<AssessmentQuestionModel> getProviderQuestions() throws SystemExceptions;

}
