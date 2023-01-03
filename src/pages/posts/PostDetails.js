import React from 'react'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
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
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

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
                        {is_owner && postViewPage && "..."}
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
                    ): like_id ? (
                        <span onClick={() => {}}>
                            <i className={`fas fa-heart ${styles.Like}`} />
                        </span>
                    ): currentUser ? (
                        <span onClick={() => {}}>
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