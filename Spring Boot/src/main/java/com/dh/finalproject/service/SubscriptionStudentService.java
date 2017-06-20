package com.dh.finalproject.service;

import com.dh.finalproject.domain.ClassRoom;
import com.dh.finalproject.domain.Course;
import com.dh.finalproject.domain.Student;
import com.dh.finalproject.domain.SubscriptionStudents;
import com.dh.finalproject.repository.ClassRoomRepository;
import com.dh.finalproject.repository.CourseRepository;
import com.dh.finalproject.repository.StudentRepository;
import com.dh.finalproject.repository.SubscriptionStudentRepository;
import com.dh.finalproject.web.SubscriptionStudentController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Service
public class SubscriptionStudentService {
    @Autowired
    private SubscriptionStudentRepository mSubscriptionStudentRepository;
    @Autowired
    private StudentRepository mStudentRepository;
    @Autowired
    private CourseRepository mCourseRepository;
    @Autowired
    private ClassRoomRepository mClassRoomRepository;

    public SubscriptionStudentService() {
    }

    public List<SubscriptionStudents> getAll() {
        return this.mSubscriptionStudentRepository.findAll();
    }

    public SubscriptionStudents getSubscriptionStudentById(String idSubscription) {
        return (SubscriptionStudents)this.mSubscriptionStudentRepository.findOne(idSubscription);
    }

    public void addSubscriptionStudent(SubscriptionStudentController.RequestSubscriptionStudentDTO subStudentDTO) {
        SubscriptionStudents subscriptionStudent = new SubscriptionStudents();
        List<Object> listReferences = this.getReferencesDB(subStudentDTO);
        subscriptionStudent.setStudent((Student)listReferences.get(0));
        subscriptionStudent.setCourse((Course)listReferences.get(1));
        subscriptionStudent.setClassRoom((ClassRoom)listReferences.get(2));
        subscriptionStudent.setSubscriptionStudentDate(subStudentDTO.getSubscriptionStudentDate());
        this.mSubscriptionStudentRepository.save(subscriptionStudent);
    }

    public void deleteSubscriptionStudentById(String idSubscriptionStudent) {
        this.mSubscriptionStudentRepository.delete(idSubscriptionStudent);
    }

    public void updateSubscriptionStudent(String idSubStudent, SubscriptionStudentController.RequestSubscriptionStudentDTO updateSubDTO) {
        List<Object> listReference = this.getReferencesDB(updateSubDTO);
        SubscriptionStudents subscriptionStudent = (SubscriptionStudents)this.mSubscriptionStudentRepository.findOne(idSubStudent);
        subscriptionStudent.setStudent((Student)listReference.get(0));
        subscriptionStudent.setCourse((Course)listReference.get(1));
        subscriptionStudent.setClassRoom((ClassRoom)listReference.get(2));
        subscriptionStudent.setSubscriptionStudentDate(updateSubDTO.getSubscriptionStudentDate());
        this.mSubscriptionStudentRepository.save(subscriptionStudent);
    }

    private List<Object> getReferencesDB(SubscriptionStudentController.RequestSubscriptionStudentDTO requestSubscriptionDTO) {
        List<Object> list = new ArrayList();
        Student student = (Student)this.mStudentRepository.findOne(requestSubscriptionDTO.getIdStudent());
        Course course = (Course)this.mCourseRepository.findOne(requestSubscriptionDTO.getIdCourse());
        ClassRoom classRoom = (ClassRoom)this.mClassRoomRepository.findOne(requestSubscriptionDTO.getIdClassRoom());
        list.add(student);
        list.add(course);
        list.add(classRoom);
        return list;
    }
}
