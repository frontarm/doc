import * as React from 'react'
import styles from '../DocLayout.module.scss'

export interface FloatProps {
  children: React.ReactNode

  inset?: string
  minWidth?: string
  
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function Float({
  children,
  className='',
  inset='0px',
  id,
  minWidth=styles.minAsideWidth,
  style,
}: FloatProps) {
  return (
    <div
      className={styles.Float+' '+className}
      id={id}
      style={{
        minWidth: minWidth,
        width: `calc(100% - ${styles.maxTwinBodyWidth} - ${styles.twinColumnGutter} + ${inset})`,
        ...style
      }}
    >
      {children}
    </div>
  )
}
