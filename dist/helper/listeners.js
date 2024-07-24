import readline from "readline";
export const keypressListener = () => {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    function handleKeyPress(str, key) {
        switch (str) {
            case "q":
                console.log("Exiting...");
                process.exit(0);
            default:
                break;
        }
    }
    process.stdin.on('keypress', handleKeyPress);
};
//# sourceMappingURL=listeners.js.map