import { TREE_PATH, TREE_VIEWBOX } from '@/lib/tree'

type TreeLogoProps = {
  className?: string
  title?: string
}

export default function TreeLogo({
  className = 'h-8 w-8',
  title,
}: TreeLogoProps) {
  return (
    <svg
      viewBox={TREE_VIEWBOX}
      className={className}
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <path d={TREE_PATH} />
    </svg>
  )
}
