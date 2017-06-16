package com.dh.finalproject.domain;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public class Student extends Person {
    public Student() {
    }

    public Student(String id, long code, long ci, String name, String lastname, String email, String address, long phone) {
        super(id, code, ci, name, lastname, email, address, phone);
    }
}
