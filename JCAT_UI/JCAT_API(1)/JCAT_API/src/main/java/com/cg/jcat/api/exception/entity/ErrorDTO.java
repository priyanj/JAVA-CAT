package com.cg.jcat.api.exception.entity;

import java.util.Date;

public class ErrorDTO {

	// CRE_CART_INCOMPLETE_BODY(400,"E001","Incomplete request body","");

	private String errorCode;
	private String errorMessage;
	private String errorValue;
	private Date errorTimestamp;
	private String errorDetails;

	public ErrorDTO() {

	}

	public ErrorDTO(String errorCode, String errorMessage, String errorValue, Date errorTimestamp,
			String errorDetails) {
		super();
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
		this.errorValue = errorValue;
		this.errorTimestamp = errorTimestamp;
		this.errorDetails = errorDetails;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getErrorValue() {
		return errorValue;
	}

	public void setErrorValue(String errorValue) {
		this.errorValue = errorValue;
	}

	public Date getErrorTimestamp() {
		return errorTimestamp;
	}

	public void setErrorTimestamp(Date errorTimestamp) {
		this.errorTimestamp = errorTimestamp;
	}

	public String getErrorDetails() {
		return errorDetails;
	}

	public void setErrorDetails(String errorDetails) {
		this.errorDetails = errorDetails;
	}

	@Override
	public String toString() {
		return "ErrorDTO [errorCode=" + errorCode + ", errorMessage=" + errorMessage + ", errorValue=" + errorValue
				+ ", errorTimestamp=" + errorTimestamp + ", errorDetails=" + errorDetails + "]";
	}

}
