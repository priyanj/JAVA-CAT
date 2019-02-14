package com.cg.jcat.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.cg.jcat.api.csvimport.CsvDataLoader;
import com.cg.jcat.api.dao.ApplicationModel;
import com.cg.jcat.api.entity.ApplicationStaging;
import com.cg.jcat.api.exception.ApplicationIdNotFoundException;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.service.IApplicationService;

@Component
public class ApplicationController implements IApplicationController {

	private static final Logger logger = LoggerFactory.getLogger(ApplicationController.class);

	@Autowired
	CsvDataLoader csvDataLoader;

	@Autowired
	private IApplicationService applicationService;

	@Override
	public List<ApplicationModel> getApplications() throws SystemExceptions {
		try {
			return applicationService.getApplications();
		} catch (Exception e) {
			System.out.println(e);
			logger.error("Applications Not available ", e.getMessage());
			throw new SystemExceptions("getApplications()");
		}
	}

	@Override
	public boolean save(ApplicationModel application) throws SystemExceptions {
		return applicationService.save(application);
	}

	@Override
	public ApplicationModel getApplicationByApplicationId(String applicationId) throws ApplicationIdNotFoundException {

		return applicationService.getApplicationByApplicationId(applicationId);
	}

	@Override
	public boolean deleteApplicationById(int aid) throws ApplicationIdNotFoundException, SystemExceptions {

		return applicationService.deleteApplicationById(aid);
	}

	@Override
	public boolean deactivateApplicationById(int aid) throws ApplicationIdNotFoundException, SystemExceptions {

		return applicationService.deactivateApplicationById(aid);
	}

	@Override
	public boolean updateApplication(ApplicationModel application)
			throws ApplicationIdNotFoundException, SystemExceptions {

		return applicationService.updateApplication(application);
	}

	@Override
	public void importApplication(MultipartFile file) throws SystemExceptions {

		List<ApplicationStaging> applicationStaging = csvDataLoader.loadObjectList(ApplicationStaging.class, file);
		applicationService.importApplication(applicationStaging);

	}
}
