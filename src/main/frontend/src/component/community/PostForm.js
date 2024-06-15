import React, { Fragment, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPost } from '../../services/communityService';
import Breadcrumb from "../common/breadcrumb/breadcrumb";

const PostForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state?.category || 'default category';
    const [memberNickname, setMemberNickname] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('memberNickname', memberNickname);
        formData.append('category', category);
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            await createPost(formData);
            alert('Post created successfully');
            navigate(-1);  // Navigate back to the previous page
        } catch (error) {
            alert('Failed to create post');
        }
    };

    return (
        <Fragment>
            <Breadcrumb parent="Community / create-post" title="게시글 작성" />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Member Nickname:</label>
                    <input type="text" value={memberNickname} onChange={(e) => setMemberNickname(e.target.value)} />
                </div>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    );
};

export default PostForm;