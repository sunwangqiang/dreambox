export class Dream {
    life:number;
    color:string;
    icon: string;
    title: string;
    content: string;
    time:string;
}
const Dreams: Dream[] = [
    {
        life:80,
        color:"green",
        icon:"heart",
        title: "Woody",
        content: "This town ain't big enough for the two of us!",
        time:"3:43 pm"
    },
    {
        life:100,
        color:"dark",
        icon:"calculator",
        title: "Buzz Lightyear",
        content: "My eyeballs could have been sucked from their sockets!",
        time:"1:12 pm"
    },
    {
        life:10,
        color:"danger",
        icon:"cloud",
        title: "Jessie",
        content: "Well aren't you just the sweetest space toy I ever did meet!",
        time:"3:43 pm"
    },
    {
        life:20,
        color:"danger",
        icon:"arrow-dropup-circle",
        title: "Mr. Potato Head",
        content: "You're not turning me into a Mashed Potato",
        time:"5:47 am"
    },
    {
        life:30,
        color:"danger",
        icon:"heart",
        title: "Woody",
        content: "This town ain't big enough for the two of us!",
        time:"3:43 pm"
    },
    {
        life:40,
        color:"danger",
        icon:"calculator",
        title: "Buzz Lightyear",
        content: "My eyeballs could have been sucked from their sockets!",
        time:"1:12 pm"
    },
    {
        life:50,
        color:"danger",
        icon:"cloud",
        title: "Jessie",
        content: "Well aren't you just the sweetest space toy I ever did meet!",
        time:"3:43 pm"
    },
    {
        life:60,
        color:"danger",
        icon:"arrow-dropup-circle",
        title: "Mr. Potato Head",
        content: "You're not turning me into a Mashed Potato",
        time:"5:47 am"
    },
    {
        life:70,
        color:"danger",
        icon:"heart",
        title: "Woody",
        content: "This town ain't big enough for the two of us!",
        time:"3:43 pm"
    },
    {
        life:80,
        color:"danger",
        icon:"calculator",
        title: "Buzz Lightyear",
        content: "My eyeballs could have been sucked from their sockets!",
        time:"1:12 pm"
    },
    {
        life:90,
        color:"danger",
        icon:"cloud",
        title: "Jessie",
        content: "Well aren't you just the sweetest space toy I ever did meet!",
        time:"3:43 pm"
    },
    {
        life:100,
        color:"danger",
        icon:"arrow-dropup-circle",
        title: "Mr. Potato Head",
        content: "You're not turning me into a Mashed Potato",
        time:"5:47 am"
    }
];

export class DataModel{
    get(key:string):any{

    }
    set(key:string, object:any){

    }
    list(key:string){
        return Dreams;
    }
    del(key:string){

    }
}

