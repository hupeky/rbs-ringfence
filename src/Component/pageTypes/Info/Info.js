import React, {Component} from 'react'

import PageButton from '../../../UI/pageButton/pageButton'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../Component/CentreContent/CentreContent'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'


class Info extends Component {
    state = {
        active: false
    }

    render () {
        let {info, buttonLabel, label, sliderRef} = this.props
        return (
            <React.Fragment>
                <ContentHolder>
                    <CentreContent>
                        {this.props.nickname}
                        {info}
                    </CentreContent>
                </ContentHolder>

                <ButtonHolder>
                    <PageButton buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
                </ButtonHolder>


            </React.Fragment>


        )
    }
}

export default Info