package com.cg.jcat.api.exception;

import com.cg.jcat.api.exception.entity.ErrorDTO;

public class JcatExceptions extends Exception {

	private ErrorDTO errorDTO;

	public JcatExceptions() {
		super();

	}

	public JcatExceptions(String error_value) {
		super(error_value);
	}

	public JcatExceptions(ErrorDTO errorDTO) {
		super(errorDTO.toString());
		this.errorDTO = errorDTO;

	}

	public ErrorDTO getErrorDTO() {
		return errorDTO;
	}

	public void setErrorDTO(ErrorDTO errorDTO) {
		this.errorDTO = errorDTO;
	}

	@Override
	public String toString() {
		return "JcatExceptions [errorDTO=" + errorDTO + "]";
	}

}
