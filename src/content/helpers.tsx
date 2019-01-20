import * as React from 'react'
import { Aside } from '../layout/Aside'
import { Float } from '../layout/Float'

interface Props {
  aside?: boolean
  floatInset?: string
  floatMinWidth?: string
}

export function wrapWithAsideOrFloat<P extends Props>(
  { aside, floatInset, floatMinWidth, ...other }: P,
  render: (props: Pick<P, Exclude<keyof P, 'aside' | 'floatInset' | 'floatMinWidth'>>) => React.ReactElement<any>
): React.ReactElement<any> {
  if (Number(!!aside) + Number(!!floatInset) + Number(!!floatMinWidth) > 1) {
    console.warn(`You can't specify more than one of the "aside", "floatInset" and "floatMinWidth" props. Defaulting to use "floatInset".`)
  }

  if (floatInset) {
    return <Float inset={floatInset}>{render(other)}</Float>
  }

  if (floatMinWidth) {
    return <Float minWidth={floatMinWidth}>{render(other)}</Float>
  }

  if (aside) {
    return <Aside>{render(other)}</Aside>
  }

  return render(other)
}