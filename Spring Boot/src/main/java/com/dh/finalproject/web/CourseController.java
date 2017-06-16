package com.dh.finalproject.web;

import com.dh.finalproject.domain.Course;
import com.dh.finalproject.service.CourseService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@RestController
@RequestMapping({"/courses"})
@Api(
        value = "onlinestore",
        description = "Operation pertaining to Courses"
)
public class CourseController {
    @Autowired
    CourseService mCourseService;

    public CourseController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET}
    )
    public List<Course> getAllCourse() {
        return this.mCourseService.getAllCourses();
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            value = {"/{id}"}
    )
    public Course getCourseById(@PathVariable String id) {
        return this.mCourseService.getCourseById(id);
    }

    @RequestMapping(
            method = {RequestMethod.POST}
    )
    public void createCourse(@RequestBody CourseController.RequestCourseDTO newCourse) {
        this.mCourseService.addCourse(newCourse);
    }

    @RequestMapping(
            method = {RequestMethod.DELETE},
            value = {"/{id}"}
    )
    public boolean deleteCourse(@PathVariable String id) {
        return this.mCourseService.deleteCourse(id);
    }

    @RequestMapping(
            method = {RequestMethod.PUT},
            value = {"/{id}"}
    )
    public void setCourse(@RequestBody CourseController.RequestCourseDTO setCourse, @PathVariable String id) {
        this.mCourseService.updateCourse(id, setCourse);
    }

    public static class RequestCourseDTO {
        private long mCode;
        private String mName;
        private String mGrade;
        private String mDescription;

        public RequestCourseDTO() {
        }

        public RequestCourseDTO(long code, String name, String grade, String description) {
            this.mCode = this.mCode;
            this.mName = this.mName;
            this.mGrade = grade;
            this.mDescription = description;
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
}
