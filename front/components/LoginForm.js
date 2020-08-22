import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { loginRequestAction } from '../reducers/user'

const ButtonWrapper = styled.div`
    margin-top: 10px
`

const FromWrapper = styled(Form)`
    padding: 10px
`

function LoginForm() {
    const dispatch = useDispatch()

    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')

    const { loginLoading } = useSelector((state) => state.user)

    const onSubmitForm = useCallback(() => {
        dispatch(loginRequestAction({ email, password }))
    }, [email, password])

    return (
        <FromWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">Email</label>
                <br />
                <Input 
                    name="user-email"
                    value={email}
                    type="email"
                    onChange={onChangeEmail}
                    required
                />
            </div>
            <div>
                <label htmlFor="user-password">Password</label>
                <br />
                <Input 
                    name="user-password" 
                    value={password} 
                    type="password"
                    onChange={onChangePassword} 
                    required 
                />
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={loginLoading}>Login</Button>
                <Link href="/signup"><a><Button>Signup</Button></a></Link>
            </ButtonWrapper>
        </FromWrapper>
    )
}

export default LoginForm
