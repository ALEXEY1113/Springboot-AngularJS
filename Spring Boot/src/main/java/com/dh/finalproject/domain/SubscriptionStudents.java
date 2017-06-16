package com.dh.finalproject.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Document
public class SubscriptionStudents {
    @Id
    private String mId;
    @DBRef
    private Student mStudent;
    @DBRef
    private Course mCourse;
    @DBRef
    private ClassRoom mClassRoom;
    private Date mSubscriptionStudentDate;

    public SubscriptionStudents() {
    }

    public SubscriptionStudents(String id, Course course, Student student, ClassRoom room, Date date) {
        this.mId = id;
        this.mCourse = course;
        this.mStudent = student;
        this.mClassRoom = room;
        this.mSubscriptionStudentDate = date;
    }

    public String getId() {
        return this.mId;
    }

    public Date getSubscriptionStudentDate() {
        return this.mSubscriptionStudentDate;
    }

    public void setSubscriptionStudentDate(Date subscriptionStudentDate) {
        this.mSubscriptionStudentDate = subscriptionStudentDate;
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

    public Student getStudent() {
        return this.mStudent;
    }

    public void setStudent(Student student) {
        this.mStudent = student;
    }
}
