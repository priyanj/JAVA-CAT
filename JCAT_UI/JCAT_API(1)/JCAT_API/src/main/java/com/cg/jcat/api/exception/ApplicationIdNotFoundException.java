package com.cg.jcat.api.exception;

import java.util.Date;

import com.cg.jcat.api.exception.entity.ErrorDTO;

public class ApplicationIdNotFoundException extends JcatExceptions {

	private static String error_code = "UE102";
	private static String error_message = "Application ID does not exists in DB!";
	private static Date error_timestamp = new Date();
	private static String error_details;

	public ApplicationIdNotFoundException() {
		super();
	}

	public ApplicationIdNotFoundException(String error_value) {
		super(new ErrorDTO(error_code, error_message, error_value, error_timestamp, error_details));

	}

}
