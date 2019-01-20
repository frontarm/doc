import * as React from 'react'
import styles from '../DocLayout.module.scss'

export interface AsideProps {
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

export function Aside({
  Component='aside',
  children,
  className='',
  id,
  style,
}: AsideProps) {
  return (
    <Component
      className={styles.Aside+' '+className}
      id={id}
      style={style}
    >
      {children}
    </Component>
  )
}

export interface AsideTopProps {
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

export function AsideTop({
  Component='div',
  children,
  className = '',
  id,
  style,
}: AsideTopProps) {
  return (
    <Component className={styles.AsideTop+' '+className} id={id} style={style}>
      {children}
    </Component>
  )
}

