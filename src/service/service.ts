export class Dream {
    icon: string;
    title: string;
    content: string;
    time:string;
}
const Dreams: Dream[] = [
    {
        icon:"heart",
        title: "Woody",
        content: "This town ain't big enough for the two of us!",
        time:"3:43 pm"
    },
    {
        icon:"calculator",
        title: "Buzz Lightyear",
        content: "My eyeballs could have been sucked from their sockets!",
        time:"1:12 pm"
    },
    {
        icon:"cloud",
        title: "Jessie",
        content: "Well aren't you just the sweetest space toy I ever did meet!",
        time:"3:43 pm"
    },
    {
        icon:"arrow-dropup-circle",
        title: "Mr. Potato Head",
        content: "You're not turning me into a Mashed Potato",
        time:"5:47 am"
    },
    {
        icon:"heart",
        title: "Woody",
        content: "This town ain't big enough for the two of us!",
        time:"3:43 pm"
    },
    {
        icon:"calculator",
        title: "Buzz Lightyear",
        content: "My eyeballs could have been sucked from their sockets!",
        time:"1:12 pm"
    },
    {
        icon:"cloud",
        title: "Jessie",
        content: "Well aren't you just the sweetest space toy I ever did meet!",
        time:"3:43 pm"
    },
    {
        icon:"arrow-dropup-circle",
        title: "Mr. Potato Head",
        content: "You're not turning me into a Mashed Potato",
        time:"5:47 am"
    },
    {
        icon:"heart",
        title: "Woody",
        content: "This town ain't big enough for the two of us!",
        time:"3:43 pm"
    },
    {
        icon:"calculator",
        title: "Buzz Lightyear",
        content: "My eyeballs could have been sucked from their sockets!",
        time:"1:12 pm"
    },
    {
        icon:"cloud",
        title: "Jessie",
        content: "Well aren't you just the sweetest space toy I ever did meet!",
        time:"3:43 pm"
    },
    {
        icon:"arrow-dropup-circle",
        title: "Mr. Potato Head",
        content: "You're not turning me into a Mashed Potato",
        time:"5:47 am"
    }
];

export class Service{
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

