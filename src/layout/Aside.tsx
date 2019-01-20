import * as React from 'react'
import styles from '../DocLayout.module.scss'

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

export interface AsideTopProps {
  children: React.ReactNode
  
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function AsideTop({
  children,
  className = '',
  id,
  style,
}: AsideTopProps) {
  return (
    <div className={styles.AsideTop+' '+className} id={id} style={style}>
      {children}
    </div>
  )
}

