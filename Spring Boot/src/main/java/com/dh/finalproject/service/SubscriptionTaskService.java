package com.dh.finalproject.service;

import com.dh.finalproject.domain.Course;
import com.dh.finalproject.domain.Student;
import com.dh.finalproject.domain.SubscriptionTasks;
import com.dh.finalproject.domain.Task;
import com.dh.finalproject.repository.CourseRepository;
import com.dh.finalproject.repository.StudentRepository;
import com.dh.finalproject.repository.SubscriptionTaskRepository;
import com.dh.finalproject.repository.TaskRepository;
import com.dh.finalproject.web.SubscriptionTaskController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Service
public class SubscriptionTaskService {
    @Autowired
    private SubscriptionTaskRepository mSubTaskRepository;
    @Autowired
    private StudentRepository mStudentRepository;
    @Autowired
    private CourseRepository mCourseRepository;
    @Autowired
    private TaskRepository mTaskRepository;

    public SubscriptionTaskService() {
    }

    public List<SubscriptionTasks> getAll() {
        return this.mSubTaskRepository.findAll();
    }

    public SubscriptionTasks getSubscriptionTaskById(String idSubTask) {
        return (SubscriptionTasks)this.mSubTaskRepository.findOne(idSubTask);
    }

    public void addSubscriptionTask(SubscriptionTaskController.RequestSubscriptionTaskDTO subTaskDTO) {
        SubscriptionTasks subscriptionTask = new SubscriptionTasks();
        List<Object> listReferences = this.getReferencesDB(subTaskDTO);
        subscriptionTask.setStudent((Student)listReferences.get(0));
        subscriptionTask.setCourse((Course)listReferences.get(1));
        subscriptionTask.setTask((Task)listReferences.get(2));
        subscriptionTask.setSubscriptionTaskDate(subTaskDTO.getSubscriptionTaskDate());
        this.mSubTaskRepository.save(subscriptionTask);
    }

    public void deleteSubscriptionTaskById(String idSubscriptionTask) {
        this.mSubTaskRepository.delete(idSubscriptionTask);
    }

    public void updateSubscriptionTask(String idSubscriptionTask, SubscriptionTaskController.RequestSubscriptionTaskDTO updateSubscriptionTaskDTO) {
        List<Object> listReference = this.getReferencesDB(updateSubscriptionTaskDTO);
        SubscriptionTasks subscriptiontask = (SubscriptionTasks)this.mSubTaskRepository.findOne(idSubscriptionTask);
        subscriptiontask.setStudent((Student)listReference.get(0));
        subscriptiontask.setCourse((Course)listReference.get(1));
        subscriptiontask.setTask((Task)listReference.get(2));
        updateSubscriptionTaskDTO.setSubscriptionTaskDate(subscriptiontask.getSubscriptionTaskDate());
        this.mSubTaskRepository.save(subscriptiontask);
    }

    private List<Object> getReferencesDB(SubscriptionTaskController.RequestSubscriptionTaskDTO requestSubscriptionTaskDTO) {
        List<Object> list = new ArrayList<>();
        Student student = (Student)this.mStudentRepository.findOne(requestSubscriptionTaskDTO.getIdStudent());
        Course course = (Course)this.mCourseRepository.findOne(requestSubscriptionTaskDTO.getIdCourse());
        Task task = (Task)this.mTaskRepository.findOne(requestSubscriptionTaskDTO.getIdTask());
        list.add(student);
        list.add(course);
        list.add(task);
        return list;
    }
}
