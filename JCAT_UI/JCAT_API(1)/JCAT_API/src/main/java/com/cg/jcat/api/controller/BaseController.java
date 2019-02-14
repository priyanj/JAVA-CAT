package com.cg.jcat.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.cg.jcat.api.service.IBaseService;

@Component
public class BaseController implements IBaseController{
	
	@Autowired
	IBaseService dtoService;

}
