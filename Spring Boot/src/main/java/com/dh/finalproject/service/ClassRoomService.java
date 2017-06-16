package com.dh.finalproject.service;

import com.dh.finalproject.domain.ClassRoom;
import com.dh.finalproject.repository.ClassRoomRepository;
import com.dh.finalproject.web.ClassRoomController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Service
public class ClassRoomService {
    @Autowired
    ClassRoomRepository mClassRoomRepository;

    public ClassRoomService() {
    }

    public List<ClassRoom> getAll() {
        return this.mClassRoomRepository.findAll();
    }

    public ClassRoom getClassRoomById(String idClassRoom) {
        return (ClassRoom)this.mClassRoomRepository.findOne(idClassRoom);
    }

    public void addClassRoom(ClassRoomController.RequestClassRoomDTO classRoomDTO) {
        ClassRoom classRoom = new ClassRoom();
        classRoom.setCode(classRoomDTO.getCode());
        classRoom.setCapacity(classRoomDTO.getCapacity());
        this.mClassRoomRepository.save(classRoom);
    }

    public void deleteClassRoomById(String idClassRoom) {
        this.mClassRoomRepository.delete(idClassRoom);
    }

    public void updateClassRoom(String idClassRoom, ClassRoomController.RequestClassRoomDTO updateClassRoomDTO) {
        ClassRoom classRoom = (ClassRoom)this.mClassRoomRepository.findOne(idClassRoom);
        classRoom.setCode(updateClassRoomDTO.getCode());
        classRoom.setCapacity(updateClassRoomDTO.getCapacity());
        this.mClassRoomRepository.save(classRoom);
    }
}
