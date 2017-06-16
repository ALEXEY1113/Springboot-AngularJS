package com.dh.finalproject.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Document
public class Course {
    @Id
    private String mId;
    private long mCode;
    private String mName;
    private String mGrade;
    private String mDescription;

    public Course() {
    }

    public Course(String mId, long mCod, String mName, String mGrade, String mDescription) {
        this.mId = mId;
        this.mCode = mCod;
        this.mName = mName;
        this.mGrade = mGrade;
        this.mDescription = mDescription;
    }

    public String getId() {
        return this.mId;
    }

    public long getCode() {
        return this.mCode;
    }

    public void setCode(long code) {
        this.mCode = code;
    }

    public String getName() {
        return this.mName;
    }

    public void setName(String name) {
        this.mName = name;
    }

    public String getGrade() {
        return this.mGrade;
    }

    public void setGrade(String grade) {
        this.mGrade = grade;
    }

    public String getDescription() {
        return this.mDescription;
    }

    public void setDescription(String description) {
        this.mDescription = description;
    }
}
