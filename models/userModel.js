mongoose = require("mongoose");
bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    unique: [true, "Please tell us your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  // Only un this function if password is actually modified
  if (!this.isModified("password")) return next();

  // Hash the passowrd with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.confirmPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
