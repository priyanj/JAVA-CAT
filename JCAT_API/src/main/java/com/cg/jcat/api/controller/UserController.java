package com.cg.jcat.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.cg.jcat.api.dao.UserModel;
import com.cg.jcat.api.entity.ValidationException;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.exception.UserAlreadyExistsException;
import com.cg.jcat.api.service.IUserService;
@Component
@Scope("session")
public class UserController implements IUserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private IUserService userService;

	@Override
	public List<UserModel> getUsers() throws SystemExceptions {
		try {
			return userService.getUsers();
		} catch (Exception e) {
			logger.error("Error in getting all users: getUsers()", e);
			throw new SystemExceptions("getUsers()");

		}
	}

	@Override
	public boolean saveUser(String createdBy, UserModel user, Errors error)
			throws UserAlreadyExistsException, SystemExceptions, ValidationException {
		boolean value = false;
		if (error.hasErrors()) {
			StringBuffer strErr = new StringBuffer();
			for (ObjectError err : error.getAllErrors()) {
				FieldError fieldErr = (FieldError) err;
				strErr.append(" " + fieldErr.getObjectName() + "." + fieldErr.getField() + " " + err.getDefaultMessage()
						+ ",");
			}
			if (strErr.length() > 0) {
				strErr.setLength(strErr.length() - 1);
			}
			throw new ValidationException(
					"There are " + error.getErrorCount() + " validation error/s:" + strErr.toString());
		}

		try {
			value = userService.saveUser(user, createdBy);
			return value;
		} catch (JcatExceptions e) {
			logger.error("Error while saving user " + user.getUsername(), e);
			throw e;
		}

	}

	@Override
	public boolean updateUserId(String modifiedBy, UserModel user){
		boolean value = false;
		value = userService.updateUsers(user, modifiedBy);
		return value;
	}

	@Override
	public void deleteById(int userId) throws JcatExceptions {
		try {
			if (userId != 0) {
				userService.deleteById(userId);
			}
		} catch (JcatExceptions e) {
			logger.error("Error while deleting user " + userId + " ErrorMessage :" + e.getMessage(), e);
			throw e;
		}
	}

	@Override
	public UserModel login(String username, String password) {
		return userService.login(username, password);
	}
	
	

}
