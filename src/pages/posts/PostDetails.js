import React from 'react'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { DropdownPost } from '../../components/DropdownPost';
import { useCurrentUser } from '../../context/CurrentUser';
import styles from '../../styles/PostDetails.module.css'

const PostDetails = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_on,
        postViewPage,
        setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const handleLike = async () => {
        try {
            const {data} = await axiosRes.post("/likes/", { post:id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? {...post, likes_count: post.likes_count + 1, like_id: data.id}
                        : post;
                }),
            }));
        } catch(err) {
            console.log(err)
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? {...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                }),
            }));
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <Card className={styles.PostDetails}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={50} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_on}</span>
                        {is_owner && postViewPage && <DropdownPost/>}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger 
                            placement='top'
                            overlay={<Tooltip>You already like your own post, but you can't show off...</Tooltip>}>
                            <i className={`fas fa-heart ${styles.Like}`} />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Like}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`fas fa-heart ${styles.LikeOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Nope, you got to log in before you can like a post.</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/posts/${id}`}>
                        <i className='far fa-comments' />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default PostDetails