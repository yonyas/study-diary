import ReactLoading, { LoadingType } from 'react-loading'

export type LoadingProps = {
  type?: LoadingType
  color?: string
  size?: string | number
}

function Loading({ type = 'spin', size }: LoadingProps) {
  return <ReactLoading type={type} color={'gray'} height={size} width={size} />
}

export default Loading
