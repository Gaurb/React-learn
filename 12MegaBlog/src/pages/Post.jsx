import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Container, Button } from '../components';
import parse from 'html-react-parser';

function Post() {
    const [post,setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state)=> state.auth.user)
    const authStatus = useSelector((state) => state.auth.status)

    const isAuthor= post && userData ? post.userId === userData.$id : false;

    const handleImageError = () => {
        setImageError(true);
    };

    useEffect(()=>{
        if(slug){
            setImageError(false); // Reset image error for new post
            appwriteService.getPost(slug).then((post)=>{
                if(post) setPost(post)
                else navigate("/")
            }).finally(() => setLoading(false))
        }else{
            navigate("/")
        }
    },[slug,navigate])

    const deletePost=()=>{
        appwriteService.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteService.deleteFile(post.featuredImage);
                navigate("/")
            }
        })
    }

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-semibold text-gray-600">
                                Loading post...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    🔐 Login Required
                                </h1>
                                <p className="text-lg text-gray-600 mb-6">
                                    Please login to read this post
                                </p>
                                <div className="space-x-4">
                                    <Link to="/login">
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            Login to Read
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

  return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredImage && post.featuredImage !== 'placeholder' && !imageError ? (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.Title}
                            className="rounded-xl max-w-full max-h-96 object-contain"
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="rounded-xl w-full h-64 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                            <span className="text-gray-500 text-xl">
                                {imageError ? "🖼️ Image Unavailable (Free Plan Limitation)" : "📝 No Featured Image"}
                            </span>
                        </div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.Title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post