package com.dh.finalproject.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by ALEXEY on 6/17/2017.
 */
@Document
public class Login {

    @Id
    private String mId;

    private String mUsername;
    private String mPassword;

    public Login() {  }

    public Login(String username, String password) {
        mUsername = username;
        mPassword = password;
    }

    public String getId() {
        return mId;
    }

    public String getUsername() {
        return mUsername;
    }

    public void setUsername(String username) {
        mUsername = username;
    }

    public String getPassword() {
        return mPassword;
    }

    public void setPassword(String password) {
        mPassword = password;
    }
}
