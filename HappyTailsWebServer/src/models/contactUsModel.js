const mongoose = require('mongoose');
const { validateEmail } = require('../validators/userValidators');


const Schema = mongoose.Schema;

const contactUsSchema = new Schema(
	{
        userId: {
			type: mongoose.Schema.Types.ObjectId
		},
		fullName: {
			type: String,
			required: 'fullName is required.'
		},
		email: {
			type: String,
			lowercase: true,
			trim: true,
            required: 'email is required.',
            validate: {
                validator: validateEmail,
                message: 'Invalid email address'
            }
		},
		message: {
			type: String,
			minlength: 1,
			maxlength: 400,
            required: 'message is required.'
		},
		created_at: {
			type: Date,
			default: Date.now()
		}
	}
);

const ContactUs = mongoose.model('ContactUs', contactUsSchema);
module.exports = { ContactUs, contactUsSchema };
