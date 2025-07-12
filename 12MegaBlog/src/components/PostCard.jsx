import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'


function PostCard({$id, Title, featuredImage}) {
  // Support both old and new attribute names for backwards compatibility
  const title = Title;
  
  const handleImageError = (e) => {
    // If image fails to load, hide it and show placeholder
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };
  
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
            <div className='w-full justify-center mb-4 relative'>
                {featuredImage && featuredImage !== 'placeholder' ? (
                    <>
                        <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title} 
                        className='rounded-xl w-full h-48 object-cover'
                        onError={handleImageError}
                        />
                        <div className='rounded-xl w-full h-48 bg-gradient-to-r from-blue-100 to-purple-100 items-center justify-center' style={{display: 'none'}}>
                            <span className='text-gray-500 text-lg'>🖼️ Image Unavailable</span>
                        </div>
                    </>
                ) : (
                    <div className='rounded-xl w-full h-48 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center'>
                        <span className='text-gray-500 text-lg'>📝 No Image</span>
                    </div>
                )}
            </div>
            <h2
            className='text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard