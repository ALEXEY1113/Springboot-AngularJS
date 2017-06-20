package com.dh.finalproject.repository;

import com.dh.finalproject.domain.SubscriptionTasks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by ALEXEY on 6/16/2017.
 */
public interface SubscriptionTaskRepository extends MongoRepository<SubscriptionTasks, String> {

}
