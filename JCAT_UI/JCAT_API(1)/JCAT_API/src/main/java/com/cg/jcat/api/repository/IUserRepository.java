package com.cg.jcat.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.jcat.api.entity.User;

public interface IUserRepository extends JpaRepository<User, Integer>{

	User findByUserId(int userId);

	User findByIsDeleted(boolean b);

	User findByUsername(String string);

	User findByUsernameAndPassword(String username, String password);

}
