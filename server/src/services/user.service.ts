import { hash } from 'bcrypt';
import { User } from '../models/user';
import { AuthenticationType } from '../models/user';
// this is imported using require because nodemailer does not support
// typescript well. This is a workaround.
const nodemailer = require('nodemailer');

const createUser = async (email: string, password: string) => {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  if (!hashedPassword) {
    console.log('Error hashing password');
    return null;
  }
  const newUser = new User({
    accountType: AuthenticationType.Internal,
    email: email,
    password: hashedPassword,
    admin: false,
  });
  const user = await newUser.save();
  return user;
};

const getUserFromDB = async (email: string) => {
  const user = await User.findOne({ email: email }).exec();
  return user;
};

const getAllUsersFromDB = async () => {
  const userList = await User.find({});
  return userList;
};

/**
 * A function that upgrades a certain user to an admin.
 * @param email
 * @returns A boolean indicating whether the upgrade was successful or not
 */
const upgradeToAdmin = async (email: string) => {
  const user = await User.findOne({ email: email }).exec();
  if (user) {
    if (user.admin) {
      return false;
    }
    user.admin = !user.admin;
    const newUser = await user.save();
    return true;
  } else {
    return false;
  }
};

const deleteOne = async (email: string) => {
  const user = User.findByIdAndRemove({ email: email });
  return user;
};

// in user.service.ts file

const sendPasswordResetEmail = async (email: string) => {
  // const oauth2Client = new google.Auth.OAuth2Client(
  //   process.env.CLIENT_ID,
  //   process.env.CLIENT_SECRET,
  //   'https://developers.google.com/oauthplayground',
  // );

  // oauth2Client.setCredentials({
  //   refresh_token: process.env.REFRESH_TOKEN,
  // });

  // const accessToken = await new Promise((resolve, reject) => {
  //   oauth2Client.getAccessToken((err, token) => {
  //     if (err) {
  //       reject('Failed to create access token :(');
  //     }
  //     resolve(token);
  //   });
  // });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      // accessToken,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  // console.log('transporter: ', transporter);

  let mailOptions = {
    from: 'boilerplate.h4i@gmail.com',
    to: email,
    subject: 'Boilerplate Reset Password Email',
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://localhost:3000/reset/',
  };

  console.log('mailOptions: ', mailOptions);

  await transporter.sendMail(mailOptions, function (err: any, data: any) {
    if (err) {
      console.log('Error ' + err);
    } else {
      console.log('Email sent successfully');
    }
  });
};

export {
  createUser,
  getUserFromDB,
  getAllUsersFromDB,
  upgradeToAdmin,
  deleteOne,
  sendPasswordResetEmail,
};
