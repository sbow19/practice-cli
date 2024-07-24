const timeout = (time: number = 5000):Promise<void> =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        }, time)
    })
};

export default timeout;