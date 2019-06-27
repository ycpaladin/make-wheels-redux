export interface Action<T> {
  type: T
}
export type Reducer<S, A> = (state: S, action: A) => S
export type Dispatch = (action: any) => void
export type GetState<S> = () => S
export interface Store<S> {
  dispatch: Dispatch,
  getState: GetState<S>
}

export type Listener = (state: any) => void;

export function createStore(reducer: Reducer<any, any>, preState?: any) {
  let currentState = preState;
  // const _reducer: Reducer<any, any> = reducer;
  let isDispatching = false

  const listers: Listener[] = [];

  function dispatch(action: any) {
    try {
      isDispatching = true
      currentState = reducer(currentState, action)
    } finally {
      isDispatching = false
    }

    listers.forEach(l => {
      l(currentState)
    })
    return action
  }

  function getState() {
    return currentState
  }

  function subscribe(listen: any) {
    listers.push(listen)
  }

  dispatch({
    type: '__INIT__'
  })

  return {
    dispatch,
    getState,
    subscribe
  }
}