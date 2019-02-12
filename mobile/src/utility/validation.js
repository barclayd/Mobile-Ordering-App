const validate = (val, rules) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'minLength':
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            default:
                isValid = true;
        }
    }
    return isValid;
};

const minLengthValidator = (val, minLength) => {
    return parseInt(val.length) >=parseInt(minLength);
};

export default validate;
