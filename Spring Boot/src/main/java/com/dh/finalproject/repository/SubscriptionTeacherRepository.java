package com.dh.finalproject.repository;

import com.dh.finalproject.domain.SubscriptionTeachers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public interface SubscriptionTeacherRepository extends MongoRepository<SubscriptionTeachers, String> {
    @Query("{'idTeacher' : {$regex:?0}}")
    SubscriptionTeachers findByIdTeacher(String var1);

    @Query("{'idCourse': ?0}")
    SubscriptionTeachers findByIdCourse(String var1);
}
