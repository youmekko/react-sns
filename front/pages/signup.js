import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import { Form, Input, Checkbox, Button } from 'antd'
import { useState, useCallback } from 'react'
import useInput from '../hooks/useInput'
import styled from 'styled-components'

const ErrorMessage = styled.div`
    color: red
`

function signup() {
    const [id, onChangeId] = useInput('')
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

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true)
        }

        if (!term) {
            return setTermError(true)
        }

        console.log(id, nickname, password)

    }, [password, passwordCheck, term])

    return (
        <>
        <Head>
            <title>Signup | React SNS</title>
        </Head>
        <AppLayout>
            <Form onFinish={onSubmit}> 
                <div>
                    <label htmlFor="user-id">Id</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId} />
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
                <div style={{marginTop: 10}}>
                    <Button type="primary" htmlType="submit">
                        Signup
                    </Button>
                </div>
            </Form>
        </AppLayout>
    </>
    )
}

export default signup
