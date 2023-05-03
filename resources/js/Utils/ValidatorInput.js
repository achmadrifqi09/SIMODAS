import validator from "validator";

const validatorInput = (inputErrors, target) => {
    const { name, value } = target;
    Object.keys(inputErrors).forEach((key) => {
        try {
            if (name === key && !validator.isEmpty(value)) {
                inputErrors[key] = false;
            } else if (name === key) {
                inputErrors[key] = true;
            }
        } catch {
            const typeData = checkTypeData(value);
            if (
                typeData === "object" &&
                name === key &&
                Object.keys(value).length > 0
            ) {
                inputErrors[key] = false;
            } else if (
                typeData === "array" &&
                name === key &&
                value.length > 0
            ) {
                inputErrors[key] = false;
            } else if (name === key) {
                inputErrors[key] = true;
            }
        }
    });
    return inputErrors;
};

const checkTypeData = (val) => {
    return typeof val;
};

const checkAllInputIsCorrect = (inputErrors) => {
    const isWrong = (value) => {
        return value === true;
    };
    const values = Object.values(inputErrors);
    return values.some(isWrong);
};

export { validatorInput, checkAllInputIsCorrect };
