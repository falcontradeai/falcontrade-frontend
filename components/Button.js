import Link from 'next/link';

export default function Button({ children, href, variant = 'default', className = '', disabled = false, ...props }) {
  const base = 'px-3 py-2 rounded-lg border border-border bg-background';
  const variants = {
    primary: 'bg-primary border-primary text-white',
    default: '',
  };
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const classes = `${base} ${variants[variant] ?? ''} ${disabledStyles} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
