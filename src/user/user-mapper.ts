import { UserDTO } from "./model/user.model";
import { User } from "./user.entity";


    export function getUserDtoToUserEntity(userDTO: UserDTO): User {
        let userEntity = new User();
        userEntity.id = userDTO.id;
        userEntity.login = userDTO.login;
        userEntity.mail = userDTO.mail;
        userEntity.password = userDTO.password;

        return userEntity;
    }

    export function getUserEntityToUserDto(userEntity: User): UserDTO {
        let userDTO = new UserDTO(
            userEntity.id,
            userEntity.login,
            userEntity.password,
            userEntity.mail,
        );

        return userDTO;
    }
