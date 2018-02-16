/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as HubSpotStrategy } from 'passport-hubspot-oauth2.0';
import { Strategy as TokenStrategy } from './security/strategy';
//import { Strategy as CookieStrategy } from 'passport-cookie';
import { User, UserLogin, UserClaim, UserProfile } from './data/models';
import config from './config';
import jwt from 'jsonwebtoken';

/*

*/
const hubspotAuth = {
  url: 'https://app.hubspot.com/oauth/authorize/',
  clientId: 'c2011ac8-12fe-4d52-8cde-1283087babcf',
  clientSecret: '6bf12e11-e5cb-45ee-a5ba-81534e6a0bef',
  redirectUri: 'https://580a72aa.ngrok.io/login/hubspot/return',
  scope: ['contacts'],
  responseType: 'code',
  accessType: 'offline',
};

passport.use(
  new HubSpotStrategy(
    {
      clientID: hubspotAuth.clientId,
      clientSecret: hubspotAuth.clientSecret,
      callbackURL: hubspotAuth.redirectUri,
      scope: hubspotAuth.scope,
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {
      //ISSUE: This is never called
      console.log('&&&&&&&&&&&&&&&&&');
      console.log('&&&&&&&&&&&&&&&&&');
      console.log('&&&&&&&&&&&&&&&&&');
      console.log('&&&&&&&&&&&&&&&&&');
      console.log('&&&&&&&&&&&&&&&&&');
      console.log('&&&&&&&&&&&&&&&&&');
      console.log('req.query.code: ', req.query.code);


      // Verify callback.
      done(null, { accessToken, refreshToken });
    },
  ),
);

passport.use(
  new TokenStrategy(function authenticate(req, token, done) {

    console.log('@@@@@@@@@@@@@@@@@@@ jwt: ', jwt);
    console.log('@@@@@@@@@@@@@@@@@@@ req.cookies.access_token:', req.cookies.access_token);
    console.log('@@@@@@@@@@@@@@@@@@@ config.auth.jwt.secret:', config.auth.jwt.secret);
    jwt.verify(req.cookies.access_token, config.auth.jwt.secret, (err, decoded) => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! req: ' + req);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! decoded: ' + decoded.access_code);
      //TODO: Would like this to not be here
      req.headers.authorization = 'Bearer ' + decoded.access_code;
      done(null, { code: decoded.access_code });
    });
    /*req.getInstance('AuthService').authorize(token)
      .then(userInfo =>
        userInfo ?
        req.getInstance('UserRepository').retrieveById(userInfo.userId)
          .then(([user]) => ({user, ...userInfo}))
        :
        null
      )
      .then(({user, roles, profileId, companyId, statusGroups, contactStatusGroups, companyStatusList}) => !user ?
        logInvalid(done) :
        done(null, {
          ..._.omit(user, ['password']),
          roles,
          profileId,
          companyId,
          statusGroups,
          contactStatusGroups,
          companyStatusList
        }, {}))
      .catch(logError(done));*/
  }.bind(this))
);

/**
 * Sign in with Facebook.
 */
passport.use(
  new FacebookStrategy(
    {
      clientID: config.auth.facebook.id,
      clientSecret: config.auth.facebook.secret,
      callbackURL: '/login/facebook/return',
      profileFields: [
        'displayName',
        'name',
        'email',
        'link',
        'locale',
        'timezone',
      ],
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      /* eslint-disable no-underscore-dangle */
      const loginName = 'facebook';
      const claimType = 'urn:facebook:access_token';
      const fooBar = async () => {
        if (req.user) {
          const userLogin = await UserLogin.findOne({
            attributes: ['name', 'key'],
            where: { name: loginName, key: profile.id },
          });
          if (userLogin) {
            // There is already a Facebook account that belongs to you.
            // Sign in with that account or delete it, then link it with your current account.
            done();
          } else {
            const user = await User.create(
              {
                id: req.user.id,
                email: profile._json.email,
                logins: [{ name: loginName, key: profile.id }],
                claims: [{ type: claimType, value: profile.id }],
                profile: {
                  displayName: profile.displayName,
                  gender: profile._json.gender,
                  picture: `https://graph.facebook.com/${
                    profile.id
                  }/picture?type=large`,
                },
              },
              {
                include: [
                  { model: UserLogin, as: 'logins' },
                  { model: UserClaim, as: 'claims' },
                  { model: UserProfile, as: 'profile' },
                ],
              },
            );
            done(null, {
              id: user.id,
              email: user.email,
            });
          }
        } else {
          const users = await User.findAll({
            attributes: ['id', 'email'],
            where: { '$logins.name$': loginName, '$logins.key$': profile.id },
            include: [
              {
                attributes: ['name', 'key'],
                model: UserLogin,
                as: 'logins',
                required: true,
              },
            ],
          });
          if (users.length) {
            const user = users[0].get({ plain: true });
            done(null, user);
          } else {
            let user = await User.findOne({
              where: { email: profile._json.email },
            });
            if (user) {
              // There is already an account using this email address. Sign in to
              // that account and link it with Facebook manually from Account Settings.
              done(null);
            } else {
              user = await User.create(
                {
                  email: profile._json.email,
                  emailConfirmed: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: `https://graph.facebook.com/${
                      profile.id
                    }/picture?type=large`,
                  },
                },
                {
                  include: [
                    { model: UserLogin, as: 'logins' },
                    { model: UserClaim, as: 'claims' },
                    { model: UserProfile, as: 'profile' },
                  ],
                },
              );
              done(null, {
                id: user.id,
                email: user.email,
              });
            }
          }
        }
      };

      fooBar().catch(done);
    },
  ),
);

export default passport;
