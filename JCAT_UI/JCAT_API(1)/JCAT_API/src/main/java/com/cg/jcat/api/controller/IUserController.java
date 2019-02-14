package com.cg.jcat.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cg.jcat.api.dao.UserModel;
import com.cg.jcat.api.entity.ValidationException;
import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.SystemExceptions;
import com.cg.jcat.api.exception.UserAlreadyExistsException;
import org.springframework.validation.Errors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/")
public interface IUserController {

	@GetMapping("user/getAll")
	public List<UserModel> getUsers() throws SystemExceptions;

	@PostMapping("user/create/{createdBy}")
	public boolean saveUser(@PathVariable String createdBy, @Valid @RequestBody UserModel users, Errors error)
			throws ValidationException, SystemExceptions, UserAlreadyExistsException;

	@PutMapping("user/update/{modifiedBy}")
	public boolean updateUserId(@PathVariable String modifiedBy, @RequestBody UserModel user)
			throws SystemExceptions, UserAlreadyExistsException;

	@DeleteMapping("user/delete/{userId}")
	public void deleteById(@PathVariable int userId) throws JcatExceptions;

	@GetMapping("login/{username}/{password}")
	public UserModel login(@PathVariable String username, @PathVariable String password);

}
