package com.dh.finalproject.web;

import com.dh.finalproject.domain.SubscriptionStudents;
import com.dh.finalproject.service.SubscriptionStudentService;
import io.swagger.annotations.Api;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@RestController
@RequestMapping({"/subs-students"})
@Api(
        value = "onlinestore",
        description = "Operation pertaining to Subscriptions Students"
)
public class SubscriptionStudentController {
    @Autowired
    private SubscriptionStudentService mSubscriptionService;

    public SubscriptionStudentController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET}
    )
    public List<SubscriptionStudents> getSubscriptionsStudents() {
        return this.mSubscriptionService.getAll();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = {"/{studentId}"})
    public List<SubscriptionStudents> getSubscriptionStudentByStudentId(@PathVariable String studentId) {
        return this.mSubscriptionService.getSubscriptionStudentByStudentId(studentId);
    }

    @RequestMapping(
            method = {RequestMethod.POST}
    )
    public void addSubscriptionStudent(@RequestBody SubscriptionStudentController.RequestSubscriptionStudentDTO subscriptionStudentDTO) {
        this.mSubscriptionService.addSubscriptionStudent(subscriptionStudentDTO);
    }

    @RequestMapping(
            method = {RequestMethod.DELETE},
            value = {"/{id}"}
    )
    public void deleteSubscriptionStudent(@PathVariable String id) {
        this.mSubscriptionService.deleteSubscriptionStudentById(id);
    }

    @RequestMapping(
            method = {RequestMethod.PUT},
            value = {"/{id}"}
    )
    public void setSubscriptionStudent(@RequestBody SubscriptionStudentController.RequestSubscriptionStudentDTO setSubscriptionStudent, @PathVariable String id) {
        this.mSubscriptionService.updateSubscriptionStudent(id, setSubscriptionStudent);
    }

    public static class RequestSubscriptionStudentDTO {
        private String mIdStudent;
        private String mIdCourse;
        private String mIdClassRoom;
        private Date mSubscriptionStudentDate;

        public RequestSubscriptionStudentDTO() {
        }

        public RequestSubscriptionStudentDTO(String idStudent, String idCourse, String idClassRoom, Date subscriptionStudentDate) {
            this.mIdStudent = idStudent;
            this.mIdCourse = idCourse;
            this.mIdClassRoom = idClassRoom;
            this.mSubscriptionStudentDate = subscriptionStudentDate;
        }

        public Date getSubscriptionStudentDate() {
            return this.mSubscriptionStudentDate;
        }

        public void setSubscriptionStudentDate(Date subscriptionStudentDate) {
            this.mSubscriptionStudentDate = subscriptionStudentDate;
        }

        public String getIdStudent() {
            return this.mIdStudent;
        }

        public void setIdStudent(String idStudent) {
            this.mIdStudent = idStudent;
        }

        public String getIdCourse() {
            return this.mIdCourse;
        }

        public void setIdCourse(String idCourse) {
            this.mIdCourse = idCourse;
        }

        public String getIdClassRoom() {
            return this.mIdClassRoom;
        }

        public void setIdClassRoom(String idClassRoom) {
            this.mIdClassRoom = idClassRoom;
        }
    }
}
