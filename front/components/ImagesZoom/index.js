import PropTypes from 'prop-types'
import Slick from 'react-slick'
import { useState } from 'react'
import { 
    Overlay,
    Global,
    Header,
    CloseButton,
    ImageWrapper,
    SlickWrapper,
    Indicator
} from './styles'

function ImagesZoom ({ images, onClose }) {
    const [currentSlide, setCurrentSlide] = useState(0)

    return (
        <Overlay>
            <Global />
            <Header>
                <h1>Images</h1>
                <CloseButton onClick={onClose}>X</CloseButton>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick 
                        initialSlide={0}
                        afterChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <ImageWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
                            </ImageWrapper>
                        ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {`${currentSlide + 1} / ${images.length}`}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    )
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired
}

export default ImagesZoom
