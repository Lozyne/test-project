import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from 'src/controller/auth.controller';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { ResponseToken } from 'src/model/auth/response-token.model';
import { AuthService } from 'src/service/auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let responseToken = new ResponseToken('45s4545');

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn().mockReturnValue(responseToken)
          }
        } 
      ],
    }).compile();
    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);

    await app.init();
  });

  it('should ensure the LocalAuthGuard is applied to the login method', async () => {
    const guards = Reflect.getMetadata('__guards__', AuthController.prototype.login)
    const guard = new (guards[0])
  
    expect(guard).toBeInstanceOf(LocalAuthGuard)
  });

  it('should ensure the LocalAuthGuard is applied to the getProfile method', async () => {
    const guards = Reflect.getMetadata('__guards__', AuthController.prototype.getProfile)
    const guard = new (guards[0])
  
    expect(guard).toBeInstanceOf(JwtAuthGuard)
  });

  it('should return token', async () => {
    let spyOnAuthService = jest.spyOn(authService, 'login');

    let request = {
      body: {
        "username": "bob",
        "password": "1234"  
      },
      user: {
        id: 0,
        login: 'bob',
        password:'testpass',
        mail:'test@mail.fr'
      }
    }

    let response: ResponseToken = await authController.login(request)

    expect(authService).toBeDefined();
    expect(spyOnAuthService).toBeCalledTimes(1);
    expect(spyOnAuthService).toHaveBeenCalledWith(request.user);
    expect(response).toEqual(response);
    expect(response).not.toEqual({access_token: 'dsqdds'});

  });
});
