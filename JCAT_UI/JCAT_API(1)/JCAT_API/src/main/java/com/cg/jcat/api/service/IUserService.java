package com.cg.jcat.api.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.cg.jcat.api.dao.UserModel;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.exception.UserAlreadyExistsException;

@Service
public interface IUserService {

	public List<UserModel> getUsers();

	public boolean saveUser(UserModel user, String createdBy) throws UserAlreadyExistsException, SystemExceptions;

	public boolean updateUsers(UserModel user, String modifiedBy);

	public boolean deleteById(int userId) throws JcatExceptions;

	public UserModel login(String username, String password);
}
