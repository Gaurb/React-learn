import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE } from '../index'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import appwriteService from '../../appwrite/config'
import Select from '../Select'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || 'active',
            },
        });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.user)

    const submit = async (data) => {
        if (!userData && !post) {
            console.error('User not authenticated');
            return;
        }
        
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
            } else {
                // No image uploaded, use placeholder
                data.featuredImage = 'placeholder'
            }
            console.log("📤 Sending post data:", { ...data, userId: userData?.$id });
            const dbPost = await appwriteService.createPost({ ...data, userId: userData?.$id })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            const slug = value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace one or more spaces with single hyphen
                .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
            return slug
        }
        return ''
    }, [])

    // Removed useEffect watch to prevent conflicts with onInput handler
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    onInput={(e) => {
                        const transformedSlug = slugTransform(e.currentTarget.value)
                        setValue("slug", transformedSlug, { shouldValidate: true })
                    }}
                />
                <Input
                    label="Slug (Auto-generated) :"
                    placeholder="Slug will be generated from title"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image (Optional) :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm