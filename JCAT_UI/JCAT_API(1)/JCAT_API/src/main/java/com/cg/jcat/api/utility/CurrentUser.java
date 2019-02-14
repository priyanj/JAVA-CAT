package com.cg.jcat.api.utility;

import org.springframework.web.bind.annotation.SessionAttributes;

@SessionAttributes
public class CurrentUser implements ICurrentUser {

	@Override
	public void setCurrentUser(String currentUser) {

	}

	@Override
	public String getCurrentUser() {
		return null;
	}

}
