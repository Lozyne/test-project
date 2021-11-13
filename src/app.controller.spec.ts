import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ResponseToken } from './response-token.model';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let authService: AuthService;
  let responseToken = new ResponseToken('45s4545');

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn().mockReturnValue(responseToken)
          }
        } 
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    authService = app.get<AuthService>(AuthService);

    await app.init();
  });

  it('should ensure the LocalAuthGuard is applied to the login method', async () => {
    const guards = Reflect.getMetadata('__guards__', AppController.prototype.login)
    const guard = new (guards[0])
  
    expect(guard).toBeInstanceOf(LocalAuthGuard)
  });

  it('should ensure the LocalAuthGuard is applied to the getProfile method', async () => {
    const guards = Reflect.getMetadata('__guards__', AppController.prototype.getProfile)
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

    let response: ResponseToken = await appController.login(request)

    expect(spyOnAuthService).toBeCalledTimes(1);
    expect(spyOnAuthService).toHaveBeenCalledWith(request.user);
    expect(response).toEqual(response);
    expect(response).not.toEqual({access_token: 'dsqdds'});

  });
});
