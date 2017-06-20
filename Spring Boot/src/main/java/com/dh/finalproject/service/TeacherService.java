package com.dh.finalproject.service;

import com.dh.finalproject.domain.SubscriptionStudents;
import com.dh.finalproject.domain.SubscriptionTeachers;
import com.dh.finalproject.domain.Teacher;
import com.dh.finalproject.repository.SubscriptionStudentRepository;
import com.dh.finalproject.repository.SubscriptionTeacherRepository;
import com.dh.finalproject.repository.TeacherRepository;
import com.dh.finalproject.web.TeacherController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Service
public class TeacherService {
    @Autowired
    private TeacherRepository mTeacherRepository;
    @Autowired
    private SubscriptionTeacherRepository mSubTeacherRepository;
    @Autowired
    private SubscriptionStudentRepository mSubStudentRepository;

    public TeacherService() {
    }

    public List<Teacher> getAll() {
        return this.mTeacherRepository.findAll();
    }

    public Teacher getTeacherById(String idTeacher) {
        return (Teacher)this.mTeacherRepository.findOne(idTeacher);
    }

    public void addTeacher(TeacherController.RequestTeacherDTO teacherDTO) {
        Teacher teacher = this.fillTeacher((String)null, teacherDTO);
        this.mTeacherRepository.save(teacher);
    }

    public boolean deleteTeacherById(String idTeacher) {
        boolean response = false;
        boolean teacherOk = false;
        List<SubscriptionTeachers> subscriptionTeachers = this.mSubTeacherRepository.findAll();
        List<SubscriptionStudents> subscriptionStudents = this.mSubStudentRepository.findAll();

        if(subscriptionTeachers.size() == 0) {
            this.mTeacherRepository.delete(idTeacher);
            response = true;
        } else {

            for (int i = 0; i < subscriptionTeachers.size() && !teacherOk; i++) {

                SubscriptionTeachers sub = subscriptionTeachers.get(i);
                if (sub.getTeacher().getId().equals(idTeacher)) {

                    String idCourse = sub.getCourse().getId();
                    teacherOk = findSubStudentCourseId(idCourse, subscriptionStudents);

                }
            }

            if (!teacherOk) {
                mTeacherRepository.delete(idTeacher);
                cleanTeacherEmpty(subscriptionTeachers);
                response = true;
            }
        }

        return response;
    }

    public void updateTeacher(String idTeacher, TeacherController.RequestTeacherDTO updateTeacherDTO) {
        Teacher teacher = this.fillTeacher(idTeacher, updateTeacherDTO);
        this.mTeacherRepository.save(teacher);
    }

    private Teacher fillTeacher(String idTeacher, TeacherController.RequestTeacherDTO teacherDTO) {
        Teacher teacher;
        if(idTeacher == null) {
            teacher = new Teacher();
        } else {
            teacher = (Teacher)this.mTeacherRepository.findOne(idTeacher);
        }

        teacher.setCode(teacherDTO.getCode());
        teacher.setCi(teacherDTO.getCi());
        teacher.setName(teacherDTO.getName());
        teacher.setLastname(teacherDTO.getLastname());
        teacher.setEmail(teacherDTO.getEmail());
        teacher.setAddress(teacherDTO.getAddress());
        teacher.setPhone(teacherDTO.getPhone());
        teacher.setSalary(teacherDTO.getSalary());
        return teacher;
    }

    // Function for Find CourseID SubscriptionStudents
    private boolean findSubStudentCourseId(String courseId, List<SubscriptionStudents> listItems) {
        boolean founded = false;

        for (int i = 0; i < listItems.size(); i++) {
            SubscriptionStudents subStudent = listItems.get(i);
            if (subStudent.getCourse().getId().equals(courseId)) {
                founded = true;
                break;
            }
        }

        return founded;
    }

    private void cleanTeacherEmpty(List<SubscriptionTeachers> subsTeachers) {

        for (int i = 0; i < subsTeachers.size(); i++) {
            SubscriptionTeachers sub = subsTeachers.get(i);

            if(sub.getTeacher() == null) {
                mSubTeacherRepository.delete(sub.getId());
            }
        }
    }
}
