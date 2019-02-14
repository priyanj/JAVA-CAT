package com.cg.jcat.api.exception;

import java.util.Date;

import com.cg.jcat.api.exception.entity.ErrorDTO;

public class OptionTextNotNullException extends JcatExceptions {

	private static String error_code = "OPE101";
	private static String error_message = "Option text Can't be null, number of options and number of option text should be same";
	private static Date error_timestamp = new Date();
	private static String error_details;

	public OptionTextNotNullException() {
		super();
	}

	public OptionTextNotNullException(String error_value) {
		super(new ErrorDTO(error_code, error_message, error_value, error_timestamp, error_details));
	}

}
