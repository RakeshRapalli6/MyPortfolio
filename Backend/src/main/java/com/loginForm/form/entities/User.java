package com.loginForm.form.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import javax.persistence.Enumerated;


@Entity
@Table(name = "users")
public class User {	

	@Column(name="id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name="user_name")
	private String userName;
	@Column(name="password")
	private String password;

	public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String username) {
        this.userName = username;
    }

	public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	// @Enumerated(EnumType.STRING)
	// private Role role;

}

// public enum Role {
// 	USER,
// 	ADMIN
// }

