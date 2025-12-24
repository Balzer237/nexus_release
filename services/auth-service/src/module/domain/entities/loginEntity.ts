export class LoginEntity{
    email:string;
    password:string;
    username:string;
    bio?:string;

    constructor(params:{
        email:string;
        password:string
        username:string;
        bio?:string
    }){
        Object.assign(this,params)
    }

    getPassword(){
        return this.password;
    }
    getEmail(){
        return this.email;
    }

}