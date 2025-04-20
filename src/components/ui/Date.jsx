import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/tr'

function Date(props) {

  const settings = JSON.parse(localStorage.getItem('settings')) || {}
  const language = settings.language

  dayjs.extend(relativeTime)
  dayjs.locale(language)

  const formatter = (date) => {
    return dayjs(date).fromNow()
  }
  
  const {children} = props
  return (
    formatter(children)
  )
}

export default Date