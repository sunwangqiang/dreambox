
function MakeRandomString(length:number, possible?:string)
{
    let text = "";
    let possibleString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    if(possible){
        possibleString = possible;
    }
    for( let i = 0; i < length; i++ ){
        text += possibleString.charAt(Math.floor(Math.random() * possibleString.length));
    }

    return text;
}

export { MakeRandomString }