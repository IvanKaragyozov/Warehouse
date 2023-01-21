package pu.bg.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {

    @Size(min = 5, max = 15)
    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @Size(min = 10)
    private String phone;

    @Size(min = 6, max = 20)
    @NotBlank
    private String password;

}
