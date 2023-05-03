
export const IsFormInvalid = (err) => {
    if (Object.keys(err).length > 0) return true;
    else return false;
};
