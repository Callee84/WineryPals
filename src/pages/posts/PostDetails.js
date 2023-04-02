import React from 'react'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
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
        comment_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_on,
        PostViewPage,
        setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/post/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const {data} = await axiosRes.posts("/likes/", { posts:id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((posts) => {
                    return posts.id === id
                        ? {...posts, likes_count: posts.likes_count + 1, like_id: data.id}
                        : posts;
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
                results: prevPosts.results.map((posts) => {
                    return posts.id === id
                        ? {...posts, likes_count: posts.likes_count - 1, like_id: null }
                        : posts;
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
                        {is_owner && PostViewPage && (<DropdownPost handleEdit={handleEdit} handleDelete={handleDelete}/>)}
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
                    {comment_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default PostDetails