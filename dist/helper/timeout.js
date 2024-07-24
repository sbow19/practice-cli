const timeout = (time = 5000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};
export default timeout;
//# sourceMappingURL=timeout.js.map