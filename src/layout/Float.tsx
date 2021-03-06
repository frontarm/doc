import * as React from 'react'
import styles from '../DocLayout.module.scss'

export interface FloatProps {
  Component?: string | React.ComponentType<{
    children?: React.ReactNode,
    className: string,
    id?: string,
    style?: React.CSSProperties
  }>,

  children: React.ReactNode

  inset?: string
  minWidth?: string
  
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function Float({
  Component='div',
  children,
  className='',
  inset='0px',
  id,
  minWidth=styles.minAsideWidth,
  style,
}: FloatProps) {
  return (
    <Component
      className={styles.Float+' '+className}
      id={id}
      style={{
        minWidth: `calc(${minWidth} + ${styles.largeGutter}*2)`,
        width: `calc(100% - ${styles.maxTwinBodyWidth} - ${styles.largeGutter} + ${inset})`,
        ...style
      }}
    >
      {children}
    </Component>
  )
}
