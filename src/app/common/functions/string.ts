import CryptoJS from 'crypto-js';

export function countCharacter(str = '', char = '') {
    let error = false;
    const regEx = new RegExp(char, 'gi');
    let count = 0;
    try {
        count = (str.match(regEx) || []).length;
    } catch (_) {
        error = true;
    }
    return ({ error, count })
}

export function hashPassword(password = '') {
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Hex);
}