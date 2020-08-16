import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import ImagesZoom from './ImagesZoom'


function PostImages({ images }) {
    const [showImagesZoom, setShowImagesZoom] = useState(false)

    const onZoom = useCallback(() => {
        setShowImagesZoom(true) 
    }, [])

    const onClose = useCallback(() => {
        setShowImagesZoom(false)
    }, [])

    if (images.length === 1) {
        return (
            <>
                <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} /> }
            </>
        )
    } 
    if (images.length === 2) {
        return (
            <>
                <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
                <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={images[1].src} alt={images[1].src} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} /> }
            </>
        )
    }

    return (
        <>
             <img role="presentation" style={{ width: '50%', display: 'inline-block'  }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
             <div
                role="presentation"
                style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
                onClick={onZoom}
             >
                 <PlusOutlined />
                 <br />
                 Show {images.length - 1} more Images...
             </div>
             {showImagesZoom && <ImagesZoom images={images} onClose={onClose} /> }
        </>
    )
}

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object)
}

export default PostImages
