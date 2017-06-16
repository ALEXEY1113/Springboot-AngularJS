package com.dh.finalproject.repository;

import com.dh.finalproject.domain.ClassRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public interface ClassRoomRepository extends MongoRepository<ClassRoom, String> {
}
