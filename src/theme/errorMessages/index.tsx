const ErrorMessages = {
  name: {
    empty: 'Please enter Full name',
    valid: 'Please enter valid Full name',
  },
  userName: {
    empty: 'Please enter username',
    valid: 'Please enter valid username',
    pattern: 'Username must be 7 to 30 characters long and start with a letter. It can only contain letters, digits, underscores, hyphens, or periods'
  },
  lastName: {
    empty: 'Please enter last name',
    valid: 'Please enter valid last name',
  },
  emailId: {
    empty: 'Please enter email address',
    valid: 'Please enter valid email address',
  },
  phoneNumber :{
    empty: 'Please enter phone number',
    valid: 'Please enter valid phone number',
  },
  password: {
    empty: 'Please enter password',
    valid:
      'Password should contain at least 1 uppercase, 1 lowercase, 1 special character (Valid special characters: !@#$%^&*+-_=), 1 number, no whitespaces and should be at least 8 characters in length',
    match: 'Passwords do not match'
  },
  confirmPassword: {
    empty: 'Please enter confirm password',
    valid:
      'Password should contain at least 1 uppercase, 1 lowercase, 1 special character (Valid special characters: !@#$%^&*+-_=), 1 number, no whitespaces and should be at least 8 characters in length',
      match: 'Passwords do not match',
      same: 'Current Password and New Password are Same',
  },
  forgotPassword:{
    empty: 'Enter your email, phone, or unique ID'
  }
};

export default ErrorMessages;
