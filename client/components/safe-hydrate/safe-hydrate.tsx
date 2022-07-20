import { ReactElement, ReactNode } from 'react';

interface ISafeHydrateProps {
  children: ReactNode;
}

export function SafeHydrate({ children }: ISafeHydrateProps): ReactElement {
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  );
}
