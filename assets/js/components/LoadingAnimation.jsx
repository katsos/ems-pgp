import React from 'react'

export default function LoadingAnimation(props) {
  console.log(this.name, props);

  return (
    <div className="loading-animation-wrapper">
      <div className={'mdl-spinner mdl-spinner--single-color mdl-js-spinner' + (props.isActive) ? ' is-active' : ''}/>
    </div>
  )
}
