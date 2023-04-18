import validator from "validator";

const validatorInput = (inputErrors, target) => {
    const { name, value } = target;
    Object.keys(inputErrors).forEach((key) => {
        if (name === key && !validator.isEmpty(value)) {
            inputErrors[key] = false;
        } else if (name === key) {
            inputErrors[key] = true;
        }
    });
    return inputErrors;
};

const checkAllInputIsCorrect = (inputErrors) => {
    const isWrong = (value) => {
        return value === true;
    };
    const values = Object.values(inputErrors);
    return values.some(isWrong);
};

export { validatorInput, checkAllInputIsCorrect };
