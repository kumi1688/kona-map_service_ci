import React from 'react';
import {Carousel} from "react-bootstrap";

const CarouselComponent = ({info}) => {
    return (
        <div>
            <Carousel>
                {info.imageUrl.map(url => (
                    <Carousel.Item key={url}>
                        <img
                            width="100%"
                            height="auto"
                            src={url}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
