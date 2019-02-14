package com.cg.jcat.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.jcat.api.entity.DTMigration;

public interface IDTMigrationRepository  extends JpaRepository<DTMigration, Integer>{

	DTMigration findByMigrationId(int migrationId);

}
