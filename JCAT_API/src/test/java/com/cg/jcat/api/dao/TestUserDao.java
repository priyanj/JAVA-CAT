package com.cg.jcat.api.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.cg.jcat.api.entity.User;
import com.cg.jcat.api.exception.JcatExceptions;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TestUserDao {

	@Autowired
	private UserDao userDao;

	@Test
	// @Ignore
	public void testAsaveUser() throws JcatExceptions {

		boolean value = userDao.saveUser(getUserModel());
		assertEquals(true, value);

		// UserModel found = userDao.findByUsername(userModel.getUsername());
		// assertNotNull(found);
		//
		// assertThat(found.getFirstName()).isEqualTo(userModel.getFirstName());
		// assertThat(found.getUserEmail()).isEqualTo(userModel.getUserEmail());
	}

	@Test
	// @Ignore
	public void testBgetUsers() {
		assertEquals(1, userDao.getUsers().size());
	}

	@Test
	// @Ignore
	public void testDdeleteById() throws JcatExceptions {
		userDao.deleteById(1);
		User user = userDao.findByUserId(1);
		System.out.println(user);
		assertEquals(true, user.isDeleted());
	}

	@Test
	public void testCLogin() {
		User user = userDao.findByUserId(1);
		UserModel userModel = userDao.login(user.getUsername(), user.getPassword());
		assertNotNull(userModel);
		assertEquals(getUserModel().getUsername(), userModel.getUsername());

		userModel = userDao.login("wrong user", "wrong password");
		assertNull(userModel);
	}

	/*
	 * @Test // @Ignore public void testCupdateUsers() {
	 * 
	 * UserModel userModel = new UserModel(); userModel.setUserId(1);
	 * userModel.setFirstName("Hari"); userModel.setLastName("ram");
	 * userModel.setUsername("sam4"); userModel.setUserEmail("abcdef@gmail.com");
	 * userModel.setCompany("byarclay"); userModel.setAdmin(true);
	 * userModel.setPassword("mnbv@123"); userDao.createUser(userModel,"Admin");
	 * 
	 * // updating email userModel.setUserEmail("dummyuser@cg.com"); //
	 * userDao.updateUsers(userModel,"alok");
	 * 
	 * // User user = userDao.findByUserId(1); assertEquals(true,
	 * userDao.updateUsers(userModel,"alok"));
	 * 
	 * }
	 */

	private UserModel getUserModel() {
		UserModel userModel = new UserModel();
		userModel.setFirstName("Hari");
		userModel.setLastName("ram");
		userModel.setUsername("samfasdjdgfas");
		userModel.setUserEmail("abc@gmail.com");
		userModel.setCompany("goldman");
		//userModel.setAdmin(true);
		userModel.setPassword("asd@123");
		userModel.setCreatedBy("Admin");
		return userModel;
	}

}
