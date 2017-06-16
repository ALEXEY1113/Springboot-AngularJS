package com.dh.finalproject.repository;

import com.dh.finalproject.domain.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public interface StudentRepository extends MongoRepository<Student, String> {
    @Query("{'name': {$regex:?0}}")
    List<Student> findByName(String var1);
}
