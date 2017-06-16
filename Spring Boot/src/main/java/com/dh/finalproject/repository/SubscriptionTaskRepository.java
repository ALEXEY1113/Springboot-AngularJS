package com.dh.finalproject.repository;

import com.dh.finalproject.domain.SubscriptionTasks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public interface SubscriptionTaskRepository extends MongoRepository<SubscriptionTasks, String> {
    @Query("{'idCourse': ?0}")
    SubscriptionTasks findByIdCourse(String var1);

    @Query("{'idStudent': ?0}")
    void deleteMany(String var1);

    @Query("{'idTask': ?0}")
    void deleteManyByIdTask(String var1);
}
