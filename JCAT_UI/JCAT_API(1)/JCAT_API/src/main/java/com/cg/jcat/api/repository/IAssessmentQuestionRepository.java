package com.cg.jcat.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.entity.AssessmentQuestion;

public interface IAssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Integer>{

//	AssessmentQuestion findById(int questionId);
	
	AssessmentQuestion findByQuestionTextEN(String questionDescriptionEN);

	List<AssessmentQuestion> findByIsDeleted(boolean isDeleteValue);

	AssessmentQuestion findByQuestionId(int questionId);


}
