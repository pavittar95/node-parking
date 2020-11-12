/* -----------------------------------------------------------------------
   * @ description : Main module to include all the messages used in project.
----------------------------------------------------------------------- */

export default {
  accept: "Accepted",
  confirm: "Confirmed",
  success: "Success!",
  systemError: "Technical error ! Please try again later.",
  userNameAlreadyExists: "Username is already registered.",
  emailAlreadyExists: "Email is already registered with us.",
  slotAlreadyExists: "Slot number is already added.",
  parkAlready: "This slot is already parked.",
  unparkAlready: "This slot is already unparked.",
  emailNotExists: "Email is not registered with us.",
  phoneNumberNotExists: "Phone Number not registered.",
  userAdded: "User successfully add!.",
  tokenExpired: "Session Expired.",
  tokenVerified: "Token has been verified",
  loginSuccessfull: "Logged in successfully.",
  logoutSuccessfull: "Logged out successfully.",
  invalidCredentials: "Invalid credentials.",
  userUpdate: "User Profile successfully updated.",
  unauthorizedUser: "You are not an authorized user for this action.",
  userAuthenticated: "User authenticated successfully.",
  verifyTokenExpired: "Token has been expired.",
  userBlocked: "Your account has been blocked! Please contact with admin.",
  accountDeleted: "You account hes been deleted! Please contact with admin.",
  updateStatus: (status) => `User has been ${status} successfully.`,
};
