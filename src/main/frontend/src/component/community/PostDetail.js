import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPostDetails, getCommentsByPostId, addComment, likePost, unlikePost, deletePost, isPostLikedByUser, likeComment, unlikeComment, updateComment, deleteComment } from '../../services/communityService';
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Input,
    Form
} from "reactstrap";

const PostDetail = () => {
    const { postId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const category = location.state?.category || 'default category';
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const currentUserNickname = 'heeggung'; // 임시로 하드코딩된 사용자 닉네임

    useEffect(() => {
        const loadPostDetails = async () => {
            const postDetails = await getPostDetails(postId);
            const likedByUser = await isPostLikedByUser(postId, currentUserNickname);
            setPost({ ...postDetails, liked: likedByUser });
        };

        const loadComments = async () => {
            const commentsData = await getCommentsByPostId(postId, currentUserNickname);
            setComments(commentsData);
        };

        loadPostDetails();
        loadComments();
    }, [postId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        const commentData = {
            postId: postId,
            memberNickname: currentUserNickname, // 나중에 로그인된 사용자 정보로 변경
            content: newComment
        };

        try {
            const addedComment = await addComment(commentData);
            setComments([addedComment, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const handleEditComment = async (commentId) => {
        try {
            await updateComment(commentId, { memberNickname: currentUserNickname, content: editingCommentContent });
            const updatedComments = await getCommentsByPostId(postId, currentUserNickname);
            setComments(updatedComments);
            setEditingCommentId(null);
            setEditingCommentContent('');
        } catch (error) {
            console.error('Failed to edit comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId, currentUserNickname);
            const updatedComments = await getCommentsByPostId(postId, currentUserNickname);
            setComments(updatedComments);
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const handleLikePost = async () => {
        try {
            if (post.liked) {
                await unlikePost(postId, currentUserNickname);
                setPost(prevPost => ({ ...prevPost, liked: false, like_count: prevPost.like_count - 1 }));
            } else {
                await likePost(postId, currentUserNickname);
                setPost(prevPost => ({ ...prevPost, liked: true, like_count: prevPost.like_count + 1 }));
            }
        } catch (error) {
            console.error('Failed to like/unlike post:', error);
        }
    };

    const handleLikeComment = async (commentId, liked) => {
        try {
            if (liked) {
                await unlikeComment(commentId, currentUserNickname); // 임시로 'heeggung' 사용
            } else {
                await likeComment(commentId, currentUserNickname); // 임시로 'heeggung' 사용
            }
            const updatedComments = await getCommentsByPostId(postId, currentUserNickname);
            setComments(updatedComments);
        } catch (error) {
            console.error('Failed to like/unlike comment:', error);
        }
    };

    const handleEditPost = () => {
        navigate(`${process.env.PUBLIC_URL}/community/create-post`, { state: { category, postId } });
    };

    const handleDeletePost = async () => {
        try {
            await deletePost(postId, currentUserNickname);
            navigate(`${process.env.PUBLIC_URL}/community/${category}`); // 삭제 후 카테고리 게시판 목록 페이지로 이동
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <Breadcrumb parent={`Community / ${category}`} title="게시물 상세 페이지" />
            <Container fluid={true}>
                <Row className="justify-content-center">
                    <Col sm="12" xl="8">
                        <Card style={{ borderColor: '#6c63ff' }}>
                            <CardHeader className="bg-primary text-white">
                                <h5>{post.title}</h5>
                                {post.memberNickname === currentUserNickname && (
                                    <div>
                                        <Button color="warning" onClick={handleEditPost}>수정</Button>
                                        <Button color="danger" onClick={handleDeletePost}>삭제</Button>
                                    </div>
                                )}
                            </CardHeader>
                            <CardBody>
                                {post.image_url && <img src={`/uploads/${post.image_url}`} alt={post.title} style={{ maxWidth: '100%' }} />}
                                <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>{post.content}</div>
                            </CardBody>
                            <CardFooter className="d-flex justify-content-between align-items-center">
                                <span>작성자: {post.memberNickname}</span>
                                <span>
                                    <span
                                        role="img"
                                        aria-label="heart"
                                        style={{ cursor: 'pointer', color: post.liked ? 'red' : 'grey' }}
                                        onClick={handleLikePost}
                                    >
                                        {post.liked ? '❤️' : '♡'}
                                    </span> {post.like_count}
                                    <span style={{ marginLeft: '10px' }}>Created at: {new Date(post.created_at).toLocaleString()}</span>
                                </span>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center" style={{ marginTop: '20px' }}>
                    <Col sm="12" xl="8">
                        <Card style={{ borderColor: '#6c63ff' }}>
                            <CardHeader className="bg-primary text-white">
                                <h5>댓글</h5>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleAddComment}>
                                    <Input
                                        type="textarea"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="댓글을 작성하려면 로그인 해주세요!"
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <Button type="submit" color="primary">댓글 작성</Button>
                                </Form>
                                {comments.map((comment) => (
                                    <Card key={comment.id} style={{ marginTop: '20px', border: 'none', boxShadow: 'none' }}>
                                        <CardBody style={{ backgroundColor: '#6c63ff', borderRadius: '10px', padding: '10px' }}>
                                            <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px' }}>
                                                {editingCommentId === comment.id ? (
                                                    <Input
                                                        type="textarea"
                                                        value={editingCommentContent}
                                                        onChange={(e) => setEditingCommentContent(e.target.value)}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    <div style={{ backgroundColor: '#f8d7da', padding: '10px', borderRadius: '10px' }}>
                                                        {comment.content}
                                                    </div>
                                                )}
                                                <CardFooter className="d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent', borderTop: 'none', padding: '10px 0' }}>
                                                    <span>작성자: {comment.memberNickname}</span>
                                                    <span>
                                                        <span
                                                            role="img"
                                                            aria-label="heart"
                                                            onClick={() => handleLikeComment(comment.id, comment.liked)}
                                                            style={{ cursor: 'pointer', color: comment.liked ? 'red' : 'grey' }}
                                                        >
                                                            {comment.liked ? '❤️' : '♡'}
                                                        </span> {comment.likeCount}
                                                        <span style={{ marginLeft: '10px' }}>작성일: {new Date(comment.createdAt).toLocaleString()}</span>
                                                    </span>
                                                    {comment.memberNickname === currentUserNickname && (
                                                        <div>
                                                            {editingCommentId === comment.id ? (
                                                                <>
                                                                    <Button color="primary" size="sm" onClick={() => handleEditComment(comment.id)}>저장</Button>
                                                                    <Button color="secondary" size="sm" onClick={() => setEditingCommentId(null)}>취소</Button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Button color="warning" size="sm" onClick={() => {
                                                                        setEditingCommentId(comment.id);
                                                                        setEditingCommentContent(comment.content);
                                                                    }}>수정</Button>
                                                                    <Button color="danger" size="sm" onClick={() => handleDeleteComment(comment.id)}>삭제</Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </CardFooter>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default PostDetail;