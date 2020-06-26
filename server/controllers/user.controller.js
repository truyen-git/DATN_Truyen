const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {OAuth2Client} = require('google-auth-library');
const { use } = require('passport');
const CLIENT_ID = '921406465241-inujav2ovvtv9rl2e56t652iqk6a919p.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);


module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.signInGoogle = async (req, res, next) => {
    const tokenId = req.body.tokenId;
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: '921406465241-inujav2ovvtv9rl2e56t652iqk6a919p.apps.googleusercontent.com',
        });
        const ggEmail = ticket.payload.email;
        if (ggEmail) {
            const existUser = await User.findOne({ email: ggEmail});
            if (existUser) {
                return res.status(200).json({ "token": existUser.generateJwt()});
            } else {
                const user = new User();
                user.fullName = ticket.payload.name;
                user.email = ggEmail;
                user.password = "a,ndmn,n,sdasdfam";
                // user.googleProvider.id = ticket.payload.sub;
                try {
                    const savedUser = await user.save();
                    return res.status(200).json({ "token": savedUser.generateJwt()});
                } catch (error) {
                    return res.status(400).json(error);
                }
            }
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}
/*module.exports.signInGoogle = (req, res, next) => {
  //verify the token using google client
  return client
    .verifyIdToken({
      idToken: req.body.tokenId,
      audience: '921406465241-inujav2ovvtv9rl2e56t652iqk6a919p.apps.googleusercontent.com'
    })
    .then(login => {
      //if verification is ok, google returns a jwt
      var payload = login.getPayload();
      var userid = payload['sub'];

      //check if the jwt is issued for our client
      var audience = payload.aud;
      if (audience !== '921406465241-inujav2ovvtv9rl2e56t652iqk6a919p.apps.googleusercontent.com') {
        throw new Error(
          'error while authenticating google user: audience mismatch: wanted [' +
            '921406465241-inujav2ovvtv9rl2e56t652iqk6a919p.apps.googleusercontent.com' +
            '] but was [' +
            audience +
            ']'
        );
      }
      //promise the creation of a user
      return {
        name: payload['name'], //profile name
        pic: payload['picture'], //profile pic
        id: payload['sub'], //google id
        email_verified: payload['email_verified'],
        email: payload['email']
      };

    })
    .then(user => {
        const savedUser = user.save();
      return res.status(200).json({ "token": savedUser.generateJwt()});
    })
    .catch(err => {
      //throw an error if something gos wrong
      throw new Error(
        'error while authenticating google user: ' + JSON.stringify(err)
      );
    });
};*/

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}



