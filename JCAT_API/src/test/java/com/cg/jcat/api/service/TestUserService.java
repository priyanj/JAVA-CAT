package com.cg.jcat.api.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
//import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

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

import com.cg.jcat.api.dao.UserDao;
import com.cg.jcat.api.dao.UserModel;
import com.cg.jcat.api.exception.JcatExceptions;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestUserService {

	@Autowired
	private UserService userService;

	@MockBean
	private UserDao userDao;

	@Test
	public void testGetUsers() throws JcatExceptions {
		UserModel userModel = getModel();
		List<UserModel> userModelList = new ArrayList<UserModel>();
		userModelList.add(userModel);
		Mockito.when(userDao.getUsers()).thenReturn(userModelList);
		assertNotNull(userService.getUsers());
		assertThat(userService.getUsers()).isEqualTo(userModelList);
	}

	@Test
	public void testSaveUser() throws JcatExceptions {
		UserModel userModel = getModel();
		Mockito.when(userDao.createUser(userModel, "admin")).thenReturn(true);
		assertEquals(true, userService.saveUser(userModel, "admin"));

	}

	@Test
	public void testUpdateUsers() throws JcatExceptions {
		UserModel userModel = getModel();

		userModel.setCompany("cg");
		Mockito.when(userDao.updateUsers(userModel, "admin")).thenReturn(true);
		assertEquals(true, userService.updateUsers(userModel, "admin"));
	}

	@Test
	public void testDeleteUser() throws JcatExceptions {
		UserModel userModel = getModel();
		Mockito.when(userDao.deleteById(1)).thenReturn(true);
		assertTrue(userService.deleteById(userModel.getUserId()));
	}

	private UserModel getModel() {

		UserModel userModel = new UserModel();
		userModel.setUserId(1);
		userModel.setFirstName("Hari");
		userModel.setLastName("ram");
		userModel.setUsername("sam");
		userModel.setUserEmail("abcdef@gmail.com");
		userModel.setCompany("byarclay");
		//userModel.setAdmin(true);
		userModel.setPassword("mnbv@123");
		return userModel;
	}

}
