import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { GoogleAuthService } from '../services/google-auth/google-auth.service';
import { GoogleUserDetail } from '@/common/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly googleAuthService: GoogleAuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
    });
  }

  async validate(idToken: string) {
    // console.log(idToken);
    // For example, using 'google-auth-library' to verify the token:
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');
    try {
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      // The token is valid. You can access the user's information from the ticket object.
      const payload = ticket.getPayload();
      const user = {
        email: payload.email,
        is_email_verified: payload.email_verified,
        f_name: payload.given_name,
        l_name: payload.family_name,
        password: '',
      };
      console.log(await this.googleAuthService.validateUser(user))
      return await this.googleAuthService.validateUser(user);
    } catch (error) {
      // Token verification failed, throw an UnauthorizedException.
      throw new UnauthorizedException('Invalid Google access token');
    }
  }
}
