import { ReactElement } from 'react';
import { BellIcon, BookmarkIcon, ChatIcon, CollectionIcon, DotsCircleHorizontalIcon, HeartIcon, HomeIcon, PlusIcon, UserIcon } from '@heroicons/react/outline';

export type TIconName = 'home' | 'notification' | 'message' | 'bookmark' | 'list' | 'subscription' | 'profile' | 'more' | 'plus';

interface IButtonProps {
  icon: TIconName;
  children: string;
  className: string;
}

interface IIconProps {
  name: TIconName;
}

function Icon({ name }: IIconProps): ReactElement {
  switch (name) {
    case 'home':
      return <HomeIcon width="27" height="27" className="mr-1" />;
    case 'notification':
      return <BellIcon width="27" height="27" className="mr-1" />;
    case 'message':
      return <ChatIcon width="27" height="27" className="mr-1" />;
    case 'bookmark':
      return <BookmarkIcon width="27" height="27" className="mr-1" />;
    case 'list':
      return <CollectionIcon width="27" height="27" className="mr-1" />;
    case 'subscription':
      return <HeartIcon width="27" height="27" className="mr-1" />;
    case 'profile':
      return <UserIcon width="27" height="27" className="mr-1" />;
    case 'more':
      return <DotsCircleHorizontalIcon width="27" height="27" className="mr-1" />;
    case 'plus':
      return <PlusIcon width="27" height="27" className="mr-1" />
  }
}

export function IconButton({ icon, children, className }: IButtonProps): ReactElement {
  return (
    <button className={`flex flex-row items-center p-2 m-1 ${className}`}>
      <Icon name={icon} />
      <span className="text-lg font-semibold">{children}</span>
    </button>
  );
}
