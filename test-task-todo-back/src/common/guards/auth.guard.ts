import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':');

    const admin = {
      adminUsername: this.configService.get('ADMIN_USERNAME'),
      adminPassword: this.configService.get('ADMIN_PASSWORD'),
    };
    if (admin.adminUsername === username && admin.adminPassword === password) {
      request.user = admin;
      return true;
    }

    throw new UnauthorizedException('Not authorized to access this route!');
  }
}
