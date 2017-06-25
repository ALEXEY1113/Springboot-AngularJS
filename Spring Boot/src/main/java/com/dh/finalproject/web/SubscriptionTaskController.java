package com.dh.finalproject.web;

import com.dh.finalproject.domain.SubscriptionTasks;
import com.dh.finalproject.service.SubscriptionTaskService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@RestController
@RequestMapping({"/subs-tasks"})
@Api(
        value = "onlinestore",
        description = "Operation pertaining to Subscriptions Tasks"
)
public class SubscriptionTaskController {
    @Autowired
    private SubscriptionTaskService mSubscriptionTaskService;

    public SubscriptionTaskController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET}
    )
    public List<SubscriptionTasks> getSubscriptionsTasks() {
        return this.mSubscriptionTaskService.getAll();
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            value = {"/{id}"}
    )
    public List<SubscriptionTasks> getSubscriptionTaskByTaskId(@PathVariable String id) {
        return this.mSubscriptionTaskService.getSubscriptionTaskByTaskId(id);
    }

    @RequestMapping(
            method = {RequestMethod.POST}
    )
    public void addSubscriptionTask(@RequestBody SubscriptionTaskController.RequestSubscriptionTaskDTO subscriptionTaskDTO) {
        this.mSubscriptionTaskService.addSubscriptionTask(subscriptionTaskDTO);
    }

    @RequestMapping(
            method = {RequestMethod.DELETE},
            value = {"/{id}"}
    )
    public void deleteSubscriptionTask(@PathVariable String id) {
        this.mSubscriptionTaskService.deleteSubscriptionTaskById(id);
    }

    @RequestMapping(
            method = {RequestMethod.PUT},
            value = {"/{id}"}
    )
    public void setSubscriptionTask(@RequestBody SubscriptionTaskController.RequestSubscriptionTaskDTO setSubscriptionTask, @PathVariable String id) {
        this.mSubscriptionTaskService.updateSubscriptionTask(id, setSubscriptionTask);
    }

    public static class RequestSubscriptionTaskDTO {
        private String mIdTask;
        private String mIdStudent;
        private String mIdCourse;
        private Date mSubscriptionTaskDate;

        public RequestSubscriptionTaskDTO() {
        }

        public RequestSubscriptionTaskDTO(String idTask, String idStudent, String idCourse, Date subscriptionTaskDate) {
            this.mIdTask = idTask;
            this.mIdStudent = idStudent;
            this.mIdCourse = idCourse;
            this.mSubscriptionTaskDate = subscriptionTaskDate;
        }

        public String getIdTask() {
            return this.mIdTask;
        }

        public void setIdTask(String idTask) {
            this.mIdTask = idTask;
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

        public Date getSubscriptionTaskDate() {
            return this.mSubscriptionTaskDate;
        }

        public void setSubscriptionTaskDate(Date subscriptionTaskDate) {
            this.mSubscriptionTaskDate = subscriptionTaskDate;
        }
    }
}
