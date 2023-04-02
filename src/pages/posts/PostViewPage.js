import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import PostDetails from "./PostDetails";

import Comment from "../comments/Comments";
import { useCurrentUser } from "../../context/CurrentUser";
import CommentDetail from "../comments/CommentDetail";

function PostViewPage() {

  const { id } = useParams();
  const [posts, setPosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comment, setComment] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
        try {
            const [{data: posts}, {data: comment}] = await Promise.all([
                axiosReq.get(`/posts/${id}`),
                axiosReq.get(`/comment/?posts=${id}`),
            ])
            setPosts({results: [posts]});
            setComment(comment);
        }   catch (err) {
            console.log(err);
        }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles</p>
        <PostDetails {...posts.results[0]} setPosts={setPosts} postViewPage/>
        <Container className={appStyles.Content}>
        {currentUser ? (
        <Comment
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          post={id}
          setPost={setPosts}
          setComment={setComment}
        />
        ) : comment.results.length ? (
         "Comments"
        ) : null}
        {comment.results.length ? (
          comment.results.map((comment) => (
            <CommentDetail key={comment.id} {...comment}
              
            />
          ))
        ) : currentUser ? (
          <span>Be the first to leave a comment</span>
        ) : (
          <span>This post has no comments yet.</span>
        )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostViewPage;