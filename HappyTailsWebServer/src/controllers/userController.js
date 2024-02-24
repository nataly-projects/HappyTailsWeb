const bcrypt = require('bcrypt');
const {User} = require('../models/userModel');
const { ContactUs } = require('../models/contactUsModel');
const {sendContactEmail, sendVerificationCodeEmail} = require('../services/mailService');
const { validatePhone, validateEmail } = require('../validators/userValidators');
const multer = require('multer');

// setup multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // specify the directory where store uploaded images
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        // rename the uploaded file 
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

async function signup(req, res) {
    try {
      console.log(req.body);
        const { fullName, email, phone, password } = req.body;

        // check if the email is already registered
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({ error: 'Email is already registered' });
        }

        // validate email and phone
        validateEmail(email);
        validatePhone(phone);
    
        // hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
          fullName,
          email,
          phone,
          password: hashedPassword,
        });

         const savedUser = await newUser.save();
         return res.json({ message: 'User signed up successfully', user: savedUser });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    } 
}

async function signin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(401).json({ error: 'No user found with that email' });
        }

        // check if the provided password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Incorrect password' });
        }
        res.status(200).json({ message: 'Signin successful', user });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });    
      }
}

async function updateUserById(req, res) {
  console.log('updateUserById: ');
    const {userId} = req.params; 
    const { fullName, email, phone } = req.body;
    let imagePath = null;
    if (req.file && req.file.path) {
      imagePath = req.file.path;
    }

    try {
        // check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (email && email != user.email) {

            isValid = validateEmail(email);
            if (isValid) {
              // check if the email is already registered
              const existingUser = await User.findOne({ email });
                
              if (existingUser) {
              return res.status(400).json({ error: 'Email is already registered' });
              }
              user.email = email;
            }
            return res.status(400).json({ error: 'Email is not valid' });
        }
        if (phone && phone != user.phone) {
            isValid = validatePhone(phone);
            if (isValid) {
              user.phone = phone;
            }
          return res.status(400).json({ error: 'Phone is not valid' });

        }
        if (fullName && fullName != user.fullName) {
            user.fullName = fullName;
        }
        if (imagePath && user.imageUrl != imagePath) {
          user.imageUrl = imagePath;
        }

        const updatedUser = await user.save();
        return res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}

async function getUserById(req, res) {
    const {userId} = req.params;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({user});
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}

async function postContactMessage(req, res) {
  const { userId, fullName, email, message } = req.body;

    try {
      if (email) {
        validateEmail(email);
      }
  
      const newMessage = new ContactUs({
        userId,
        fullName,
        email,
        message,
      });
  
        await newMessage.save();

        // send an email to the company
        await sendContactEmail(fullName, email, message);
        return res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


async function requestPasswordReset(req, res) {
    const { email } = req.body;
    try {
      // check if the email exists in the db
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'No user with the provided email was found' });
      }
  
      // generate a verification code and store it in the user document
      const verificationCode = generateVerificationCode();
      user.passVerificationCode = verificationCode;
      await user.save();
  
      // send the verification code to the user's email (use nodemailer)
      await sendVerificationCodeEmail(user.email, verificationCode);
  
      return res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  function generateVerificationCode() {
    const codeLength = 6; 
    const min = Math.pow(10, codeLength - 1);
    const max = Math.pow(10, codeLength) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  async function resetPasswordCode(req, res) {
    const { email, code } = req.body;
  console.log('resetPasswordCode: ', code, email);
    try {
      // get the user (already check if the email exists in the start of the reset password proccess)
      const user = await User.findOne({ email });

      // check if the code match
      if (user.passVerificationCode === code) {
        // code is correct, remove the passwordResetCode from the user document
        user.passVerificationCode = '';
        await user.save();
        return res.status(200).json({ message: 'Code is correct' });
      } else {
        return res.status(401).json({ error: 'Sorry, that\'s not the right code. Please try again' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

async function resetPassword(req, res) {
    const { email, newPassword } = req.body;
  console.log('resetPassword: ', email, newPassword);
    try {
      // find the user by email 
      const user = await User.findOne({ email});

      // hash and update the user password in the db
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  


module.exports = {
    signup,
    signin,
    updateUserById,
    getUserById,
    postContactMessage,
    requestPasswordReset,
    resetPasswordCode,
    resetPassword,
    upload
};