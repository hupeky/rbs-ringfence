import * as siteActions from '../actions/siteActions'

const initialState = {
    numOfPages: 10,
    fade: false,
    pageType: null,
    currentIndex: 0,
    questionData: {},
    resize: 0,
    bonusData: {},
    isBonus: false,
    nickname: '',
}



const siteReducer = ( state = initialState, action ) => {
    let updatedQuestionData = null
    let updatedBonusData = null
    switch ( action.type ) {
        case siteActions.SET_IS_BONUS:
            return {
                ...state,
                isBonus: action.isBonus
            }
        case siteActions.SET_NICKNAME:
            console.log( action.isBonus )
            return {
                ...state,
                nickname: action.nickname
            }
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
        case siteActions.SET_BONUS_DATA:
            updatedBonusData = {...state.bonusData}
            updatedBonusData[action.bonusData.bonusLabel] = action.bonusData
            console.log( updatedBonusData )
            return {
                ...state,
                bonusData: updatedBonusData
            }
        case siteActions.SET_BONUS_ANSWER:
            updatedBonusData = {...state.bonusData}
            console.log( 'updatedBonusData', updatedBonusData )
            console.log( 'action.bonusLabel', action.bonusLabel )
            updatedBonusData[action.bonusLabel].bonusCorrect = action.answer
            console.log( updatedBonusData )
            return {
                ...state,
                bonusData: updatedBonusData
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
