import { Form, Input, Button } from 'antd'
import { useState, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPost } from '../reducers/post'


function PostForm() {
    const dispatch = useDispatch()

    const imagePaths = useSelector((state) => state.post.imagePaths)
    const [text, setText] = useState('')
    const imageInput = useRef()

    const onSubmit = useCallback(() => { 
        dispatch(addPost)
        setText('')
    }, [])

    const onChangeText = useCallback((e) => {
        setText(e.target.value)
    }, [])

    const onClickImageUpload = useCallback((e) => {
        imageInput.current.click()
    }, [imageInput.current])

    return (
        <Form 
            style={{ margin: '10px 0 20px' }} 
            encType="multipart/form-data"
            onFinish={onSubmit}>

            <Input.TextArea 
                value={text} 
                onChange={onChangeText} 
                maxLength={140} 
                placeholder="What happened to you!" />

                <div>
                    <input type="file" multiple hidden ref={imageInput} />
                    <Button onClick={onClickImageUpload}>Image Upload</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit">Tweet</Button>
                </div>
                <div>
                    {imagePaths.map((v) => (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={v} style={{ width: '200px'}} alt={v} />
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
