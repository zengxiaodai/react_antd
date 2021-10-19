import types from '../actionTypes'

// state 是用户储存用户的数据，数据不能被修改


let initState = {
	token:'',
	userinfo: {
		roles: ''
	}
}

export default (state=initState,action) => {
	let newState = {...state}
	switch (action.type) {
		case types.POST_LOGIN:
			newState.token = action.payload.token
			break
		case types.GET_USERINFO:
			newState.userinfo=action.payload
			// console.log(newState.userinfo);
			break
		default:
		
	  }
	return newState
}
