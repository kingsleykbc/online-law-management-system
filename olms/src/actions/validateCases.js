import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateCases(data) {
    let errors = {};

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title of this Case is Required";
    }
    if (Validator.isEmpty(data.key)) {
        errors.key = "This Case Needs an ID";
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "You need to describe the status of this case";
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = "You need to breifly describe this Case";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
