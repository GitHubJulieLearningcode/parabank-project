import users from '../testData/user.json';

export class TestData {

    static getValidUser() {
        return users.registration;
    }
    static getRegistrationData() {
      return users.registration;
}
    static getInvalidUser()
    {
        return users.invalidUser;
    }

}
