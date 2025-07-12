import React, { useEffect, useState } from 'react'
import {Container,PostForm} from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate,useParams } from 'react-router-dom'


function EditPost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    // Map attribute names for PostForm (Title is capitalized, others are lowercase)
                    const mappedPost = {
                        ...post,
                        title: post.Title,
                        // content, featuredImage, status, userId are already lowercase from the database
                    };
                    setPost(mappedPost);
                }
            })
        }else{
            navigate("/")
        }
    },[slug,navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>) : null

}

export default EditPost