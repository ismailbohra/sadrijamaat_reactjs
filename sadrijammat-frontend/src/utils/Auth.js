import moment from "moment";

const Auth = {
  isAuth() {
    return localStorage.getItem("authToken");
  },
  getUserId() {
    const userid =localStorage.getItem("userId");
    return userid;
  },
  getToken() {
    return localStorage.getItem("authToken");
  },
  signIn(payload) {
    const { token, user ,tokenExpiringAt } = payload;
    console.log(payload);
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiringAt", tokenExpiringAt);
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("userId", user._id);
  },

  
  getRoles() {
    const user = JSON.parse(localStorage.getItem("userData"));
    return user?.role || "MUMINEEN";
  },
  
  signOut() {
    localStorage.clear();
  },
  
};
export default Auth;
