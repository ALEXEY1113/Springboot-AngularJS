package com.dh.finalproject.repository;

import com.dh.finalproject.domain.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public interface CourseRepository extends MongoRepository<Course, String> {
}
