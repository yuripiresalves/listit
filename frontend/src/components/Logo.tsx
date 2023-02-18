interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'light' | 'dark';
}

export function Logo({ size = 'md', color = 'light' }: LogoProps) {
  const sizeValues = {
    sm: 'text-5xl',
    md: 'text-7xl',
    lg: 'text-9xl',
  };

  return (
    <strong
      className={`${sizeValues[size]} font-brand ${
        color === 'light' ? 'text-zinc-200' : 'text-zinc-800'
      }`}
    >
      list
      <span className="ml-1 text-emerald-800 font-outline-2">it</span>
    </strong>
  );
}
