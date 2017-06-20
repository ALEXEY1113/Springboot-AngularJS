package com.dh.finalproject.service;

import com.dh.finalproject.domain.Student;
import com.dh.finalproject.domain.SubscriptionStudents;
import com.dh.finalproject.domain.SubscriptionTasks;
import com.dh.finalproject.repository.StudentRepository;
import com.dh.finalproject.repository.SubscriptionStudentRepository;
import com.dh.finalproject.repository.SubscriptionTaskRepository;
import com.dh.finalproject.web.StudentController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Service
public class StudentService {
    @Autowired
    private StudentRepository mStudentRepository;
    @Autowired
    private SubscriptionStudentRepository mSubStudentRepository;
    @Autowired
    private SubscriptionTaskRepository mSubTaskRepository;

    public StudentService() {
    }

    public List<Student> getAllStudents() {
        return this.mStudentRepository.findAll();
    }

    public Student getStudentById(String idStudent) {
        return (Student)this.mStudentRepository.findOne(idStudent);
    }

    public List<Student> getStudentsByName(String name) {
        return this.mStudentRepository.findByName(name);
    }

    public void addStudent(StudentController.RequestStudentDTO studentDTO) {
        Student student = this.refillStudent((String)null, studentDTO);
        this.mStudentRepository.save(student);
    }

    public void deleteStudent(String idStudent) {

        Student student = mStudentRepository.findOne(idStudent);
        if (student != null) {
            mStudentRepository.delete(idStudent);
            List<SubscriptionStudents> subscriptionStudents = mSubStudentRepository.findAll();
            List<SubscriptionTasks> subscriptionTasks = mSubTaskRepository.findAll();

            // Delete from other tables
            deleteSubStudent(idStudent, subscriptionStudents);
            deleteSubTask(idStudent, subscriptionTasks);
        }
    }

    public void updateStudent(String idStudent, StudentController.RequestStudentDTO updStudentDTO) {
        Student student = this.refillStudent(idStudent, updStudentDTO);
        this.mStudentRepository.save(student);
    }

    private Student refillStudent(String idStudent, StudentController.RequestStudentDTO studentDTO) {
        Student student;
        if(idStudent == null) {
            student = new Student();
        } else {
            student = (Student)this.mStudentRepository.findOne(idStudent);
        }

        student.setCode(studentDTO.getCode());
        student.setCi(studentDTO.getCi());
        student.setName(studentDTO.getName());
        student.setLastname(studentDTO.getLastname());
        student.setEmail(studentDTO.getEmail());
        student.setAddress(studentDTO.getAddress());
        student.setPhone(studentDTO.getPhone());
        return student;
    }

    private void deleteSubStudent(String idStudent, List<SubscriptionStudents> subsStudents) {

        for (int i = 0; i < subsStudents.size(); i++) {

            SubscriptionStudents sub = subsStudents.get(i);
            if (sub.getStudent().getId().equals(idStudent)) {
                mSubStudentRepository.delete(sub.getId());
            }
        }
    }
    private void deleteSubTask(String idStudent, List<SubscriptionTasks> subsTasks) {

        for (int i = 0; i < subsTasks.size(); i++) {

            SubscriptionTasks sub = subsTasks.get(i);
            if (sub.getStudent().getId().equals(idStudent)) {
                mSubTaskRepository.delete(sub.getId());
            }
        }
    }
}
