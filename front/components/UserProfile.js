import { Card, Avatar, Button } from 'antd'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'

function UserProfile () {

    const dispatch = useDispatch()

    const { me, logoutLoading } = useSelector(state => state.user)

    const onLogout = useCallback(() => {
        dispatch(logoutRequestAction())
    }, [])
    
    return (
        <Card
            actions={[
                <div key="tweet">{me.post.length}<br/>0</div>,
                <div key="follows">{me.Follows.length}<br/>0</div>,
                <div key="followers">{me.Followers.length}<br/>0</div>
            ]}    
        >
            <Card.Meta 
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout} loading={logoutLoading}>Logout</Button>
        </Card>
    )
}

export default UserProfile
