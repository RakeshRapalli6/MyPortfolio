package com.loginForm.form.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.loginForm.form.entities.User;
import com.loginForm.form.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")  
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> getUsers() {
		return userService.getUsers();
	}

	@GetMapping("/user/{id}")
	public Optional<User> getUserById(@PathVariable("id") Long id) {
		return userService.getUserById(id);
	}


	@PostMapping
	public User saveUserToDb(@RequestBody User user) {
		return userService.addUser(user);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		return userService.getUserById(id)
				.map(user -> {
                userService.deleteUser(id);
                return ResponseEntity.ok("User deleted successfully.");
            })
            .orElse(ResponseEntity.notFound().build());
	}


	@PatchMapping("/{id}")
	public ResponseEntity<Object> updateUserPassword(@PathVariable Long id, @RequestBody Map<String, String> updates) {
		Optional<User> optionalUser = userService.getUserById(id);
		
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
		
			if (updates.containsKey("password")) {
				user.setPassword(updates.get("password"));
				userService.updateUser(user);  
				return ResponseEntity.ok("Password updated successfully");
			} else {
				return ResponseEntity.badRequest().body("Password field is missing");
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
