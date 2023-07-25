export const emailValidator = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
    return {
      isEmailValid: false,
      msg: "please enter a valid email address",
    };
  }
  return {
    isEmailValid: true,
    msg: "email address entered is valid",
  };
};
