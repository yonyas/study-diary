import ReactLoading, { LoadingType } from 'react-loading'

export type LoadingProps = {
  type?: LoadingType
  color?: string
  size?: string | number
}

function Loading({ type = 'spin', size }: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        size === 'full' && 'h-screen'
      }`}
    >
      <ReactLoading type={type} color={'gray'} height={size} width={size} />
    </div>
  )
}

export default Loading
