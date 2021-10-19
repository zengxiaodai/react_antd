import types from '../actionTypes'

let initState={
    username:'{}',
    department:'',
    vacationType:'',
    vacation_time:[],
    duration:'',
    create_time:'',
    remarks:'',
    approver:'',
    status:''
}

export default(state=initState,action)=>{
    let newState={...state}
    switch(action.type){
        case types.WRITE_VACATION:
            newState.vacation=action.payload
            break
        case types.GET_VACATION_LIST:
            newState.vacationList=action.payload
            break
        default:
    }
    return newState
}
