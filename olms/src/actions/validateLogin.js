import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateLawyers(data) {
    let errors = {};

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email required";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
