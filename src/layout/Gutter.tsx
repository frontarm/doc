import * as React from 'react'
import styles from '../DocumentLayout.module.scss'

export interface GutterProps {
  Component?: string | React.ComponentType<{
    children?: React.ReactNode,
    className: string,
    id?: string,
    style?: React.CSSProperties
  }>,

  children?: React.ReactNode

  half?: boolean
  left?: boolean
  right?: boolean
  
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function Gutter({
  Component='div',
  children,
  className='',
  half,
  left,
  right,
  id,
  style,
}: GutterProps) {
  let noLeft = left === undefined ? right : !left
  let noRight = right === undefined ? left : !right

  let classNames = [
    styles.Gutter,
    styles[half ? 'half' : 'full'],
    noLeft ? '' : styles.left,
    noRight ? '' : styles.right,
    className,
  ].join(' ')

  return (
    <Component
      className={classNames}
      id={id}
      style={style}
    >
      {children}
    </Component>
  )
}

