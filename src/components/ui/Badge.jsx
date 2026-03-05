import { cn } from '../../lib/utils'

const variants = {
  default:  'bg-forest-100 text-forest-800',
  success:  'bg-green-100 text-green-800',
  warning:  'bg-amber-100 text-amber-800',
  outline:  'border border-forest-300 text-forest-700',
  dark:     'bg-forest-800 text-cream-100',
}

export default function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
