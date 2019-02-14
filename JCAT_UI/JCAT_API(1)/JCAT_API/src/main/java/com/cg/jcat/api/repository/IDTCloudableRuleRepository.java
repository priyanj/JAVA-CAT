package com.cg.jcat.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.jcat.api.entity.DTCloudableRule;

@Repository
public interface IDTCloudableRuleRepository extends JpaRepository<DTCloudableRule, Integer> {

	public DTCloudableRule findByCloudableRuleId(int cloudableRuleId);

}
