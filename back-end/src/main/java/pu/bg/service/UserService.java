package pu.bg.service;

import org.springframework.stereotype.Service;
import pu.bg.models.dto.UserDTO;

@Service
public interface UserService {

    UserDTO createUser(UserDTO userDTO) throws Exception;

    UserDTO getUser(String username) throws Exception;

    UserDTO updateUser(String username, UserDTO updatedUser) throws Exception;

    void deleteUser(String username) throws Exception;
}
