package com.cg.jcat.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.jcat.api.entity.DTCloudableRuleHistory;

@Repository
public interface IDTCloudableRuleHistoryRepository extends JpaRepository<DTCloudableRuleHistory, Integer>{

}
