import * as siteActions from '../actions/siteActions'
import {updateObject} from '../utility'

const initialState = {
    numOfPages: 10,
    fade: false,
    pageType: null,
    currentIndex: 0,
    questionData: {},
    resize: 0,
    windowHeight: 0,
    bonusData: {},
    itemsData: {
        whatRingFence: {
            questionLabel: 'whatRingFence',
            itemLabel: 'suit',
            selected: 'suit3',
            visible: false,
        }
    },
    isBonus: false,
    nickname: '',

    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
}

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     } );
}

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const siteReducer = ( state = initialState, action ) => {


    let updatedQuestionData = null
    let updatedBonusData = null
    let updatedItemsData = null
    let correctAnswer = null
    let isCorrect = null
    switch ( action.type ) {
        // auth reducer methods
        case siteActions.AUTH_START: return authStart(state, action);
        case siteActions.AUTH_SUCCESS: return authSuccess(state, action);
        case siteActions.AUTH_FAIL: return authFail(state, action);
        case siteActions.AUTH_LOGOUT: return authLogout(state, action);
        //////////////////////////
        case siteActions.SET_WORKAREA:
        const workArea = action.workArea

        updatedQuestionData = {...state.questionData}
        updatedQuestionData[action.label].answer = workArea
        updatedQuestionData[action.label].isCorrect = true
        updatedQuestionData[action.label].correctAnswer = workArea
        console.log ('updatedQuestionData', updatedQuestionData)
        return {
            ...state,
            questionData: updatedQuestionData
        }
        case siteActions.SET_ITEM:
            updatedItemsData = {...state.itemsData}

            updatedItemsData[action.label] = {...state.itemsData[action.label]}
            updatedItemsData[action.label].visible = true

            return {
                ...state,
                itemsData: updatedItemsData
            }
        case siteActions.SET_BONUS_SELECTED:
            updatedBonusData = {...state.bonusData}
            updatedBonusData[action.label].selected = action.item

            return {
                ...state,
                bonusData: updatedBonusData
            }
        case siteActions.SET_ITEMS_DATA:
            updatedItemsData = {...state.itemsData}
            updatedItemsData[action.itemData.questionLabel] = action.itemData

            return {
                ...state,
                itemsData: updatedItemsData
            }

        case siteActions.SET_BONUS_DATA:
            updatedBonusData = {...state.bonusData}
            updatedBonusData[action.bonusData.bonusLabel] = action.bonusData
            return {
                ...state,
                bonusData: updatedBonusData
            }

        case siteActions.SET_IS_BONUS:
            return {

                ...state,
                isBonus: action.isBonus
            }
        case siteActions.SET_NICKNAME:
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
        case siteActions.SET_BONUS_ANSWER:
            const bonusAnswer = action.answer
            updatedBonusData = {...state.bonusData}
            correctAnswer = state.questionData[action.label].correctAnswer

            isCorrect = bonusAnswer.every( ( item, index ) => item === correctAnswer[index] )   // check if every nswer is the same as correct and answer  
            updatedBonusData[action.bonusLabel].bonusCorrect = isCorrect

            return {
                ...state,
                bonusData: updatedBonusData
            }

        case siteActions.SET_ANSWER:
            const answer = action.answer
            correctAnswer = state.questionData[action.label].correctAnswer

            isCorrect = answer.every( ( item, index ) => item === correctAnswer[index] )   // check if every nswer is the same as correct and answer  
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
                resize: state.resize + 1,
                windowHeight: action.windowHeight

            }
        default:
            return state
    }
}

export default siteReducer
