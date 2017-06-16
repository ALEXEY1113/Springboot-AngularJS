package com.dh.finalproject.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Document
public class ClassRoom {
    @Id
    private String mId;
    private String mCode;
    private int mCapacity;

    public ClassRoom() {
    }

    public ClassRoom(String id, String code, int capacity) {
        this.mId = id;
        this.mCode = code;
        this.mCapacity = capacity;
    }

    public String getId() {
        return this.mId;
    }

    public String getCode() {
        return this.mCode;
    }

    public void setCode(String code) {
        this.mCode = code;
    }

    public int getCapacity() {
        return this.mCapacity;
    }

    public void setCapacity(int capacity) {
        this.mCapacity = capacity;
    }
}
