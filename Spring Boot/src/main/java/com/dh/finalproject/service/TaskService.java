package com.dh.finalproject.service;

import com.dh.finalproject.domain.Task;
import com.dh.finalproject.repository.SubscriptionTaskRepository;
import com.dh.finalproject.repository.TaskRepository;
import com.dh.finalproject.web.TaskController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Service
public class TaskService {
    @Autowired
    private TaskRepository mTaskRepository;
    @Autowired
    private SubscriptionTaskRepository mSubTaskRepository;

    public TaskService() {
    }

    public List<Task> getAll() {
        return this.mTaskRepository.findAll();
    }

    public Task getTaskById(String idTask) {
        return (Task)this.mTaskRepository.findOne(idTask);
    }

    public void addTask(TaskController.RequestTaskDTO taskDTO) {
        Task task = this.fillTask((String)null, taskDTO);
        this.mTaskRepository.save(task);
    }

    public String deleteTaskById(String idTask) {
        Task task = (Task)this.mTaskRepository.findOne(idTask);
        String response;
        if(task != null) {
            if(task.getState().equals("Finished")) {
                response = "Can't Delete this task.";
            } else {
                this.mTaskRepository.delete(idTask);
                this.mSubTaskRepository.deleteManyByIdTask(idTask);
                response = "Task Deleted.";
            }
        } else {
            response = "Task doesn't exist.";
        }

        return response;
    }

    public void updateTask(String idTask, TaskController.RequestTaskDTO updateTaskDTO) {
        Task task = this.fillTask(idTask, updateTaskDTO);
        this.mTaskRepository.save(task);
    }

    private Task fillTask(String idTask, TaskController.RequestTaskDTO taskDTO) {
        Task task;
        if(idTask == null) {
            task = new Task();
        } else {
            task = (Task)this.mTaskRepository.findOne(idTask);
        }

        task.setName(taskDTO.getName());
        task.setState(taskDTO.getState());
        task.setDescription(taskDTO.getDescription());
        return task;
    }
}
