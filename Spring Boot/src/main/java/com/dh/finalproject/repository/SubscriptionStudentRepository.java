package com.dh.finalproject.repository;

import com.dh.finalproject.domain.SubscriptionStudents;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public interface SubscriptionStudentRepository extends MongoRepository<SubscriptionStudents, String> {
    @Query("{'idCourse': ?0}")
    SubscriptionStudents findByIdCourse(String var1);

    @Query("{'idStudent': ?0}")
    void deleteMany(String var1);
}
