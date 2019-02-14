package com.cg.jcat.api.exception;

import java.util.Date;

import com.cg.jcat.api.exception.entity.ErrorDTO;

public class SystemExceptions extends JcatExceptions {

	private static String error_code = "SE200";
	private static String error_message = "System Error has occured, contact to support team";
	private static Date error_timestamp = new Date();
	private static String error_details;

	public SystemExceptions() {
		super();

	}

	public SystemExceptions(String error_value) {
		super(new ErrorDTO(error_code, error_message, error_value, error_timestamp, error_details));

	}

}
