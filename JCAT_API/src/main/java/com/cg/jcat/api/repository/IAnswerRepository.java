package com.cg.jcat.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.jcat.api.entity.Answer;

@Repository
public interface IAnswerRepository extends JpaRepository<Answer, Integer>{

	Answer findByAnswerId(int answerId);

	List<Answer> findByApplicationId(int aid);



}
