export function Card({ className = '', children, ...props }) {
  return (
    <div className={`bg-card border border-border rounded-xl shadow-md ${className}`} {...props}>
      {children}
    </div>
  )
}
