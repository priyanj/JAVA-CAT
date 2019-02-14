package com.cg.jcat.api.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.dao.UserDao;
import com.cg.jcat.api.dao.UserModel;
import com.cg.jcat.api.entity.User;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.exception.UserAlreadyExistsException;

@Component
public class UserService implements IUserService {

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	@Autowired
	private UserDao userDao;

	@Override
	public List<UserModel> getUsers() {
		List<UserModel> users = userDao.getUsers();
		logger.info("Retrieved " + users.size() + " users from DB!");
		return users;
	}

	@Override
	public boolean saveUser(UserModel user, String createdBy) throws UserAlreadyExistsException, SystemExceptions {
		boolean isSaved = false;
		User existingUser = userDao.findByUsername(user.getUsername());
		if (existingUser != null) {
			logger.error("Error user already present in DB! with name " + user.getUsername());
			throw new UserAlreadyExistsException(user.getUsername());
		}
		try {

			isSaved = userDao.createUser(user, createdBy);
		} catch (Exception e) {
			logger.error("Error while saving user " + user.getUsername() + " ErrorMessage: " + e.getMessage(), e);
			throw new SystemExceptions("Error in service saveUser():" + e.getMessage());
		}

		logger.info("User " + user.getUsername() + " successfully saved in DB!" + isSaved);
		return isSaved;
	}

	@Override
	public boolean updateUsers(UserModel user, String modifiedBy) {
		User existingUser = userDao.findByUsername(user.getUsername());
		boolean isUpdated = false;
		if (existingUser != null) {
			isUpdated = userDao.updateUsers(user, modifiedBy);
		} else {
			logger.info("Error in updating user with username '" + user.getUsername() + "' result is " + isUpdated);
		}

		return isUpdated;
	}

	@Override
	public boolean deleteById(int userId) throws JcatExceptions {
		boolean isDeleted = userDao.deleteById(userId);
		logger.info("User " + userId + " successfully deleted from DB!" + isDeleted);
		return isDeleted;
	}

	@Override
	public UserModel login(String username, String password) {
		UserModel user = userDao.login(username, password);
		if (user != null) {
			return user;
		} else {
			return null;
		}

	}

}
