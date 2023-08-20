import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'
function TimePosted({timeStamp}) {
    let exactTime=""
if(timeStamp){
    const date=parseISO(timeStamp)
     exactTime= `${formatDistanceToNow(date)} ago`
}

  return (
    <span title={timeStamp}>
        &nbsp; <i>{exactTime}</i>
    </span>
  )
}

export default TimePosted