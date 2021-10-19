import types from '../actionTypes'

let initState={
    article:{},
    done:0,
    cates:[],
    info:{},
    id:''
}

export default(state=initState,action)=>{
    let newState={...state}
    switch(action.type){
        case types.GET_ARTICLE:
            newState.article=action.payload
            break
        case types.GET_ARTICLE_CATES:
            newState.cates=action.payload
            break
        default:
    }
    return newState
}
