package com.dh.finalproject.service;

import com.dh.finalproject.domain.ClassRoom;
import com.dh.finalproject.domain.Course;
import com.dh.finalproject.domain.SubscriptionTeachers;
import com.dh.finalproject.domain.Teacher;
import com.dh.finalproject.repository.ClassRoomRepository;
import com.dh.finalproject.repository.CourseRepository;
import com.dh.finalproject.repository.SubscriptionTeacherRepository;
import com.dh.finalproject.repository.TeacherRepository;
import com.dh.finalproject.web.SubscriptionTeacherController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Service
public class SubscriptionTeacherService {
    @Autowired
    private SubscriptionTeacherRepository mSubscriptionTeacherRepository;
    @Autowired
    private TeacherRepository mTeacherRepository;
    @Autowired
    private CourseRepository mCourseRepository;
    @Autowired
    private ClassRoomRepository mClassRoomRepository;

    public SubscriptionTeacherService() {
    }

    public List<SubscriptionTeachers> getAll() {
        return this.mSubscriptionTeacherRepository.findAll();
    }

    public List<SubscriptionTeachers> getSubscriptionTeacherByTeacherId(String idTeacher) {
        List<SubscriptionTeachers> listSubTeacher = mSubscriptionTeacherRepository.findAll();

        List<SubscriptionTeachers> listAuxSubTeacher = new ArrayList<>();
        for (int i = 0; i < listSubTeacher.size(); i++) {
            SubscriptionTeachers subTeacher = listSubTeacher.get(i);

            if (subTeacher.getTeacher().getId().equals(idTeacher)) {
                listAuxSubTeacher.add(subTeacher);
            }
        }

        return listAuxSubTeacher;
    }

    public void addSubscriptionTeacher(SubscriptionTeacherController.RequestSubscriptionTeacherDTO newSubsTeacherDTO) {
        SubscriptionTeachers subsTeacher = this.fillSubsTeacher((String)null, newSubsTeacherDTO);
        this.mSubscriptionTeacherRepository.save(subsTeacher);
    }

    public void deleteSubscriptionTeacherById(String idSubsTeacher) {
        this.mSubscriptionTeacherRepository.delete(idSubsTeacher);
    }

    public void updateSubscriptionTeacher(String idSubsTeacher, SubscriptionTeacherController.RequestSubscriptionTeacherDTO updateSubsTeacherDTO) {
        SubscriptionTeachers subTeacher = this.fillSubsTeacher(idSubsTeacher, updateSubsTeacherDTO);
        this.mSubscriptionTeacherRepository.save(subTeacher);
    }

    private SubscriptionTeachers fillSubsTeacher(String idSubsTeacher, SubscriptionTeacherController.RequestSubscriptionTeacherDTO reqSubsTeacherDTO) {
        SubscriptionTeachers subscriptionTeachers;
        if(idSubsTeacher == null) {
            subscriptionTeachers = new SubscriptionTeachers();
        } else {
            subscriptionTeachers = (SubscriptionTeachers)this.mSubscriptionTeacherRepository.findOne(idSubsTeacher);
        }

        List<Object> listReferences = this.getReferencesDB(reqSubsTeacherDTO);
        subscriptionTeachers.setSubscriptionTeacherDate(reqSubsTeacherDTO.getSubscriptionTeacherDate());
        subscriptionTeachers.setTeacher((Teacher)listReferences.get(0));
        subscriptionTeachers.setCourse((Course)listReferences.get(1));
        subscriptionTeachers.setClassRoom((ClassRoom)listReferences.get(2));
        return subscriptionTeachers;
    }

    private List<Object> getReferencesDB(SubscriptionTeacherController.RequestSubscriptionTeacherDTO subsTeacherDTO) {
        List<Object> listObjs = new ArrayList();
        Teacher teacher = (Teacher)this.mTeacherRepository.findOne(subsTeacherDTO.getIdTeacher());
        Course course = (Course)this.mCourseRepository.findOne(subsTeacherDTO.getIdCourse());
        ClassRoom classRoom = (ClassRoom)this.mClassRoomRepository.findOne(subsTeacherDTO.getIdClassRoom());
        listObjs.add(teacher);
        listObjs.add(course);
        listObjs.add(classRoom);
        return listObjs;
    }
}
