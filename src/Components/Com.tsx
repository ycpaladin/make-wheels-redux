
import * as React from 'react';

export default function Comp() {
  const [value, setValue] = React.useState(0)
  React.useEffect(() => {
    setValue(new Date().getTime())
  })

  return (<>
    <div>{value}</div>
  </>)
}