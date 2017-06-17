package com.dh.finalproject.service;

import com.dh.finalproject.domain.Login;
import com.dh.finalproject.repository.LoginRepository;
import com.dh.finalproject.web.LoginController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by ALEXEY on 6/17/2017.
 */
@Service
public class LoginService {

    @Autowired
    private LoginRepository mLoginRepository;

    public Login getByUsername(String username) {
        return mLoginRepository.findByUsername(username);
    }

    public void addLogin(LoginController.RequestLoginDTO loginDTO) {

        Login login = new Login();
        login.setUsername(loginDTO.getUsername());
        login.setPassword(loginDTO.getPassword());

        mLoginRepository.save(login);
    }
}
