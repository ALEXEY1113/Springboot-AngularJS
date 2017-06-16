package com.dh.finalproject.service;

import com.dh.finalproject.domain.Student;
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
        this.mStudentRepository.delete(idStudent);
        this.mSubStudentRepository.deleteMany(idStudent);
        this.mSubTaskRepository.deleteMany(idStudent);
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
}
