package com.cg.jcat.api.entity;

import java.util.Date;

import com.cg.jcat.api.exception.JcatExceptions;
import com.cg.jcat.api.exception.entity.ErrorDTO;

public class ValidationException extends JcatExceptions {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static String error_code = "VE102";
	private static String error_message = "Validation faild";
	private static Date error_timestamp = new Date();
	private static String error_details;

	public ValidationException() {
		super();
	}

	public ValidationException(String error_value) {
		super(new ErrorDTO(error_code, error_message, error_value, error_timestamp, error_details));

	}

}
