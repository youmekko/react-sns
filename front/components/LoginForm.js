import { useState, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'

function LoginForm() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const onChangeId = useCallback((e) => {
        setId(e.target.value)
    }, [])

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    
    }, [])

    return (
        <Form>
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
            <div>
                <Button type="primary" htmlType="submit" loading={false}>Login</Button>
                <Link href="/signup"><a><Button>Signup</Button></a></Link>
            </div>
        </Form>
    )
}

export default LoginForm
