package com.dh.finalproject.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Document
public class SubscriptionTasks {
    @Id
    private String mId;
    @DBRef
    private Task mTask;
    @DBRef
    private Student mStudent;
    @DBRef
    private Course mCourse;
    private Date mSubscriptionTaskDate;

    public SubscriptionTasks() {
    }

    public SubscriptionTasks(String id, Task task, Student student, Course course, Date subscriptionTaskDate) {
        this.mId = id;
        this.mTask = task;
        this.mStudent = student;
        this.mCourse = course;
        this.mSubscriptionTaskDate = subscriptionTaskDate;
    }

    public String getId() {
        return this.mId;
    }

    public Task getTask() {
        return this.mTask;
    }

    public void setTask(Task task) {
        this.mTask = task;
    }

    public Student getStudent() {
        return this.mStudent;
    }

    public void setStudent(Student student) {
        this.mStudent = student;
    }

    public Course getCourse() {
        return this.mCourse;
    }

    public void setCourse(Course course) {
        this.mCourse = course;
    }

    public Date getSubscriptionTaskDate() {
        return this.mSubscriptionTaskDate;
    }

    public void setSubscriptionTaskDate(Date subscriptionTaskDate) {
        this.mSubscriptionTaskDate = subscriptionTaskDate;
    }
}
