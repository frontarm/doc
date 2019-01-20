import * as React from 'react'
import styles from '../DocLayout.module.scss'

export interface EscapeProps {
  Component?: string | React.ComponentType<{
    children?: React.ReactNode,
    className: string,
    id?: string,
    style?: React.CSSProperties
  }>,

  children: React.ReactNode

  className?: string
  id?: string
  style?: React.CSSProperties
}

export function Escape({
  Component='div',
  children,
  className='',
  id,
  style,
}: EscapeProps) {
  return (
    <Component
      className={styles.Escape+' '+className}
      id={id}
      style={style}
    >
      {children}
    </Component>
  )
}
