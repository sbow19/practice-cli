import boxen from "boxen";
import chalk from "chalk";

export const mainDescriptionBox = (inputText: string) =>{

    const mainText = chalk.red(inputText);

    return boxen(
        mainText,
        {
            padding: 1,
            margin: {
                bottom: 1
            },
            title: "Welcome",
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