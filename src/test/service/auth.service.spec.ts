import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDTO } from 'src/model/user/user.model';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  let userDTO = new UserDTO(
    0,
    'Alice',
    '1234',
    'truc@pmail.com'
  )

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByLogin: jest.fn().mockReturnValue(userDTO)
          }

        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test_token')
          }
        },
      ],
    }).compile();
    jwtService = await module.get(JwtService);
    userService = await module.get(UserService);
    service =  await module.get(AuthService);
  });

  it('should call sign function and return token when login', async () => {
    let user = {
      id: 0,
      login: 'bob',
      password:'',
      mail:''
    }
    let spyOnJwtService = jest.spyOn(jwtService, 'sign');

    let loginResult = service.login(user);
    expect(spyOnJwtService).toBeCalledTimes(1);
    expect(spyOnJwtService).toBeCalledWith({
      login: 'bob',
      sub: 0
    });
    expect(loginResult).toEqual(Promise.resolve({access_token: 'test_token'}));
  });

  it('should call sign function and return exception when login failed', async () => {
    let user = {
      id: 0,
      login: 'bob',
      password:'',
      mail:''
    }
    let spyOnJwtService = jest.spyOn(jwtService, 'sign').mockImplementation(() =>{ 
      throw new HttpException("error", 400);
    });

    let loginResult = service.login(user);
    expect(spyOnJwtService).toBeCalledTimes(1);
    expect(spyOnJwtService).toBeCalledWith({
      login: 'bob',
      sub: 0
    });
    expect(loginResult).rejects.toThrow(new HttpException('error token generation', 400));

  });

  it('should validate user and return user when validateUser is called', async () => {
    let spyOnUserService = jest.spyOn(userService, 'findByLogin')

    let validateUser = service.validateUser('Alice', '1234');
    
    expect(spyOnUserService).toBeCalledTimes(1);
    expect(spyOnUserService).toBeCalledWith('Alice');
    expect(validateUser).toEqual(Promise.resolve(userDTO));
  });

  it('should not validate user and return null when validateUser is called and password is wrong', async () => {
    let spyOnUserService = jest.spyOn(userService, 'findByLogin')

    let validateUser = service.validateUser('Alice', '124');
    
    expect(spyOnUserService).toBeCalledTimes(1);
    expect(spyOnUserService).toBeCalledWith('Alice');
    expect(validateUser).toEqual(Promise.resolve(null));
  });

  it('should return error error when validateUser throws error', async () => {
    let spyOnUserService = jest.spyOn(userService, 'findByLogin').mockImplementation(() =>{ 
      throw new HttpException("error", 400);
    });

    let validateUser = service.validateUser('Alice', '124');
    
    expect(spyOnUserService).toBeCalledTimes(1);
    expect(spyOnUserService).toBeCalledWith('Alice');
    expect(validateUser).rejects.toThrow(new HttpException('error find login', 400));
  });
});
