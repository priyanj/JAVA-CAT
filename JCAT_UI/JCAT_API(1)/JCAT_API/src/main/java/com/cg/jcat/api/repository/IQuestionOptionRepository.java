package com.cg.jcat.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.jcat.api.entity.QuestionOption;

public interface IQuestionOptionRepository extends JpaRepository<QuestionOption, Integer>{

	QuestionOption findByOptionId(int optionId);
	QuestionOption findByOptionTextEN(String optionTextEN);
}
