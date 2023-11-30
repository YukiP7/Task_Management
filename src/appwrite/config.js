import conf from "../conf/conf.js"
import {Client , ID , Databases  , Query} from "appwrite"

export class Service {
    client = new Client() ;
    databases ;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) 
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client) ;
    }

    async createTask({ title , slug , description , startFrom , endAt , typeOf_task , task_status}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                ID.unique() ,
                slug ,
                {
                   title ,
                   description ,
                   startFrom ,
                   endAt ,
                   typeOf_task ,
                   task_status, 
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createTask :: error" , error);
        }
    }

    async getTasks(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
            )
        } catch (error) {
            console.log("Appwrite service :: getTasks :: error" , error);
        }
    }

    async updateTask(ID , slug , {title , description , startFrom , endAt , typeOf_task , task_status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                ID,
                slug ,
                {
                    title ,
                    description ,
                    startFrom ,
                    endAt ,
                    typeOf_task ,
                    task_status, 
                 }
            )
        } catch (error) {
            console.log("Appwrite service :: editTask :: error" , error);
        }
    }

    async deleteTask(ID){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                ID
            )
            return true 
        } catch (error) {
            console.log("Appwrite service :: deleteTask :: error" , error);
            return false 
        }
    }

    async getCompletedTask(queries = [Query.equal("task_status" , "Completed")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getCompletedTask :: error" , error);
        }
    }

    async getPendingTask(queries = [Query.equal("task_status" , "Pending")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPendingTask :: error" , error);
        }
    }
    
    async getTask(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getTask :: error" , error);
        }
    }
} 

const service = new Service() ;
export default service ;