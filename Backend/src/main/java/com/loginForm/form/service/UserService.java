package com.loginForm.form.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.loginForm.form.entities.User;
import java.util.List;
import java.util.Optional;

import com.loginForm.form.repos.Repo;

@Service
public class UserService {

	@Autowired
	private Repo repo;

	public List<User> getUsers() {
		return repo.findAll();
	}	

	public User addUser(User user) {
		return repo.save(user);
	}

	public Optional<User> getUserById(Long id) {
		return repo.findById(id);
	}

	public void deleteUser(Long id) {
		repo.deleteById(id);
	}

	public void updateUser(User user) {
		repo.save(user);
	}
}	
