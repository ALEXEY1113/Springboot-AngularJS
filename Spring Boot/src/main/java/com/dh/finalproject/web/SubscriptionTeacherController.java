package com.dh.finalproject.web;

import com.dh.finalproject.domain.SubscriptionTeachers;
import com.dh.finalproject.service.SubscriptionTeacherService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@RestController
@RequestMapping({"/subs-teachers"})
@Api(
        value = "onlinestore",
        description = "Operation pertaining to Subscriptions Teachers"
)
public class SubscriptionTeacherController {
    @Autowired
    private SubscriptionTeacherService mSubscriptionTeacherService;

    public SubscriptionTeacherController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET}
    )
    public List<SubscriptionTeachers> getSubscriptionsTeachers() {
        return this.mSubscriptionTeacherService.getAll();
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            value = {"/{id}"}
    )
    public SubscriptionTeachers getSubscriptionTeacherById(@PathVariable String id) {
        return this.mSubscriptionTeacherService.getSubscriptionTeacherById(id);
    }

    @RequestMapping(
            method = {RequestMethod.POST}
    )
    public void addSubscriptionTeacher(@RequestBody SubscriptionTeacherController.RequestSubscriptionTeacherDTO subscriptionTeacherDTO) {
        this.mSubscriptionTeacherService.addSubscriptionTeacher(subscriptionTeacherDTO);
    }

    @RequestMapping(
            method = {RequestMethod.DELETE},
            value = {"/{id}"}
    )
    public void deleteSubscriptionTeacher(@PathVariable String id) {
        this.mSubscriptionTeacherService.deleteSubscriptionTeacherById(id);
    }

    @RequestMapping(
            method = {RequestMethod.PUT},
            value = {"/{id}"}
    )
    public void setSubscriptionTeacher(@RequestBody SubscriptionTeacherController.RequestSubscriptionTeacherDTO setSubscriptionTeacher, @PathVariable String id) {
        this.mSubscriptionTeacherService.updateSubscriptionTeacher(id, setSubscriptionTeacher);
    }

    public static class RequestSubscriptionTeacherDTO {
        private String mIdTeacher;
        private String mIdCourse;
        private String mIdClassRoom;
        private Date mSubscriptionTeacherDate;

        public RequestSubscriptionTeacherDTO() {
        }

        public RequestSubscriptionTeacherDTO(String idTeacher, String idCourse, String idClassRoom, Date subscriptionTeacherDate) {
            this.mIdTeacher = idTeacher;
            this.mIdCourse = idCourse;
            this.mIdClassRoom = idClassRoom;
            this.mSubscriptionTeacherDate = subscriptionTeacherDate;
        }

        public String getIdTeacher() {
            return this.mIdTeacher;
        }

        public void setIdTeacher(String idTeacher) {
            this.mIdTeacher = idTeacher;
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

        public Date getSubscriptionTeacherDate() {
            return this.mSubscriptionTeacherDate;
        }

        public void setSubscriptionTeacherDate(Date subscriptionTeacherDate) {
            this.mSubscriptionTeacherDate = subscriptionTeacherDate;
        }
    }
}
