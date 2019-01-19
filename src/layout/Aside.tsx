import * as React from 'react'
import styles from '../DocumentLayout.module.scss'

export interface AsideProps {
  children: React.ReactNode
  
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function Aside({
  children,
  className='',
  id,
  style,
}: AsideProps) {
  return (
    <aside
      className={styles.Aside+' '+className}
      id={id}
      style={style}
    >
      {children}
    </aside>
  )
}
