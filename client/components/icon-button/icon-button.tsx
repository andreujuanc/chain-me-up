import { ReactElement } from 'react';
import {
  BellIcon,
  BookmarkIcon,
  CashIcon,
  ChatIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  HeartIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/outline';

export type TSize = 'md' | 'lg';

export type TIconName =
  | 'home'
  | 'notification'
  | 'message'
  | 'bookmark'
  | 'list'
  | 'subscription'
  | 'profile'
  | 'more'
  | 'plus'
  | 'heart'
  | 'cash'
  | 'comment';

interface IButtonProps {
  icon: TIconName;
  children?: string;
  className: string;
  size: TSize;
}

interface IIconProps {
  name: TIconName;
  className: string;
  size: TSize;
}

function getIconSize(size: TSize) {
  switch (size) {
    case 'lg':
      return '27';
    case 'md':
      return '23';
  }
}

function Icon({ name, className, size }: IIconProps): ReactElement {
  const iconSize = getIconSize(size);

  switch (name) {
    case 'home':
      return (
        <HomeIcon width={iconSize} height={iconSize} className={className} />
      );
    case 'notification':
      return (
        <BellIcon width={iconSize} height={iconSize} className={className} />
      );
    case 'message':
    case 'comment':
      return (
        <ChatIcon width={iconSize} height={iconSize} className={className} />
      );
    case 'bookmark':
      return (
        <BookmarkIcon
          width={iconSize}
          height={iconSize}
          className={className}
        />
      );
    case 'list':
      return (
        <CollectionIcon
          width={iconSize}
          height={iconSize}
          className={className}
        />
      );
    case 'subscription':
    case 'heart':
      return (
        <HeartIcon width={iconSize} height={iconSize} className={className} />
      );
    case 'profile':
      return (
        <UserIcon width={iconSize} height={iconSize} className={className} />
      );
    case 'more':
      return (
        <DotsCircleHorizontalIcon
          width="27"
          height="27"
          className={className}
        />
      );
    case 'plus':
      return <PlusIcon width="27" height="27" className={className} />;
    case 'cash':
      return <CashIcon width="27" height="27" className={className} />;
  }
}

function getTextClassName(size: TSize) {
  switch (size) {
    case 'md':
      return 'text-base';
    case 'lg':
      return 'text-lg';
  }
}

export function IconButton({
  icon,
  children,
  className,
  size,
}: IButtonProps): ReactElement {
  return (
    <button className={`flex flex-row items-center p-2 m-1 ${className}`}>
      <Icon size={size} className={`${children ? 'mr-1' : ''}`} name={icon} />
      {children && (
        <span className={`${getTextClassName(size)} font-semibold`}>
          {children}
        </span>
      )}
    </button>
  );
}
