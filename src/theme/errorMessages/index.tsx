const ErrorMessages = {
  userName: {
    empty: 'Please enter full name',
    valid: 'Please enter valid full name',
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
  },
  confirmPassword: {
    empty: 'Please enter confirm password',
    valid:
      'Password should contain at least 1 uppercase, 1 lowercase, 1 special character (Valid special characters: !@#$%^&*+-_=), 1 number, no whitespaces and should be at least 8 characters in length',
      match: 'Confirm Password does not matched with New Password',
      same: 'Current Password and New Password are Same',
  },
};

export default ErrorMessages;
