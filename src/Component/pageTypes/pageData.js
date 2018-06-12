import React from 'react'
import classes from './Page.css'
import * as planets from './../../assets/planets/planets'


class pageData {
    static pages = [
        {
            fade: false,
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
            fade: true,
            type: 'YesNoQuestion', 
            label: 'question5',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'This is the answer',       
            buttonLabel: 'Continue'
        },
        {
            fade: false,
            type: 'Info', 
            info: <div className={'content'}>
                <h2 className={classes.header}>Starting screen</h2>
                <p className={classes.subText}>This is a sub paragraph, This is a sub paragraph, This is a sub paragraph, This igrasdsdf ph, This is a sub paragraph, This is a sub paragraph, This is a sub paragraph, This is a sub paragraph, </p>
            </div>,
            buttonLabel: 'Get Started'
        },
        {
            type: 'PickAListQuestion',
            question: 'Question, is this question 2?',
            label: 'question0',
            questionItems: [
                {label: 'item1 funny wrong',funny: true}, // , funny: true        // if you want to have a funny answer also
                {label: 'item2 wrong'},
                {label: 'item3 correct'},
            ],
            buttonType: 'list', // image
            buttonLabel: 'Am I right?',
            correctAnswer: [false,false,true]
        },
        {
            fade: false,
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
            bonus: 'bonus1',
            timer: 5000,
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
            bonus: 'bonus1',
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
            bonus: 'bonus1',
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
            bonus: 'bonus1',
            label: 'questionPlanets',
            preFunny: 'Haha really?',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes thats right!',
            answer: 'They all apply',
            buttonLabel: 'Continue',
        },
    ]
}

export default pageData
