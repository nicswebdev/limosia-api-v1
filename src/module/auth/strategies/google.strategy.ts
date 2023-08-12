import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { GoogleAuthService } from '../services/google-auth/google-auth.service';
import { GoogleUserDetail } from '@/common/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GoogleAuthService)
    private readonly googleAuthService: GoogleAuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3333/api/v1/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log({ profile });
    const userData: GoogleUserDetail = {
      provider_user_id: profile.id,
      email: profile.emails[0].value,
      is_email_verified: profile.emails[0].verified === 'true',
      f_name: profile.name.givenName,
      l_name: profile.name.familyName,
      password: '',
    };

    const user = await this.googleAuthService.validateUser(userData);

    console.log('Validating... ', { accessToken, refreshToken, user });

    // return data || null;
    return user || null;
  }
}
