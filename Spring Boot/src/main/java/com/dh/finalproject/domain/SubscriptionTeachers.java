package com.dh.finalproject.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Document
public class SubscriptionTeachers {
    @Id
    private String mId;
    @DBRef
    private Teacher mTeacher;
    @DBRef
    private Course mCourse;
    @DBRef
    private ClassRoom mClassRoom;
    private Date mSubscriptionTeacherDate;

    public SubscriptionTeachers() {
    }

    public SubscriptionTeachers(String id, Teacher teacher, Course course, ClassRoom room, Date date) {
        this.mId = id;
        this.mTeacher = teacher;
        this.mCourse = course;
        this.mClassRoom = room;
        this.mSubscriptionTeacherDate = date;
    }

    public String getId() {
        return this.mId;
    }

    public Date getSubscriptionTeacherDate() {
        return this.mSubscriptionTeacherDate;
    }

    public void setSubscriptionTeacherDate(Date subscriptionTeacherDate) {
        this.mSubscriptionTeacherDate = subscriptionTeacherDate;
    }

    public Course getCourse() {
        return this.mCourse;
    }

    public void setCourse(Course course) {
        this.mCourse = course;
    }

    public ClassRoom getClassRoom() {
        return this.mClassRoom;
    }

    public void setClassRoom(ClassRoom classRoom) {
        this.mClassRoom = classRoom;
    }

    public Teacher getTeacher() {
        return this.mTeacher;
    }

    public void setTeacher(Teacher teacher) {
        this.mTeacher = teacher;
    }
}
