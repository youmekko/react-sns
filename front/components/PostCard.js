import { Card, Popover, Button, Avatar, List, Comment } from 'antd'
import { useState, useCallback } from 'react' 
import { 
    RetweetOutlined, 
    HeartOutlined, 
    HeartTwoTone,
    MessageOutlined, 
    EllipsisOutlined
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import PostImages from './PostImages'
import CommentForm from '../components/CommentForm'
import PostCardContent from '../components/PostCardContent'

function PostCard({ post }) {
    const [liked, setLiked] = useState(false)
    const [commentFormOpended, setCommentFormOpended] = useState(false)

    const id = useSelector(state => state.user.me?.id)

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev)
    }, [])

    const onToggleComment = useCallback(() => {
        setCommentFormOpended((prev) => !prev)
    }, [])

    return (
        <div style={{ marginBottom : '20px' }}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />} 
                actions={[ 
                    <RetweetOutlined key="retweet" />,
                    liked 
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike}/>,
                    <MessageOutlined key="commnet" onClick={onToggleComment}/>,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id 
                            ? (
                                <>
                                    <Button type="primary">Edit</Button>}
                                    <Button type="danger">Delete</Button>
                                </>
                            ) 
                            : <Button>Report</Button>}
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Card.Meta 
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
                <Button></Button>
            </Card>
            {commentFormOpended && (
                <div>
                    <CommentForm post={post} />
                    <List 
                        header={`${post.Comments.length} comments`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    /> 
                </div>)}
            {/* <CommentForm />
            <Comments /> */}
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Commnets: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
}

export default PostCard
  