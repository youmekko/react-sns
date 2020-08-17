import { Card, Avatar, Button } from 'antd'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'

function UserProfile () {

    const dispatch = useDispatch()

    const { me, isLoggingOut } = useSelector(state => state.user)

    const onLogout = useCallback(() => {
        dispatch(logoutRequestAction())
    }, [])
    
    return (
        <Card
            actions={[
                <div key="tweet">tweet<br/>0</div>,
                <div key="follows">follows<br/>0</div>,
                <div key="followers">followers<br/>0</div>
            ]}    
        >
            <Card.Meta 
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout} loading={isLoggingOut}>Logout</Button>
        </Card>
    )
}

export default UserProfile
