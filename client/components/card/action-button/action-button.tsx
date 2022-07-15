import { ReactElement } from 'react';
import { IconButton } from '../../icon-button';
import type { TIconName } from '../../icon-button';

interface IActionButtonProps {
  children?: string;
  icon: TIconName;
}

export function ActionButton({
  icon,
  children,
}: IActionButtonProps): ReactElement {
  return (
    <IconButton
      className="self-start text-gray-600 rounded-full stroke-gray-600 hover:bg-primary-50 hover:bg-opacity-10 hover:stroke-primary-600 hover:text-primary-600"
      icon={icon}
      size="md"
    >
      {children}
    </IconButton>
  );
}
