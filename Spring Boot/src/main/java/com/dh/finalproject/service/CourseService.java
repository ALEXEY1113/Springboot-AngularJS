package com.dh.finalproject.service;

import com.dh.finalproject.domain.Course;
import com.dh.finalproject.domain.SubscriptionStudents;
import com.dh.finalproject.domain.SubscriptionTasks;
import com.dh.finalproject.domain.SubscriptionTeachers;
import com.dh.finalproject.repository.CourseRepository;
import com.dh.finalproject.repository.SubscriptionStudentRepository;
import com.dh.finalproject.repository.SubscriptionTaskRepository;
import com.dh.finalproject.repository.SubscriptionTeacherRepository;
import com.dh.finalproject.web.CourseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Service
public class CourseService {
    @Autowired
    private CourseRepository mCourseRepository;
    @Autowired
    private SubscriptionTeacherRepository mSubTeacherRepository;
    @Autowired
    private SubscriptionStudentRepository mSubStudentRepository;
    @Autowired
    private SubscriptionTaskRepository mSubTaskRepository;

    public CourseService() {
    }

    public List<Course> getAllCourses() {
        return this.mCourseRepository.findAll();
    }

    public Course getCourseById(String idCourse) {
        return (Course)this.mCourseRepository.findOne(idCourse);
    }

    public void addCourse(CourseController.RequestCourseDTO courseDTO) {
        Course course = this.fillCourse((String)null, courseDTO);
        this.mCourseRepository.save(course);
    }

    public boolean deleteCourse(String idCourse) {
        boolean response = false;
        SubscriptionTeachers subscriptionTeachers = this.mSubTeacherRepository.findByIdCourse(idCourse);
        if(subscriptionTeachers == null) {
            SubscriptionStudents subscriptionStudents = this.mSubStudentRepository.findByIdCourse(idCourse);
            if(subscriptionStudents == null) {
                SubscriptionTasks subscriptionTasks = this.mSubTaskRepository.findByIdCourse(idCourse);
                if(subscriptionTasks == null) {
                    this.mCourseRepository.delete(idCourse);
                    response = true;
                }
            }
        }

        return response;
    }

    public void updateCourse(String idCourse, CourseController.RequestCourseDTO updCourseDTO) {
        Course course = this.fillCourse(idCourse, updCourseDTO);
        this.mCourseRepository.save(course);
    }

    private Course fillCourse(String idCourse, CourseController.RequestCourseDTO courseDTO) {
        Course course;
        if(idCourse == null) {
            course = new Course();
        } else {
            course = (Course)this.mCourseRepository.findOne(idCourse);
        }

        course.setCode(courseDTO.getCode());
        course.setName(courseDTO.getName());
        course.setGrade(courseDTO.getGrade());
        course.setDescription(courseDTO.getDescription());
        return course;
    }
}
