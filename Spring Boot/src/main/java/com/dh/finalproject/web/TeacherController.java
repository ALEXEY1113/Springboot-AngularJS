package com.dh.finalproject.web;

import com.dh.finalproject.domain.Teacher;
import com.dh.finalproject.service.TeacherService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@RestController
@RequestMapping({"/teachers"})
@Api(
        value = "onlinestore",
        description = "Operation pertaining to Teachers"
)
public class TeacherController {
    @Autowired
    TeacherService mTeacherService;

    public TeacherController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET}
    )
    public List<Teacher> getTeachers() {
        return this.mTeacherService.getAll();
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            value = {"/{id}"}
    )
    public Teacher getTeacherById(@PathVariable String id) {
        return this.mTeacherService.getTeacherById(id);
    }

    @RequestMapping(
            method = {RequestMethod.POST}
    )
    public void createTeacher(@RequestBody TeacherController.RequestTeacherDTO newTeacher) {
        this.mTeacherService.addTeacher(newTeacher);
    }

    @RequestMapping(
            method = {RequestMethod.DELETE},
            value = {"/{id}"}
    )
    public boolean deleteTeacher(@PathVariable String id) {
        return this.mTeacherService.deleteTeacherById(id);
    }

    @RequestMapping(
            method = {RequestMethod.PUT},
            value = {"/{id}"}
    )
    public void setTeacher(@RequestBody TeacherController.RequestTeacherDTO setTeacher, @PathVariable String id) {
        this.mTeacherService.updateTeacher(id, setTeacher);
    }

    public static class RequestTeacherDTO {
        private long mCode;
        private long mCi;
        private String mName;
        private String mLastname;
        private String mEmail;
        private String mAddress;
        private long mPhone;
        private double mSalary;

        public RequestTeacherDTO() {
        }

        public RequestTeacherDTO(long code, long ci, String name, String lastname, String email, String address, long phone, double salary) {
            this.mCode = code;
            this.mCi = ci;
            this.mName = name;
            this.mLastname = lastname;
            this.mEmail = email;
            this.mAddress = address;
            this.mPhone = phone;
            this.mSalary = salary;
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

        public double getSalary() {
            return this.mSalary;
        }

        public void setSalary(double salary) {
            this.mSalary = salary;
        }
    }
}
