// Validate bucket ID
function validateBucketId(bucketId) {
    if (!bucketId || bucketId === 'undefined') {
        throw new Error('❌ VITE_APPWRITE_BUCKET_ID is not set in your .env file')
    }
    
    if (bucketId.length > 36) {
        throw new Error(`❌ Bucket ID is too long (${bucketId.length} chars). Must be 36 chars or less.`)
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(bucketId)) {
        throw new Error('❌ Bucket ID contains invalid characters. Only a-z, A-Z, 0-9, and _ are allowed.')
    }
    
    if (bucketId.startsWith('_')) {
        throw new Error('❌ Bucket ID cannot start with an underscore.')
    }
    
    return true
}

const conf={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || 'https://cloud.appwrite.io/v1'),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || ''),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || ''),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID || ''),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || ''),
}

// Debug: Log environment variables
console.log("🔍 Environment Variables Debug:")
console.log("VITE_APPWRITE_URL:", import.meta.env.VITE_APPWRITE_URL)
console.log("VITE_APPWRITE_PROJECT_ID:", import.meta.env.VITE_APPWRITE_PROJECT_ID)
console.log("VITE_APPWRITE_DATABASE_ID:", import.meta.env.VITE_APPWRITE_DATABASE_ID)
console.log("VITE_APPWRITE_COLLECTION_ID:", import.meta.env.VITE_APPWRITE_COLLECTION_ID)
console.log("VITE_APPWRITE_BUCKET_ID:", import.meta.env.VITE_APPWRITE_BUCKET_ID)
console.log("Bucket ID length:", String(import.meta.env.VITE_APPWRITE_BUCKET_ID).length)

// Validate bucket ID
try {
    validateBucketId(conf.appwriteBucketId)
    console.log("✅ Bucket ID is valid")
} catch (error) {
    console.error(error.message)
    console.log("🔧 Please check your .env file and Appwrite setup")
}

// Free plan information
console.log("💡 MegaBlog Info:")
console.log("   - Using Appwrite free plan")
console.log("   - Image transformations may be limited")
console.log("   - Images will load as direct files (no resizing/optimization)")
console.log("   - For better image handling, consider upgrading your Appwrite plan")

export default conf;