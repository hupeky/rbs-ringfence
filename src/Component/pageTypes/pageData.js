import React, {Component} from 'react'
import classes from './Page.css'
import * as planets from './../../assets/planets/planets'
import * as carousels from './../../assets/carousel/carousel'

import * as siteActions from '../../store/actions/siteActions'
import {connect} from 'react-redux'

import PrintName from './../../UI/printName/printName'


class pageData extends Component {
    static pages = [
        {
            type: 'Info', 
            info: <div className={'content'}>
                <h2 className={classes.header}>Starting screen</h2>
                <p className={classes.subText}><PrintName /> is a sub paragraph, This is a sub paragraph, This is a sub paragraph, This igrasdsdf ph, This is a sub paragraph, This is a sub paragraph, This is a sub paragraph, This is a sub paragraph, </p>
            </div>,
            buttonLabel: 'Get Started'
        },
        {
            type: 'PickAListQuestion',
            question: 'Which carousel is correct?',
            label: 'whichCarousel',
            questionItems: [
                {label: 'car1', image: carousels.carousel1}, // , funny: true if you want to have a funny answer also
                {label: 'car3', image: carousels.carousel3}, 
                {label: 'car2', image: carousels.carousel2},
            ],
            buttonType: 'carousel', // image
            buttonLabel: 'carousel?',
            correctAnswer: [false,true,false]
        },
        { 
            type: 'PickAListQuestion',
            label: 'whichCarousel',
            preFunny: 'Haha really?',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'This is the correct answer',
            buttonLabel: 'Continue',
        },

        {
            bonusQuestion: true,
            bonusLabel: 'bonus4',
            bonusTime: 5000,
            type: 'YesNoQuestion',
            label: 'questionasdasd',
            title: 'Page title',
            question: 'Question, is this question 1?',
            correctAnswer: [true],
            subText: 'This is a bit more explanation',
            questionItems: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
            
        },
        {
            bonusQuestion: true,
            bonusLabel: 'bonus10',
            bonusTime: 5000,
            type: 'YesNoQuestion',
            label: 'questionasdasd',
            title: 'Page title',
            question: 'Question, is this question 1?',
            correctAnswer: [true],
            subText: 'This is a bit more explanation',
            questionItems: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
            
        },
        {
            type: 'Name', 
            title: 'Name page title',
            subText: 'Hi, whats your name?',
            buttonLabel: 'Lets go'
        },
        {
            type: 'MissionComplete',
            percent: '14%'
        },
        {
            bonusQuestion: true,
            bonusLabel: 'bonus1',
            bonusTime: 4000,
            type: 'YesNoQuestion',
            label: 'question5',
            title: 'Page title',
            question: 'Question, is this question 1?',
            correctAnswer: [true],
            subText: 'This is a bit more explanation',
            questionItems: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
            
        },
        {
            type: 'YesNoQuestion', 
            bonusLabel: 'bonus1',
            label: 'question5',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'This is the answer',       
            buttonLabel: 'Continue'
        },
        {
            bonusQuestion: true,
            bonusLabel: 'bonus2',
            bonusTime: 5000,
            type: 'PickAListQuestion',
            question: 'Question, is this question 2?',
            label: 'question0',
            questionItems: [
                {label: 'item1 funny wrong'}, // , funny: true        // if you want to have a funny answer also
                {label: 'item2 wrong'},
                {label: 'item3 correct'},
            ],
            buttonType: 'list', // image
            buttonLabel: 'Am I right?',
            correctAnswer: [false,false,true]
        },
        { 
            bonusLabel: 'bonus2',
            type: 'PickAListQuestion',
            label: 'question0',
            preFunny: 'Haha really?',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'This is the correct answer',
            buttonLabel: 'Continue',
        },
        {
            type: 'PickAListQuestion',
            question: 'Question, is this question 2?',
            label: 'question10',
            questionItems: [
                {label: 'item1 funny wrong'}, // , funny: true        // if you want to have a funny answer also
                {label: 'item2 wrong'},
                {label: 'item3 correct'},
            ],
            buttonType: 'list', // image
            buttonLabel: 'Am I right?',
            correctAnswer: [false,false,true]
        },
        {
            
            type: 'PickAListQuestion',
            label: 'question10',
            preFunny: 'Haha really?',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'This is the correct answer',
            buttonLabel: 'Continue',
        },
        {
            type: 'YesNoQuestion',
            label: 'question5',
            title: 'Page title',
            question: 'Question, is this question 1?',
            correctAnswer: [true],
            subText: 'This is a bit more explanation',
            questionItems: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
            
        },
        {
            type: 'YesNoQuestion', 
            label: 'question5',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'This is the answer',       
            buttonLabel: 'Continue'
        },
        {
            type: 'PickAListQuestion',
            question: 'Question, is this question 2?',
            label: 'question1',
            questionItems: [
                {label: 'item1'}, // , funny: true        // if you want to have a funny answer also
                {label: 'item2'},
                {label: 'item3'},
            ],
            buttonType: 'list', // image
            buttonLabel: 'Am I right?',
            correctAnswer: [true,true,true]
        },
        {
            fade: false,
            type: 'PickAListQuestion',
            label: 'question1',
            preFunny: 'Haha really?',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'They all apply',
            buttonLabel: 'Continue',
        },
        {
            fade: false,
            type: 'Info', 
            info: <div className={'content'}>
                <h2 className={classes.header}>Info Screen</h2>
                <p className={classes.subText}>More info More info More info More info More info More info More info More info More info More info More info More info More info More info More info More info More info More info More info </p>
            </div>,
            buttonLabel: 'Continue'
        },
        {
            type: 'PickAListQuestion',
            question: 'How many ring fencing?',
            label: 'question2',
            questionItems: [
                {label: 'Planet1', image: planets.planet1}, // , funny: true if you want to have a funny answer also
                {label: 'Planet2', image: planets.planet2},
                {label: 'Planet3', image: planets.planet3}, 
                {label: 'Planet4', image: planets.planet4},
                {label: 'Planet5', image: planets.planet5},
            ],
            buttonType: 'image', // image
            buttonLabel: 'Am I right?',
            correctAnswer: [true,true,true,true,true],
        },
        {
            type: 'PickAListQuestion',
            label: 'question2',
            preFunny: 'Haha really?',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'They all apply',
            buttonLabel: 'Continue',
        },
        {
            fade: false,
            type: 'Info', 
            info: <div className={'content'}>
                <h2 className={classes.header}>More info here</h2>
                <p className={classes.subText}>This is a sub paragraphThis is a sub paragraphThis is a sub paragraphThis is a sub paragraphThis is a sub</p>
            </div>,
            buttonLabel: 'Get Started'
        },
        {
            type: 'PickAListQuestion',
            bonus: 'bonus2',
            timer: 15000,
            question: 'Which banks are good?',
            label: 'questionPlanets',
            questionItems: [
                {label: 'Planet1', image: planets.planet1}, // , funny: true if you want to have a funny answer also
                {label: 'Planet2', image: planets.planet2},
                {label: 'Planet3', image: planets.planet3}, 
                {label: 'Planet4', image: planets.planet4},
                {label: 'Planet5', image: planets.planet5},
                {label: 'Planet2', image: planets.planet2},
                {label: 'Planet3', image: planets.planet3}, 
                {label: 'Planet4', image: planets.planet4},
                {label: 'Planet5', image: planets.planet5},
                {label: 'Planet2', image: planets.planet2},
                {label: 'Planet3', image: planets.planet3}, 
                {label: 'Planet4', image: planets.planet4},
            ],
            buttonType: 'image', // image
            buttonLabel: 'Am I right?',
            correctAnswer: [true,false,false,true,false,true,false,false,true,false,true,false],
        },
        {
            type: 'PickAListQuestion',
            bonus: 'bonus2',
            label: 'questionPlanets',
            preFunny: 'Haha really?',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'They all apply',
            buttonLabel: 'Continue',
        },
    ]
    render () {
        return null
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        nickname: state.nickname
    }
}

export default connect( mapStateToProps )( pageData ) 
