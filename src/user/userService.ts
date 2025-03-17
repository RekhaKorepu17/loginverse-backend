export class User {
    imageUrl: string;
    firstName: string;
    lastName: string;
    constructor(imageUrl: string, firstName: string, lastName: string){
       this.imageUrl= imageUrl;
       this.firstName= firstName;           
       this.lastName= lastName;   
    }
}