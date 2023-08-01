import './FormErrors.css';
import FormErrorItem from './FormErrorItem';
import React from "react";

export default function FormErrors(props) {
  let el_errors = null
  // console.log("errrrr", props.errors)
  if (props.errors.length > 0) {
    return (
      <div className='errors'>
        <FormErrorItem err_code={props.errors} />
        </div>
    )
  }

  return (
    <div className='errorsWrap'>
      {el_errors}
    </div>
  )
}