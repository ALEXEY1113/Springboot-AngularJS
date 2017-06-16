package com.dh.finalproject.web;

import com.dh.finalproject.domain.Student;
import com.dh.finalproject.service.StudentService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@RestController
@RequestMapping({"/students"})
@Api(
        value = "onlinestore",
        description = "Operation pertaining to Students"
)
public class StudentController {
    @Autowired
    StudentService mStudentService;

    public StudentController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET}
    )
    public List<Student> getStudents() {
        return this.mStudentService.getAllStudents();
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            value = {"/{id}"}
    )
    public Student getStudentById(@PathVariable String id) {
        return this.mStudentService.getStudentById(id);
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            value = {"/search/{name}"}
    )
    public List<Student> getStudentByName(@PathVariable String name) {
        return this.mStudentService.getStudentsByName(name);
    }

    @RequestMapping(
            method = {RequestMethod.POST}
    )
    public void createStudent(@RequestBody StudentController.RequestStudentDTO newStudent) {
        this.mStudentService.addStudent(newStudent);
    }

    @RequestMapping(
            method = {RequestMethod.DELETE},
            value = {"/{id}"}
    )
    public void deleteStudent(@PathVariable String id) {
        this.mStudentService.deleteStudent(id);
    }

    @RequestMapping(
            method = {RequestMethod.PUT},
            value = {"/{id}"}
    )
    public void setStudent(@RequestBody StudentController.RequestStudentDTO setStudent, @PathVariable String id) {
        this.mStudentService.updateStudent(id, setStudent);
    }

    public static class RequestStudentDTO {
        private long mCode;
        private long mCi;
        private String mName;
        private String mLastname;
        private String mEmail;
        private String mAddress;
        private long mPhone;

        public RequestStudentDTO() {
        }

        public RequestStudentDTO(String name, long cod, long ci, String lastname, String email, String address, long phone) {
            this.mName = name;
            this.mCode = cod;
            this.mCi = ci;
            this.mLastname = lastname;
            this.mEmail = email;
            this.mAddress = address;
            this.mPhone = phone;
        }

        public String getName() {
            return this.mName;
        }

        public void setName(String name) {
            this.mName = name;
        }

        public long getCode() {
            return this.mCode;
        }

        public void setCode(long code) {
            this.mCode = code;
        }

        public long getCi() {
            return this.mCi;
        }

        public void setCi(long ci) {
            this.mCi = ci;
        }

        public String getLastname() {
            return this.mLastname;
        }

        public void setLastname(String lastname) {
            this.mLastname = lastname;
        }

        public String getEmail() {
            return this.mEmail;
        }

        public void setEmail(String email) {
            this.mEmail = email;
        }

        public String getAddress() {
            return this.mAddress;
        }

        public void setAddress(String address) {
            this.mAddress = address;
        }

        public long getPhone() {
            return this.mPhone;
        }

        public void setPhone(long phone) {
            this.mPhone = phone;
        }
    }
}
