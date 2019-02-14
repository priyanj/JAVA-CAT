package com.cg.jcat.api.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.cg.jcat.api.entity.Application;
import com.cg.jcat.api.entity.ApplicationStaging;
import com.cg.jcat.api.exception.ApplicationIdNotFoundException;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.repository.IApplicationStaging;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@TestPropertySource(
		 locations = "classpath:application-integrationtest.properties")
public class TestApplicationDao {
	@Autowired
	private ApplicationDao applicationdao;
	
	@Autowired
	IApplicationStaging iApplicationStaging;

	@Test
//	@Ignore
	public void tesBGetApplication() throws SystemExceptions {
		
//		ApplicationModel applicationModel = getApplicationModel();
//		assertEquals(true,applicationdao.save(applicationModel));
		assertEquals(4, applicationdao.getApplications().size());
		
	}
	
	@Test
//	@Ignore
	public void testASave() throws SystemExceptions
	{
		ApplicationModel applicationModel = getApplicationModel();
		applicationModel.setAid(101);
		applicationModel.setApplicationId("a101");
		assertEquals(true,applicationdao.save(applicationModel));
	}

	private ApplicationModel getApplicationModel() {
		ApplicationModel appLicationModel=new ApplicationModel();
		appLicationModel.setApplicationId("App1");
		appLicationModel.setApplicationName("Application1");
		appLicationModel.setApplicationDescription("To check cloudable or not");
		appLicationModel.setApplicationDepartment("vg");
		appLicationModel.setApplicationUser(1);
		appLicationModel.setDtCloudProvider("GITC");
		appLicationModel.setDtMigrationPattern("Rehost");
		appLicationModel.setPriority(5);
		appLicationModel.setReCloudProvider("AWS");
		appLicationModel.setAssessmentStage(1);
		appLicationModel.setCreatedBy("Admin");
		
		return appLicationModel;
	}
	
	@Test
//	@Ignore
	public void testCGetApplicationById() throws SystemExceptions, ApplicationIdNotFoundException
	{
		ApplicationModel applicationModel = getApplicationModel();
		applicationModel.setAid(2);
		applicationModel.setApplicationId("a2");
		assertEquals(true,applicationdao.save(applicationModel));
		assertNotNull(applicationdao.getApplications());
//		assertEquals(applicationModel.getApplicationName(),applicationModel.getApplicationName());
//		assertEquals(applicationModel.getApplicationDepartment(),applicationModel.getApplicationDepartment());
		
	}
	
	@Test
//	@Ignore
	public void testDDeleteApplicationById() throws SystemExceptions, ApplicationIdNotFoundException
	{
		ApplicationModel applicationModel = getApplicationModel();
		applicationModel.setAid(2);
		applicationModel.setApplicationId("a2");
		assertEquals(true,applicationdao.save(applicationModel));
		assertEquals(true,applicationdao.deleteApplicationById(1));
		Application application = applicationdao.findApplicationById(1);
		assertEquals(true,application.isDeleted());
		assertTrue(application.isDeleted());
	}
	
	@Test
//	@Ignore
	public void testEDeactivateApplicationById() throws SystemExceptions, ApplicationIdNotFoundException
	{
		ApplicationModel applicationModel = getApplicationModel();
//		assertEquals(true,applicationdao.save(applicationModel));
		assertEquals(true,applicationdao.deactivateApplicationById(1));
		Application application = applicationdao.findApplicationById(1);
		assertEquals(false, application.isActivate());
		assertFalse( application.isActivate());
	}
	
	@Test
	public void testUpdateApplication() throws SystemExceptions, ApplicationIdNotFoundException
	{
		ApplicationModel applicationModel = getApplicationModel();
		assertEquals(true,applicationdao.save(applicationModel));
		ApplicationModel applicationModel1 = applicationdao.getApplicationByApplicationId("App1");
		System.out.println(applicationModel1);
		applicationModel1.setApplicationId("App2");
		applicationModel1.setApplicationName("App2");
		applicationModel1.setApplicationDepartment("Application2 Description");
		System.out.println(applicationModel1);
		assertEquals(true,applicationdao.updateApplication(applicationModel1));
		
		ApplicationModel applicationModel2 = applicationdao.getApplicationByApplicationId("App2");
		assertEquals("App2",applicationModel2.getApplicationName());
		assertEquals("Application2 Description",applicationModel2.getApplicationDepartment());
		
	}
	
	@Test
	public void testZimportApplication() throws SystemExceptions
	{
		List<ApplicationStaging> applicationStagingList = getApplicationStaging();
		System.out.println(applicationStagingList);
		applicationdao.importApplication(applicationStagingList);
		assertEquals(3,iApplicationStaging.findAll().size());
		Optional<ApplicationStaging> applicationStagingOpt = iApplicationStaging.findById(3);
		ApplicationStaging applicationStaging = applicationStagingOpt.get();
		assertEquals("error",applicationStaging.getStage());
	}

	private List<ApplicationStaging> getApplicationStaging() {
		
		List<ApplicationStaging> applicationStagingList = new ArrayList<>();
		ApplicationStaging applicationStaging = new ApplicationStaging();
		ApplicationStaging applicationStaging1 = new ApplicationStaging();
		ApplicationStaging applicationStaging2 = new ApplicationStaging();
		
		applicationStaging.setApplicationId("App11");
		applicationStaging.setApplicationName("App11");
		applicationStaging.setApplicationDepartment("Dept");
		applicationStaging.setApplicationDescription("Des");
		applicationStaging.setPriority(4);
		applicationStaging.setUserName("user1");
		
		applicationStaging1.setApplicationId("App21");
		applicationStaging1.setApplicationName("App21");
		applicationStaging1.setApplicationDepartment("Dept");
		applicationStaging1.setApplicationDescription("Des");
		applicationStaging1.setPriority(1);
		applicationStaging1.setUserName("user2");
		
		
		applicationStaging2.setApplicationId("App21");
		applicationStaging2.setApplicationName("App21");
		applicationStaging2.setApplicationDepartment("Dept");
		applicationStaging2.setApplicationDescription("Des");
		applicationStaging2.setPriority(1);
		applicationStaging2.setUserName("user3");
		applicationStagingList.add(applicationStaging);
		applicationStagingList.add(applicationStaging1);
		applicationStagingList.add(applicationStaging2);
		
		return applicationStagingList;
	}

}
