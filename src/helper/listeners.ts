import readline from "readline"

export const keypressListener = (): void=>{

    // Create an interface to listen to key presses
    readline.emitKeypressEvents(process.stdin);

    // Make sure the input stream is in raw mode (for keypress events to be emitted)
    process.stdin.setRawMode(true);
    
    // Define a function to handle key presses
    function handleKeyPress(str) {
        switch(str){
            case "q":
                console.log("Exiting...");
                process.exit(0);
            default:
                break
        }
    }

    // Listen for key presses
    process.stdin.on('keypress', handleKeyPress);


};

// export const gameExitListener = (activeState: boolean):void =>{

//     // Create an interface to listen to key presses
//     readline.emitKeypressEvents(process.stdin);

//     // Make sure the input stream is in raw mode (for keypress events to be emitted)
//     process.stdin.setRawMode(true);

//     // Define a function to handle key presses
//     function handleKeyPress(str, key) {
//         switch(str){
//             case "q":
//                 console.log("Exiting...");
//                 process.exit(0);
//             default:
//                 break
//         }
//     }
// }
   