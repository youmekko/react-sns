import { useState, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
    margin-top: 10px
`

const FromWrapper = styled(Form)`
    padding: 10px
`

function LoginForm({ setIsLoggedIn }) {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const onChangeId = useCallback((e) => {
        setId(e.target.value)
    }, [])

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    
    }, [])

    const onSubmitForm = useCallback(() => {
        setIsLoggedIn(true)
    }, [id, password])

    return (
        <FromWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">Id</label>
                <br />
                <Input 
                    name="user-id" 
                    value={id} 
                    onChange={onChangeId} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="user-password">Password</label>
                <br />
                <Input 
                    name="user-password" 
                    value={password} 
                    onChange={onChangePassword} 
                    required 
                />
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={false}>Login</Button>
                <Link href="/signup"><a><Button>Signup</Button></a></Link>
            </ButtonWrapper>
        </FromWrapper>
    )
}

export default LoginForm
