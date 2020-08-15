import { Card, Avatar, Button } from 'antd'
import { useCallback } from 'react'

function UserProfile({ setIsLoggedIn }) {

    const onLogout = useCallback(() => {
        setIsLoggedIn(false)
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
                avatar={<Avatar>YM</Avatar>}
                title="Youmekko"
            />
            <Button onClick={onLogout}>Logout</Button>
        </Card>
    )
}

export default UserProfile
