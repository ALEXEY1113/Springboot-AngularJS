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
        boolean courseOk = false;
        // Recuperamos todos los Subscriptions para iterarlos
        List<SubscriptionTeachers> subscriptionsTeachers = this.mSubTeacherRepository.findAll();
        List<SubscriptionStudents> subscriptionStudents = this.mSubStudentRepository.findAll();
        List<SubscriptionTasks> subscriptionTasks = this.mSubTaskRepository.findAll();

        if (subscriptionsTeachers.size() >= 0) {
            courseOk = findSubTeacherCourseId(idCourse, subscriptionsTeachers);

            if (!courseOk) {
                if (subscriptionStudents.size() >= 0) {
                    courseOk = findSubStudentCourseId(idCourse, subscriptionStudents);

                    if (!courseOk) {
                        if (subscriptionTasks.size() >= 0) {
                            courseOk = findSubTaskCourseId(idCourse, subscriptionTasks);
                        }
                    }
                }
            }
        }

        if (!courseOk) {
            this.mCourseRepository.delete(idCourse);
            response = true;
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

    // Function for Find CourseID SubscriptionTeachers
    private boolean findSubTeacherCourseId(String courseId, List<SubscriptionTeachers> listItems) {
        boolean founded = false;

        for (int i = 0; i < listItems.size(); i++) {
            SubscriptionTeachers subTeacher = listItems.get(i);
            if (subTeacher.getCourse().getId().equals(courseId)) {
                founded = true;
                break;
            }
        }

        return founded;
    }

    // Function for Find CourseID SubscriptionStudents
    private boolean findSubStudentCourseId(String courseId, List<SubscriptionStudents> listItems) {
        boolean founded = false;

        for (int i = 0; i < listItems.size(); i++) {
            SubscriptionStudents subStudent = listItems.get(i);
            if (subStudent.getCourse().getId().equals(courseId)) {
                founded = true;
                break;
            }
        }

        return founded;
    }

    // Function for Find CourseID SubscriptionTasks
    private boolean findSubTaskCourseId(String courseId, List<SubscriptionTasks> listItems) {
        boolean founded = false;

        for (int i = 0; i < listItems.size(); i++) {
            SubscriptionTasks subTask= listItems.get(i);
            if (subTask.getCourse().getId().equals(courseId)) {
                founded = true;
                break;
            }
        }

        return founded;
    }
}
