package com.cg.jcat.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.jcat.api.entity.DTMigration;
import com.cg.jcat.api.entity.DTMigrationRule;

public interface IDTMigrationRuleRepository extends JpaRepository<DTMigrationRule, Integer>{

	List<DTMigrationRule> findByDtMigration(Optional<DTMigration> findById);

	DTMigrationRule findByMigrationRuleId(int migrationRuleId);

}
