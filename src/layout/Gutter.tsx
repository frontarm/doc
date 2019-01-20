import * as React from 'react'
import styles from '../DocLayout.module.scss'

export type GutterSize = boolean | null | 'full' | 'half' | 'double' | 'none'

export interface GutterProps {
  Component?: string | React.ComponentType<{
    children?: React.ReactNode,
    className: string,
    id?: string,
    style?: React.CSSProperties
  }>,

  children?: React.ReactNode

  half?: boolean
  double?: boolean

  // You can supply any CSS size, or the strings 'half', 'double',
  // 'full' (i.e. true) or 'none' (i.e. false or null). When you
  // supply a named size, it'll vary with the screen size.
  vertical?: GutterSize
  horizontal?: GutterSize
  top?: GutterSize
  right?: GutterSize
  bottom?: GutterSize
  left?: GutterSize
  
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function Gutter({
  Component='div',
  children,

  half,
  double,
  vertical,
  horizontal,
  top,
  right,
  bottom,
  left,

  className='',
  id,
  style,
}: GutterProps) {
  let defaultGutter: 'half' | 'double' | undefined = undefined
  if (half) {
    defaultGutter = 'half'
  }
  if (double) {
    defaultGutter = 'double'
  }

  if (vertical === undefined ? (horizontal !== undefined) : !vertical) {
    vertical = 'none'
  }
  if (horizontal === undefined ? (vertical !== undefined) : !horizontal) {
    horizontal = 'none'
  }

  console.log()

  if (horizontal) {
    if (left === undefined) left = horizontal
    if (right === undefined) right = horizontal
  }
  if (vertical) {
    if (top === undefined) top = vertical
    if (bottom === undefined) bottom = vertical
  }

  if (left === undefined || left === true) left = defaultGutter
  if (right === undefined || right === true) right = defaultGutter
  if (top === undefined || top === true) top = defaultGutter
  if (bottom === undefined || bottom === true) bottom = defaultGutter

  let classNames = [
    styles.Gutter,
    left ? styles['left-'+left] : '',
    right ? styles['right-'+right] : '',
    top ? styles['top-'+top] : '',
    bottom ? styles['bottom-'+bottom] : '',
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

