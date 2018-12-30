import React, {Component} from 'react'
import Slider from 'react-slick'

import PrevArrow from '../../UI/prevArrow/prevArrow'
import NextArrow from '../../UI/nextArrow/nextArrow'

import "../../assets/module_css/slick.gcss"
import "../../assets/module_css/slick-theme.gcss"

class Carousel extends Component {
    state = {
        current: 0
    }

    render () {
        this.settings = {
            infinite: false,
            draggable: true,
            dots: false,
            swipe: true, 
            speed: 400,
            nextArrow: <NextArrow visible={true} />,
            prevArrow: <PrevArrow visible={true} />,
            afterChange: index => {

            },
            beforeChange: ( current, next ) => {
                this.props.onUpdate(next)
            }
        }
        return (
            <Slider {...this.settings}>
                {this.props.children}
            </Slider>
        )
    }
}

export default Carousel
