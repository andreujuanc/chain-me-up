import { ReactElement } from 'react';
import { IconButton } from '../../../icon-button';
import { TIconName } from '../../../icon-button';

interface ITabButtonProps {
  children: string;
  icon: TIconName;
}

export function TabButton({ icon, children }: ITabButtonProps): ReactElement {
  return (
    <IconButton
      className="text-black rounded-md stroke-black hover:bg-primary-50 hover:bg-opacity-10 hover:stroke-primary-600 hover:text-primary-600"
      icon={icon}
      size="lg"
    >
      {children}
    </IconButton>
  );
}
