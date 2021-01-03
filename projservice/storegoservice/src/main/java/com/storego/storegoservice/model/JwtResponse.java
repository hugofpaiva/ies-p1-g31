package com.storego.storegoservice.model;

import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final GrantedAuthority type;

    public JwtResponse(String jwttoken, GrantedAuthority type) {
        this.jwttoken = jwttoken;
        this.type = type;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public GrantedAuthority getType() {
        return type;
    }
}
