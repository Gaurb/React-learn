import React,{useEffect,useState} from "react";
import appwriteService from "../appwrite/config";
import { Container,PostCard, Button } from "../components";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Home() {
    const [posts,setPosts]= useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false))
    },[])

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-semibold text-gray-600">
                                Loading posts...
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
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    Welcome to MegaBlog! 📝
                                </h1>
                                <p className="text-lg text-gray-600 mb-6">
                                    Please login to see and create amazing blog posts
                                </p>
                                <div className="space-x-4">
                                    <Link to="/login">
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            Login
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

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-3xl font-bold hover:text-gray-500">
                                No Posts Available
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Be the first to create a post!
                            </p>
                            <Link to="/add-post" className="mt-4 inline-block">
                                <Button>Create Post</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {
                        posts.map((post)=>(
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post}/>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Home