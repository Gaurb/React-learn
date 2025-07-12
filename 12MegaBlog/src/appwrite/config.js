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
            console.log("🔄 Creating post with data:", {title, slug, content: content?.substring(0, 50) + "...", featuredImage, status, userId});
            
            const response = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    Title: title,
                    content: content,
                    featuredImage: featuredImage,
                    status: status,
                    userId: userId
                }
            );
            
            console.log("✅ Post created successfully:", response);
            return response;
        } catch (error) {
            console.error("❌ Error creating post:", error);
            console.error("Error details:", {
                message: error.message,
                type: error.type,
                code: error.code
            });
            
            if (error.message.includes("authorized")) {
                console.error("🔒 PERMISSION ERROR: Check your Appwrite collection permissions!");
                console.error("📋 You need to set permissions for:");
                console.error("   - Create documents (users)");
                console.error("   - Read documents (users or any)");
                console.error("   - Update documents (users)");
                console.error("   - Delete documents (users)");
            }
            
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {
            const response = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    Title: title,
                    content: content,
                    featuredImage: featuredImage,
                    status: status
                }
            );
            return response;
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
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

    async getPosts(queries=[Query.equal("status","active")]){
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
            console.log("🔄 Uploading file:", file.name, file.size + " bytes");
            
            const response = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            
            console.log("✅ File uploaded successfully:", response);
            return response;
        } catch (error) {
            console.error("❌ Error uploading file:", error);
            console.error("Error details:", {
                message: error.message,
                type: error.type,
                code: error.code
            });
            
            if (error.message.includes("authorized")) {
                console.error("🔒 PERMISSION ERROR: Check your Appwrite storage permissions!");
                console.error("📋 You need to set permissions for:");
                console.error("   - Create files (users)");
                console.error("   - Read files (users or any)");
                console.error("   - Update files (users)");
                console.error("   - Delete files (users)");
            }
            
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
            // Use getFileView instead of getFilePreview to avoid transformation limitations
            console.log("📸 Loading image with file ID:", fileId);
            return this.storage.getFileView(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.log("❌ Error getting file view:", error);
            if (error.message && error.message.includes("transformations")) {
                console.log("💡 TIP: You're on a free Appwrite plan. Image transformations are limited.");
                console.log("🔧 SOLUTION: Upgrade your plan or upload smaller images.");
            }
            // Return a placeholder URL if file viewing fails
            return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
        }
    }

    // Alternative method to get file download URL (works on free plan)
    getFileDownloadUrl(fileId) {
        try {
            return this.storage.getFileDownload(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Error getting file download URL:", error);
            return null;
        }
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;