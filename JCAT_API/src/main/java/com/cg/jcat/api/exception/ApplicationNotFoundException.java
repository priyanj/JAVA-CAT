package com.cg.jcat.api.exception;

import java.util.Date;

import com.cg.jcat.api.exception.entity.ErrorDTO;

public class ApplicationNotFoundException extends JcatExceptions {

	private static String error_code = "AE100";
	private static String error_message = "Application not found";
	private static Date error_timestamp = new Date();
	private static String error_details;

	public ApplicationNotFoundException() {
		super();
	}

	public ApplicationNotFoundException(String error_value) {
		super(new ErrorDTO(error_code, error_message, error_value, error_timestamp, error_details));
		// super(error_message+" "+error_value);
	}
}
