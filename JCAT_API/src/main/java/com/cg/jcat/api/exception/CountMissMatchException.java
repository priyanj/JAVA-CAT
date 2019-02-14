package com.cg.jcat.api.exception;

import java.util.Date;

import com.cg.jcat.api.exception.entity.ErrorDTO;

public class CountMissMatchException extends JcatExceptions {

	private static String error_code = "OPE101";
	private static String error_message = "Number of options and number of option text should be same";
	private static Date error_timestamp = new Date();
	private static String error_details;

	public CountMissMatchException() {
		super();
	}

	public CountMissMatchException(String error_value) {
		super(new ErrorDTO(error_code, error_message, error_value, error_timestamp, error_details));
	}

}
