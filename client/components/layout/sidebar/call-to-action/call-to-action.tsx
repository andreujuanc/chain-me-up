import { ReactElement } from 'react';
import { IconButton } from '../../../icon-button';

interface ITabButtonProps {
  children: string;
}

export function CallToAction({ children }: ITabButtonProps): ReactElement {
  return (
    <IconButton
      className="rounded-md text-text-base stroke-text-base bg-primary-500 hover:bg-primary-700"
      icon="plus"
      size="lg"
    >
      {children}
    </IconButton>
  );
}
