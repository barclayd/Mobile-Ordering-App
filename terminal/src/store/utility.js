export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const cloneArray = (arr) => {
    return JSON.parse(JSON.stringify(arr));
};
