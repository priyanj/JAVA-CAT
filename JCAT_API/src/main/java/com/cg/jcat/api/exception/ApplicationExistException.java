package com.cg.jcat.api.exception;

import java.util.Date;

import com.cg.jcat.api.exception.entity.ErrorDTO;

public class ApplicationExistException extends JcatExceptions {

	private static String error_code = "UE102";
	private static String error_message = "Application ID already exists in DB!";
	private static Date error_timestamp = new Date();
	private static String error_details;

	public ApplicationExistException() {
		super();
	}

	public ApplicationExistException(String error_value) {
		super(new ErrorDTO(error_code, error_message, error_value, error_timestamp, error_details));

	}

}
