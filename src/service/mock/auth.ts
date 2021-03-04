class AuthService {
  static login(payload: any) {
    try {
      //   const { account, password } = payload;
      return { isLogined: true, token: "12345678" };
    } catch (error) {}
  }

  static register(payload: any) {
    try {
      //   const { account, password } = payload;
      return { isLogined: true, token: "12345678" };
    } catch (error) {}
  }
}
export default AuthService;
