import React, { useState, useCallback } from 'react'
import {
    Card, Popover, Button, Avatar, List, Comment,
} from 'antd'
import {
    RetweetOutlined,
    HeartOutlined,
    HeartTwoTone,
    MessageOutlined,
    EllipsisOutlined,
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import PostImages from './PostImages'
import CommentForm from './CommentForm'
import PostCardContent from './PostCardContent'
import styled from 'styled-components'

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

function PostCard({ post }) {
    const [liked, setLiked] = useState(false)
    const [commentFormOpened, setCommentFormOpened] = useState(false)

    const id = useSelector((state) => state.user.me?.id)

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev)
    }, [])

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev)
    }, [])

    return (
        <CardWrapper key={post.id}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />} 
                actions={[ 
                    <RetweetOutlined key="retweet" />,
                    liked 
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="commnet" onClick={onToggleComment} />,
                    <Popover 
                        key="more" 
                        content={(
                            <Button.Group>
                                {id && post.User.id === id 
                                    ? (
                                        <>
                                            <Button type="primary">Edit</Button>
                                            <Button type="danger">Delete</Button>
                                        </>
                                    ) 
                                    : <Button>Report</Button>}
                            </Button.Group>
                        )}
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
            >
                <Card.Meta 
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
                {/* <Button></Button> */}
            </Card>
            {commentFormOpened && (
                <>
                    <CommentForm post={post} />
                    <List 
                        header={`${post.Comments.length} comments`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
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
                </>
            )}
        </CardWrapper>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        User: PropTypes.shape({
            id: PropTypes.number,
            nickname: PropTypes.string,
        }),
        content: PropTypes.string,
        createdAt: PropTypes.shape({

        }),
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard
