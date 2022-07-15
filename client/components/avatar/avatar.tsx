import { ReactElement } from 'react';

interface IAvatarProps {
  isOnline: boolean;
  hasStory: boolean;
}

export function Avatar({ isOnline, hasStory }: IAvatarProps): ReactElement {
  return (
    <a
      className="relative block object-cover w-12 h-12 p-0.5 rounded-full select-none bg-gradient-to-br from-primary-500 to-primary-200"
      href=""
    >
      <figure>
        <img
          className="w-full h-full rounded-full"
          src="/images/avatar/example.jpg"
        />
        {isOnline && (
          <div className="absolute w-3 h-3 border-2 border-white rounded-full right-px bottom-px bg-emerald-400" />
        )}
      </figure>
    </a>
  );
}
