package com.dh.finalproject.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Document
public class Task {
    @Id
    private String mId;
    private String mName;
    private String mState;
    private String mDescription;

    public Task() {
    }

    public Task(String id, String name, String state, String description) {
        this.mId = id;
        this.mName = name;
        this.mState = state;
        this.mDescription = description;
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

    public String getState() {
        return this.mState;
    }

    public void setState(String state) {
        this.mState = state;
    }

    public String getDescription() {
        return this.mDescription;
    }

    public void setDescription(String description) {
        this.mDescription = description;
    }
}
