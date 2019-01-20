import * as React from 'react'
import styles from '../DocLayout.module.scss'

export type BlockMarginSize = boolean | null | 'none' | 'half' | 'full'

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
  marginSize?: BlockMarginSize
  style?: React.CSSProperties
}

export function Block({
  Component = 'div',
  children,
  className='',
  id,
  marginSize,
  style,
}: BlockProps) {
  if (!marginSize && marginSize !== undefined) {
    marginSize = 'none'
  }
  if (marginSize === 'full') {
    marginSize = undefined
  }

  let classNames = [
    styles.Block,
    marginSize ? styles['Block-margin-'+marginSize] : '',
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
