package com.dh.finalproject.domain;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public class Teacher extends Person {
    private double mSalary;

    public Teacher() {
    }

    public Teacher(String id, long code, long ci, String name, String lastname, String email, String address, long phone, double salary) {
        super(id, code, ci, name, lastname, email, address, phone);
        this.mSalary = salary;
    }

    public double getSalary() {
        return this.mSalary;
    }

    public void setSalary(double salary) {
        this.mSalary = salary;
    }
}
