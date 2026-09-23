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
    static getInvalidLoginUser() {
       return users.invalidLoginUser;
    }
    static getLoginBoundaryData() {
           return {
        minUsername: 'a',
        maxUsername: 'a'.repeat(50),
        exceedUsername: 'a'.repeat(200),
        minPassword: 'a',
        exceedPassword: 'a'.repeat(200)
};
}
    static getSpecialCharacterUsers() {
     return users.specialCharacterUsers;
     }


}
