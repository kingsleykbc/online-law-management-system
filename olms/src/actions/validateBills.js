import Validator from 'validator';
import _ from 'lodash';

export default function validateBilla(data) {
    let errors = {};

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title of bill is Required";
    }
    if (Validator.isEmpty(data.amount)) {
        errors.amount = "Amount is required";
    }
    if (Validator.isEmpty(data.clientID)) {
        errors.clientID = "You must select a client";
    }
    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}
