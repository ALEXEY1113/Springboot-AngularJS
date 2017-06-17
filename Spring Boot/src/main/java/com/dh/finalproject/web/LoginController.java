package com.dh.finalproject.web;

import com.dh.finalproject.domain.Login;
import com.dh.finalproject.service.LoginService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by ALEXEY on 6/17/2017.
 */
@RestController
@RequestMapping("/login")
@Api(value = "onlinestore", description = "Section for LogIn")
public class LoginController {

    @Autowired
    private LoginService mLoginService;

    @RequestMapping(method = RequestMethod.GET, value = "/{username}")
    public Login getByUsername(@PathVariable String username) {
        return mLoginService.getByUsername(username);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addLogin(@RequestBody RequestLoginDTO login) {
        mLoginService.addLogin(login);
    }

    public static class RequestLoginDTO {

        private String mUsername;
        private String mPassword;

        public RequestLoginDTO () {  }

        public RequestLoginDTO(String username, String password) {
            mUsername = username;
            mPassword = password;
        }

        public String getUsername() {
            return mUsername;
        }

        public void setUsername(String username) {
            mUsername = username;
        }

        public String getPassword() {
            return mPassword;
        }

        public void setPassword(String password) {
            mPassword = password;
        }
    }
}
