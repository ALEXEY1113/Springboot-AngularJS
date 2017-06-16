package com.dh.finalproject.web;

import com.dh.finalproject.domain.Task;
import com.dh.finalproject.service.TaskService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@RestController
@RequestMapping({"tasks"})
@Api(
        value = "onlinestore",
        description = "Operation pertaining to Tasks"
)
public class TaskController {
    @Autowired
    private TaskService mTaskService;

    public TaskController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET}
    )
    public List<Task> getTasks() {
        return this.mTaskService.getAll();
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            value = {"/{id}"}
    )
    public Task getTaskById(@PathVariable String id) {
        return this.mTaskService.getTaskById(id);
    }

    @RequestMapping(
            method = {RequestMethod.POST}
    )
    public void createTask(@RequestBody TaskController.RequestTaskDTO newTask) {
        this.mTaskService.addTask(newTask);
    }

    @RequestMapping(
            method = {RequestMethod.DELETE},
            value = {"/{id}"}
    )
    public String deleteTask(@PathVariable String id) {
        return this.mTaskService.deleteTaskById(id);
    }

    @RequestMapping(
            method = {RequestMethod.PUT},
            value = {"/{id}"}
    )
    public void setTask(@RequestBody TaskController.RequestTaskDTO setTask, @PathVariable String id) {
        this.mTaskService.updateTask(id, setTask);
    }

    public static class RequestTaskDTO {
        private String mName;
        private String mState;
        private String mDescription;

        public RequestTaskDTO() {
        }

        public RequestTaskDTO(String name, String state, String description) {
            this.mName = name;
            this.mState = state;
            this.mDescription = description;
        }

        public String getName() {
            return this.mName;
        }

        public void setName(String name) {
            this.mName = name;
        }

        public String getState() {
            return this.mState;
        }

        public void setState(String state) {
            this.mState = state;
        }

        public String getDescription() {
            return this.mDescription;
        }

        public void setDescription(String description) {
            this.mDescription = description;
        }
    }
}
