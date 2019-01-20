import * as React from 'react'
import { Aside } from '../layout/Aside'
import { Float } from '../layout/Float'

interface Props {
  aside?: boolean
  floatInset?: string
}

export function wrapWithAsideOrFloat<P extends Props>(
  { aside, floatInset, ...other }: P,
  render: (props: Pick<P, Exclude<keyof P, 'aside' | 'floatInset'>>) => React.ReactElement<any>
): React.ReactElement<any> {
  if (aside && floatInset) {
    console.warn(`You can't specify both "aside" and "floatInset" props. Ignoring "aside" prop and treating as a Float.`)
  }

  if (floatInset) {
    return <Float inset={floatInset}>{render(other)}</Float>
  }

  if (aside) {
    return <Aside>{render(other)}</Aside>
  }

  return render(other)
}