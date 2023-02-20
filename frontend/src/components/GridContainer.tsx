interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GridContainer({
  children,
  className = '',
}: GridContainerProps) {
  return (
    <div className={`container mx-auto px-4 ${className}`}>{children}</div>
  );
}

