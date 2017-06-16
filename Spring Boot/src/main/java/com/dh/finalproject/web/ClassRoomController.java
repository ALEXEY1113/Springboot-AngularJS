package com.dh.finalproject.web;

import com.dh.finalproject.domain.ClassRoom;
import com.dh.finalproject.service.ClassRoomService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@RestController
@RequestMapping({"/classrooms"})
@Api(
        value = "onlinestore",
        description = "Operation pertaining to ClassRoom"
)
public class ClassRoomController {
    @Autowired
    ClassRoomService mClassRoomService;

    public ClassRoomController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET}
    )
    public List<ClassRoom> getClassRooms() {
        return this.mClassRoomService.getAll();
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            value = {"/{id}"}
    )
    public ClassRoom getClassRoomById(@PathVariable String id) {
        return this.mClassRoomService.getClassRoomById(id);
    }

    @RequestMapping(
            method = {RequestMethod.POST}
    )
    public void createClassRoom(@RequestBody ClassRoomController.RequestClassRoomDTO newClassRoom) {
        this.mClassRoomService.addClassRoom(newClassRoom);
    }

    @RequestMapping(
            method = {RequestMethod.DELETE},
            value = {"/{id}"}
    )
    public void deleteClassRoom(@PathVariable String id) {
        this.mClassRoomService.deleteClassRoomById(id);
    }

    @RequestMapping(
            method = {RequestMethod.PUT},
            value = {"/{id}"}
    )
    public void setClassRoom(@RequestBody ClassRoomController.RequestClassRoomDTO setClassRoom, @PathVariable String id) {
        this.mClassRoomService.updateClassRoom(id, setClassRoom);
    }

    public static class RequestClassRoomDTO {
        private String mCode;
        private int mCapacity;

        public RequestClassRoomDTO() {
        }

        public RequestClassRoomDTO(String code, int capacity) {
            this.mCode = code;
            this.mCapacity = capacity;
        }

        public String getCode() {
            return this.mCode;
        }

        public void setCode(String code) {
            this.mCode = code;
        }

        public int getCapacity() {
            return this.mCapacity;
        }

        public void setCapacity(int capacity) {
            this.mCapacity = capacity;
        }
    }
}
