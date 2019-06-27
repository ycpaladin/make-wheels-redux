import * as React from 'react';
import { connect } from '../redux/react-redux'
import { add } from '../actions'

interface Props {
  add: (value: string) => void,
  list: string[]
}

function List(props: Props): JSX.Element {
  const items = props.list.map((item: string, index: number) => (<li key={index}>{item}</li>))
  return (<>
    <AddItem add={props.add} />
    <ul>
      {items}
    </ul>
  </>)
}

interface AddItemProps {
  add: (value: string) => void
}


function AddItem(props: AddItemProps) {
  const [value, setValue] = React.useState('')
  const clickHandler = React.useCallback(
    () => {
      props.add(value)
    },
    [value],
  )
  const changeHanlder = React.useCallback((e: any) => {
    setValue(e.target.value)
  }, [value])
  return (
    <>
      <input type='text' value={value} onChange={changeHanlder} />
      <input type='button' onClick={clickHandler} value='add' />
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    list: state
  }
}

const mapDispatchToProps = (dispatch: any, getState: any) => {
  return {
    add: (value: string) => {
      dispatch(add(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)