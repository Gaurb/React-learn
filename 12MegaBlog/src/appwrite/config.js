import conf from "../conf/conf";
import { Databases,Storage,Query,Client, ID } from "appwrite";

export class AppwriteService {

    client;
    database;
    storage;

    constructor() {
        this.client = new Client();
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    getDatabase() {
        return this.database;
    }

    getStorage() {
        return this.storage;
    }

    getClient() {
        return this.client;
    }

    async getDocument({databaseId, collectionId, documentId}) {
        try {
            return await this.database.getDocument(databaseId, collectionId, documentId);
        } catch (error) {
            console.error("Error getting document:", error);
            throw error;
        }
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {
            await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.error("Error updating post:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Error deleting post:", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Error getting posts:", error);
            throw error;
        }
    }

    async getPosts(queries=[Query.equal("index","active")]){
        try {
            const documents=await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            return documents;
        } catch (error) {
            console.error("Error getting posts:", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            const response = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,fileId);
        } catch (error) {
            console.log("Error getting file preview:", error);
            
        }
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;