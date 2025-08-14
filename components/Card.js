export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-card border border-border rounded-xl p-4 shadow ${className}`} {...props}>
      {children}
    </div>
  );
}
