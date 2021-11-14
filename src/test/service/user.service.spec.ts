import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/entity/user.entity';
import { UserDTO } from 'src/model/user/user.model';
import { UserService } from 'src/service/user.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

fdescribe('UserService', () => {
  let userService: UserService;
  let userRepository: MockType<Repository<User>>;

  let userDTO = new UserDTO(
    0,
    'Alice',
    '1234',
    'truc@pmail.com'
  )

  let userEntity = new User();
  userEntity.id = 1;
  userEntity.login = 'Alice';
  userEntity.mail = 'truc@pmail.com';
  userEntity.password = '1234'
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(Promise.resolve(userEntity)),
            save: jest.fn().mockImplementation(x => Promise.resolve(userEntity)),
          }
        }

      ],
    }).compile();
    userService = await module.get(UserService);
    userRepository = module.get(getRepositoryToken(User));

  });

  it('should return user when create user in db and save is ok', async () => {
    let createdUser = await userService.createUser(userDTO);

    console.log(createdUser)
    let expectedUser= {id:1, login:'Alice', password: '1234', mail:'truc@pmail.com' }
    
    expect(createdUser).toEqual(expectedUser);
  });

  // it('should return user when create user in db and save is not ok', async () => {
  //   jest.spyOn(userRepository, 'save').mockImplementation(() => {throw new HttpException("error", 400);})

  //   let createdUser = await userService.createUser(userDTO);

  //   expect(createdUser).toEqual({id:1, login:'Alice', password: '1234', mail:'truc@pmail.com' });
  // });

  it('should return user ', async () => {
    let userFoundByLogin = await userService.findByLogin(userDTO.login);
    expect(userFoundByLogin).toEqual( {id: 1, login:'Alice', password: '1234', mail:'truc@pmail.com' });
  });

});
