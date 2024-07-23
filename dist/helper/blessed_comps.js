import blessed from "blessed";
import chalk from "chalk";
export const introBox = () => {
    const screen = blessed.screen({
        smartCSR: true,
        title: "Welcome to the Practice CLI!",
        top: 0,
        left: 0
    });
    const introText = blessed.box({
        content: "Small CLI tool to show off some basic JS packages",
        width: "40%",
        height: "30%",
        border: {
            type: "bg",
            ch: chalk.white("#")
        },
        fg: "red",
        bg: "black",
        align: "center",
        valign: "middle",
        padding: 1,
    });
    screen.append(introText);
    screen.render();
};
//# sourceMappingURL=blessed_comps.js.map