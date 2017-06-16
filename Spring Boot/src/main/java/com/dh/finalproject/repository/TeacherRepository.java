package com.dh.finalproject.repository;

import com.dh.finalproject.domain.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public interface TeacherRepository extends MongoRepository<Teacher, String> {
}
