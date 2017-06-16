package com.dh.finalproject.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Document
public abstract class Person {
    @Id
    private String mId;
    private long mCode;
    private long mCi;
    private String mName;
    private String mLastname;
    private String mEmail;
    private String mAddress;
    private long mPhone;

    public Person() {
    }

    public Person(String id, long code, long ci, String name, String lastname, String email, String address, long phone) {
        this.mId = id;
        this.mCode = code;
        this.mCi = ci;
        this.mName = name;
        this.mLastname = lastname;
        this.mEmail = email;
        this.mAddress = address;
        this.mPhone = phone;
    }

    public String getId() {
        return this.mId;
    }

    public String getName() {
        return this.mName;
    }

    public void setName(String name) {
        this.mName = name;
    }

    public long getCode() {
        return this.mCode;
    }

    public void setCode(long code) {
        this.mCode = code;
    }

    public long getCi() {
        return this.mCi;
    }

    public void setCi(long ci) {
        this.mCi = ci;
    }

    public String getLastname() {
        return this.mLastname;
    }

    public void setLastname(String lastname) {
        this.mLastname = lastname;
    }

    public String getEmail() {
        return this.mEmail;
    }

    public void setEmail(String email) {
        this.mEmail = email;
    }

    public String getAddress() {
        return this.mAddress;
    }

    public void setAddress(String address) {
        this.mAddress = address;
    }

    public long getPhone() {
        return this.mPhone;
    }

    public void setPhone(long phone) {
        this.mPhone = phone;
    }
}
