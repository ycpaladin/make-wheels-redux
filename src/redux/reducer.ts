import { ADD_ACTION, GET_ALL } from '../actions'

type State = Array<string>

const defaultState: State = [

]

export function reducer(state = defaultState, action: any) {
  switch (action.type) {
    case GET_ALL:
      return state
    case ADD_ACTION:
      return [...state, action.value]
    default:
      return state
  }
}