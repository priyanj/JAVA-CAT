package com.cg.jcat.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.jcat.api.dao.DTMigrationModel;
import com.cg.jcat.api.dao.DTMigrationRuleModel;
import com.cg.jcat.api.exception.SystemExceptions;

@RestController
@RequestMapping("/migration")
public interface IDTMigrationRuleController {

	@GetMapping("/get/rule/{migrationId}")
	public List<DTMigrationRuleModel> getMigrationRule(@PathVariable int migrationId);

	@PostMapping("/create/rule")
	public void saveMigrationRule(@RequestBody List<DTMigrationRuleModel> dtMigrationRuleModel) throws SystemExceptions;

	@GetMapping("/get/pattern")
	public List<DTMigrationModel> getMigration();

}
