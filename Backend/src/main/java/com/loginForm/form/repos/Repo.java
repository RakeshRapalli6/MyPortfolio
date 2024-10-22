package com.loginForm.form.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.loginForm.form.entities.User;


public interface Repo extends JpaRepository<User,Long> {

}
