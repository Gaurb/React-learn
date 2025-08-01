import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";



export class AuthService{

    client;
    account;

    constructor(){
        this.client = new Client();
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const accountDetails= await this.account.create(ID.unique(),email,password,name);
            if(accountDetails){
                return this.login({email,password});
            }else{
                return accountDetails;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error getting current user:", error);
        }

        return null;
    }

    async logout(){
        try {
           return await this.account.deleteSessions(); 
        } catch (error) {
            console.log("Error logging out:", error);
        }
    }

}

const authService = new AuthService();

export default authService;