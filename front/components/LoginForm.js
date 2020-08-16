import { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers'

const ButtonWrapper = styled.div`
    margin-top: 10px
`

const FromWrapper = styled(Form)`
    padding: 10px
`

function LoginForm () {
    const dispatch = useDispatch()

    const [id, onChangeId] = useInput('')
    const [password, onChangePassword] = useInput('')

    const onSubmitForm = useCallback(() => {
        dispatch(loginAction({ id, password }))
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
