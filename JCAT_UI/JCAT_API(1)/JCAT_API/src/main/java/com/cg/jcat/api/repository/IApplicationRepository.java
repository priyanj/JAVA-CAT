package com.cg.jcat.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.jcat.api.entity.Application;

@Repository
public interface IApplicationRepository extends JpaRepository<Application, Integer> {
	Application findByApplicationId(String applicationId);

	List<Application> findAllByIsActivateAndIsDeletedOrderByApplicationName(boolean isActivate, boolean isDeleted);

	List<Application> findAllByIsActivateOrderByApplicationName(boolean isActivate);

	Application findByAid(int applicationId);

}
