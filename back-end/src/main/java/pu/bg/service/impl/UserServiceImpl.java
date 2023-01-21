package pu.bg.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pu.bg.models.dto.UserDTO;
import pu.bg.models.entity.User;
import pu.bg.repository.UserRepository;
import pu.bg.service.UserService;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) throws Exception {
        // check if the email already exists
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new Exception("Username already exists: " + userDTO.getUsername());
        }

        User user = modelMapper.map(userDTO, User.class);

        // encrypt the password
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        // save the user to the database
        return modelMapper.map(userRepository.save(user), UserDTO.class);
    }

    @Override
    public UserDTO getUser(String username) throws Exception {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new Exception("User not found with username: " + username);
        }
        return modelMapper.map(user.get(), UserDTO.class);
    }

    @Override
    public UserDTO updateUser(String username, UserDTO updatedUser) throws Exception {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new Exception("User not found with username: " + username);
        }
        User userEntity = user.get();
        userEntity.setUsername(updatedUser.getUsername());
        userEntity.setEmail(updatedUser.getEmail());
        userEntity.setPhone(updatedUser.getPhone());
        userEntity.setPassword(updatedUser.getPassword());
        // Save the updated user to the database
        return modelMapper.map(userRepository.save(userEntity), UserDTO.class);
    }

    @Override
    public void deleteUser(String username) throws Exception {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new Exception("User not found with username: " + username);
        }
        userRepository.delete(user.get());
    }
}
