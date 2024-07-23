import boxen from "boxen";
import chalk from "chalk";

export const mainDescriptionBox = (inputText: string, title = "") =>{

    const mainText = chalk.red(inputText);

    return boxen(
        mainText,
        {
            padding: 1,
            margin: {
                bottom: 1
            },
            title: title,
            titleAlignment: "center",
            borderStyle: {
                left: "#",
                right: "#",
                top: "-",
                bottom: "-",
                topLeft: '#',
                topRight: '#',
                bottomLeft: '#',
                bottomRight: '#'
            },
            align: "center",
            borderColor: "white",
            backgroundColor: "black",
        }
    )
}