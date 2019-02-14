package com.cg.jcat.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.jcat.api.dao.QuestionOptionModel;

@RestController
@RequestMapping("/questionOption")
public interface IQuestionOptionController {

	@GetMapping("/getAll")
	public List<QuestionOptionModel> getQuestionOptions();

	@PostMapping("/create")
	public void saveQuestionOption(@RequestBody QuestionOptionModel questionOptionModel);

	@PutMapping("/update")
	public void updateQuestionOption(@RequestBody QuestionOptionModel questionOptionModel);

}
