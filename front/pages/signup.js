import React, { useState, useCallback } from 'react'
import Head from 'next/head'
import {
    Form, Input, Checkbox, Button,
} from 'antd'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import useInput from '../hooks/useInput'
import { SIGNUP_REQUEST } from '../actions/user'

const ErrorMessage = styled.div`
    color: red
`
function signup() {
    const dispatch = useDispatch()
    const { signupLoading } = useSelector((state) => state.user)

    const [email, onChangeEmail] = useInput('')
    const [nickname, onChangeNickname] = useInput('')
    const [password, onChangePassword] = useInput('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState(false)

    const [term, setTerm] = useState(false)
    const [termError, setTermError] = useState(false)
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value)
        setPasswordError(e.target.value !== password)
    }, [password])

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked)
        setTermError(false)
    }, [])

    // eslint-disable-next-line consistent-return
    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true)
        }

        if (!term) {
            return setTermError(true)
        }

        dispatch({
            type: SIGNUP_REQUEST,
            data: { email, password, nickname },
        })
    }, [email, password, passwordCheck, term])

    return (
        <>
            <Head>
                <title>Signup | React SNS</title>
            </Head>
            <AppLayout>
                <Form onFinish={onSubmit}> 
                    <div>
                        <label htmlFor="user-email">Email</label>
                        <br />
                        <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
                    </div> 
                    <div>
                        <label htmlFor="user-nickname">Nickname</label>
                        <br />
                        <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                    </div> 
                    <div>
                        <label htmlFor="user-password">Password</label>
                        <br />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                    </div> 
                    <div>
                        <label htmlFor="user-password-check">Password Check</label>
                        <br />
                        <Input 
                            name="user-password-check" 
                            type="password" 
                            value={passwordCheck}
                            required
                            onChange={onChangePasswordCheck} 
                        />
                        {passwordError && <ErrorMessage>Password does not match!</ErrorMessage>}
                    </div> 
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>I agree to the terms</Checkbox>
                        {termError && <ErrorMessage>Please agree to our terms!</ErrorMessage>}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit" loading={signupLoading}>
                            Signup
                        </Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
}

export default signup
