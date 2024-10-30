export let devLog = (message: any) => {
    if (import.meta.env.MODE === 'development') {
        console.log(JSON.parse(JSON.stringify(message)));
    }
}; 