import * as React from 'react'
import styles from '../DocumentLayout.module.scss'
import { Aside } from './Aside';

export interface AsideOrAfterProps {
  aside: React.ReactNode
  children: React.ReactNode
  
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function AsideOrAfter({
  aside,
  children,
  className = '',
  id,
  style,
}: AsideOrAfterProps) {
  return (
    <div className={styles.AsideOrAfter}>
      <Aside className={className} id={id} style={style}>
        {aside}
      </Aside>
      {children}
    </div>
  )
}

