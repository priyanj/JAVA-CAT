package com.cg.jcat.api.exception;

import java.util.Date;

import org.springframework.web.context.request.WebRequest;

import com.cg.jcat.api.exception.entity.ErrorDTO;

public class UserAlreadyExistsException extends JcatExceptions {

	private static String error_code = "UE100";
	private static String error_message = "User already present in DB";
	private static Date error_timestamp = new Date();
	private static String error_details;

	public UserAlreadyExistsException() {
		super();
	}

	public UserAlreadyExistsException(String error_value) {
		super(new ErrorDTO(error_code, error_message, error_value, error_timestamp, error_details));
		// super(error_message+" "+error_value);
	}

}
