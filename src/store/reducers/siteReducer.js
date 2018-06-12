import * as siteActions from '../actions/siteActions'

const initialState = {
    numOfPages: 10,
    fade: false,
    pageType: null,
    currentIndex: 0,
    questionData: {},
    resize: 0,
    bonusData: {}
}



const siteReducer = ( state = initialState, action ) => {
    let updatedQuestionData = null
    switch ( action.type ) {
        case siteActions.SET_NUM_PAGES:
            return {
                ...state,
                numOfPages: action.numOfPages
            }
        case siteActions.SET_PAGE_TYPE:
            return {
                ...state,
                pageType: action.pageType
            }
        case siteActions.SET_CURRENT_INDEX:
            return {
                ...state,
                currentIndex: action.currentIndex
            }
        case siteActions.SET_QUESTION_DATA:
            updatedQuestionData = {...state.questionData}
            updatedQuestionData[action.questionData.label] = action.questionData
            return {
                ...state,
                questionData: updatedQuestionData
            }
        case siteActions.SET_ANSWER:
            const answer = action.answer
            const correctAnswer = state.questionData[action.label].correctAnswer

            console.log( 'answer', answer, 'correctAnswer', correctAnswer )

            let isCorrect = answer.every( ( item, index ) => item === correctAnswer[index] )   // check if every nswer is the same as correct and answer  
            if ( action.funny ) {
                isCorrect = 'funny'  // if funny in correct was given. change correct to funny. this will output a different response.
            }

            updatedQuestionData = {...state.questionData}
            updatedQuestionData[action.label].answer = action.answer
            updatedQuestionData[action.label].isCorrect = isCorrect
            updatedQuestionData[action.label].funny = action.funny
            return {
                ...state,
                questionData: updatedQuestionData
            }
        case siteActions.TRIGGER_RESIZE:
            return {
                ...state,
                resize: state.resize + 1
            }
        default:
            return state
    }
}

export default siteReducer
