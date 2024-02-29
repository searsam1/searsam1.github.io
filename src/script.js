const crypto = require('crypto');

const allCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~';

function secureRandomNumber(max) {
    return crypto.randomInt(max);
}

const getRandomCharacter = () => {
    const randomCharacter = allCharacters[secureRandomNumber(allCharacters.length)]
    return randomCharacter;
} 

const getRandomPassword = (length = 10) => {
    let randomPassword = '';
    for (let i = 0; i < length; i++) {
        randomPassword += getRandomCharacter();
    } 
    return randomPassword;
}

const newPassword = getRandomPassword();
console.log(newPassword);
// outputs something like: VIwC#_>f=@
