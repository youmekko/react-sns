import React, { useCallback, useRef, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { addPost } from '../reducers/post'
import useInput from '../hooks/useInput'

function PostForm() {
    const dispatch = useDispatch()

    const { imagePaths, addPostDone } = useSelector((state) => state.post)
    const [text, onChangeText, setText] = useInput('')

    useEffect(() => {
        if (addPostDone) {
            setText('')
        }
    }, [addPostDone])

    const onSubmit = useCallback(() => {
        dispatch(addPost(text))
    }, [text])

    const imageInput = useRef()
    
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click()
    }, [imageInput.current])

    return (
        <Form 
            style={{ margin: '10px 0 20px' }} 
            encType="multipart/form-data"
            onFinish={onSubmit}
        >
            <Input.TextArea 
                value={text} 
                onChange={onChangeText} 
                maxLength={140} 
                placeholder="What happened to you!" 
            />

            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>Image Upload</Button>
                <Button type="primary" style={{ float: 'right' }} htmlType="submit">Tweet</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={v} style={{ width: '200px' }} alt={v} />
                        <div>
                            <Button>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default PostForm
