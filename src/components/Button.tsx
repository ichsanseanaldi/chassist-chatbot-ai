import React, { ReactPropTypes } from 'react'

interface propsType{
    props:string | undefined,
    word:string,
}

export default function Button({props, word}:propsType) {
  return (
    <button className={props} type="submit">{word}</button>
  )
}
