
'use strict';

class Datagenerator extends Helper {

    userCredentials(email,password){
        return {
            email: email,
            password: password
        }
    }
}

module.exports = Datagenerator;