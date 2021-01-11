package com.storego.storegoservice.model;

import java.io.Serializable;

public class PwChangeRequest implements Serializable {

    private String email;
    private String password;

    //need default constructor for JSON Parsing
    public PwChangeRequest()
    {

    }

    public PwChangeRequest(String email, String password) {
        this.setEmail(email);
        this.setPassword(password);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}