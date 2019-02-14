package com.cg.jcat.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.jcat.api.dao.BaseDao;

@Component
public class BaseService implements IBaseService {

	@Autowired
	BaseDao dtoDao;

}
