// import { createContext, useContext } from 'react';
import * as React from 'react'
import Comp from '../Components/Com';
import { add } from '../actions';

interface Value {
  store?: any
};

const Context = React.createContext<Value>({})

export interface ProviderProps {
  store: any,
  children: JSX.Element[] | JSX.Element
}
// export const Provider = (props: ProviderProps) => {
//   React.useEffect(() => {
//     console.log('......')
//   }, [props.store.getState()])
//   return <_Provider value={{ store: props.store }}>
//     {props.children}
//   </_Provider>
// }

export class Provider extends React.Component<ProviderProps> {

  constructor(props: ProviderProps) {
    super(props)
    props.store.subscribe((nextState: any) => {
      const state = props.store.getState()
      // this.forceUpdate()
      console.log(state)
      this.setState({
        state
      })


    })
    // setInterval(() => {
    //   props.store.dispatch(add('111'))
    // }, 1000);
  }

  public render() {
    console.log('...........')
    return (
      <>
        {/* <Comp /> */}
        <Context.Provider value={{ store: { ...this.props.store } }}>
          {this.props.children}
          {/* <Comp /> */}
        </Context.Provider>
      </>
    )
  }
}

export const connect = (mapStateToProps?: any, mapDispatchToProps?: any) =>
  (Component: any) =>
    // class Wrap extends React.Component {
    //   public shouldComponentUpdate() {
    //     return true
    //   }
    //   public render() {
    //     console.log('=======')
    //     return (
    //       <Context.Consumer>
    //         {({ store }) => {
    //           const { dispatch, getState } = store
    //           const _mapStateToProps = mapStateToProps && mapStateToProps(getState(), this.props)
    //           const _mapDispatchToProps = mapDispatchToProps && mapDispatchToProps(dispatch, getState(), this.props)
    //           return <Component {...this.props} {..._mapStateToProps} {..._mapDispatchToProps} />
    //         }}
    //       </Context.Consumer>
    //     )
    //   }
    // }
    (props: any) => {
      const { store } = React.useContext(Context)
      const { dispatch, getState } = store
      const _mapStateToProps = (mapStateToProps && mapStateToProps(getState(), props)) || {}
      const _mapDispatchToProps = (mapDispatchToProps && mapDispatchToProps(dispatch, getState(), props)) || {}
      return <Component {...props} {..._mapStateToProps} {..._mapDispatchToProps} />
    }
