import * as React from 'react'
import styles from '../DocLayout.module.scss'

export interface BlockProps {
  Component?: string | React.ComponentType<{
    children?: React.ReactNode,
    className: string,
    id?: string,
    style?: React.CSSProperties
  }>,

  children?: React.ReactNode
  
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function Block({
  Component = 'div',
  children,
  className='',
  id,
  style,
}: BlockProps) {
  return (
    <Component
      className={styles.Block+' '+className}
      id={id}
      style={style}
    >
      {children}
    </Component>
  )
}
