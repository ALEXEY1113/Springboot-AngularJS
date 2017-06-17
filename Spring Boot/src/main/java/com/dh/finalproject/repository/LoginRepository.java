package com.dh.finalproject.repository;

import com.dh.finalproject.domain.Login;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by ALEXEY on 6/17/2017.
 */
public interface LoginRepository extends MongoRepository<Login, String> {

    @Query("{'mUsername': ?0}")
    Login findByUsername(String username);
}
