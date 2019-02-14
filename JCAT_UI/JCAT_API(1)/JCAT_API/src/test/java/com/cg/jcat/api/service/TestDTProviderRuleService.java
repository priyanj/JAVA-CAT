package com.cg.jcat.api.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.cg.jcat.api.dao.DTProviderRuleDao;
import com.cg.jcat.api.dao.DTProviderRuleModel;
import com.cg.jcat.api.dao.DTProvidersModel;
import com.cg.jcat.api.exception.CountMissMatchException;
import com.cg.jcat.api.exception.OptionTextNotNullException;
import com.cg.jcat.api.exception.SystemExceptions;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestDTProviderRuleService {

	@Autowired
	private DTProviderRuleService providerRuleService;

	@MockBean
	private DTProviderRuleDao dtCloudProviderDao;

	@Test
	public void testGetCloudProvider() {
		DTProvidersModel providerModel = getprovidersModel();
		List<DTProvidersModel> providerModelList = new ArrayList<DTProvidersModel>();
		providerModelList.add(providerModel);

		Mockito.when(dtCloudProviderDao.getCloudProvider()).thenReturn(providerModelList);

		assertNotNull(providerRuleService.getCloudProvider());
		assertThat(providerRuleService.getCloudProvider()).isEqualTo(providerModelList);
	}

	@Test
	public void testGetCloudProviderRules() {
		List<DTProviderRuleModel> cloudProviderRuleModelList = new ArrayList<>();
		DTProviderRuleModel providerRuleModel = getRuleModel2();
		cloudProviderRuleModelList.add(providerRuleModel);

		Mockito.when(dtCloudProviderDao.getCloudProviderRules(1)).thenReturn(cloudProviderRuleModelList);

		assertNotNull(providerRuleService.getCloudProvider());
		assertThat(providerRuleService.getCloudProviderRules(1)).isEqualTo(cloudProviderRuleModelList);

	}

	private DTProvidersModel getprovidersModel() {
		DTProvidersModel cloudProvidersModel = new DTProvidersModel();
		cloudProvidersModel.setProviderId(1);
		cloudProvidersModel.setEvaluationOrder(2);
		cloudProvidersModel.setProviderName("public");
		return cloudProvidersModel;
	}

	private DTProviderRuleModel getRuleModel1() {
		DTProviderRuleModel cloudProviderRuleModel = new DTProviderRuleModel();
		cloudProviderRuleModel.setProviderId(1);
		cloudProviderRuleModel.setProviderRuleId(1);
		cloudProviderRuleModel.setQuestionId(1);
		cloudProviderRuleModel.setEvaluationOrder(1);
		cloudProviderRuleModel.setQuestiontextEN("question1");
		cloudProviderRuleModel.setRuleOptionIds("1,2,3");
		cloudProviderRuleModel.setRuleOptionTextEN("ans1,ans2,ans3");
		return cloudProviderRuleModel;
	}

	private DTProviderRuleModel getRuleModel2() {

		DTProviderRuleModel cloudProviderRuleModel = new DTProviderRuleModel();
		cloudProviderRuleModel.setProviderId(2);
		cloudProviderRuleModel.setProviderRuleId(1);
		cloudProviderRuleModel.setQuestionId(1);
		cloudProviderRuleModel.setEvaluationOrder(1);
		cloudProviderRuleModel.setQuestiontextEN("question1");
		cloudProviderRuleModel.setRuleOptionIds("1,2,3,5,5");
		cloudProviderRuleModel.setRuleOptionTextEN("ans1,ans2,ans3");
		return cloudProviderRuleModel;
	}

	@Test
	public void testSaveCloudProviderRule() {
		List<DTProviderRuleModel> cloudProviderRuleModelList = new ArrayList<>();
		DTProviderRuleModel providerRuleModel = getRuleModel2();
		cloudProviderRuleModelList.add(providerRuleModel);
		try {
			assertEquals(false, providerRuleService.saveCloudProviderRule(cloudProviderRuleModelList));
		} catch (SystemExceptions e) {
			System.out.println("SystemExceptions");
		} catch (OptionTextNotNullException e) {
			System.out.println("OptionTextNotNullException");
		} catch (CountMissMatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
