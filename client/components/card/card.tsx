import { CheckCircleIcon } from '@heroicons/react/outline';
import { ReactElement } from 'react';
import { Avatar } from '../avatar';
import { ActionButton } from './action-button';

interface ICardProps {
  name: string;
  tag: string;
  isVerified: boolean;
  description: string; // TODO: This should be rich text.
}

export function Card({
  name,
  tag,
  isVerified,
  description,
}: ICardProps): ReactElement {
  return (
    <article className="py-2 bg-white border-b-2 border-gray-100">
      <div className="flex flex-row px-1 py-2">
        <Avatar isOnline hasStory />
        <div className="ml-2">
          <p className="inline-flex flex-row items-center text-base font-semibold">
            {name}
            {isVerified && (
              <CheckCircleIcon
                width="18"
                height="18"
                className="ml-1 stroke-primary-500"
              />
            )}
          </p>
          <p className="before:content-['@'] text-sm">{tag}</p>
        </div>
      </div>
      <div className="px-1 text-base">{description}</div>
      <figure className="pt-2 pb-1">
        <img src="/images/content/example.jpeg" />
      </figure>
      <div className="flex flex-row">
        <ActionButton icon="heart" />
        <ActionButton icon="comment" />
        <ActionButton icon="cash">Send Tip</ActionButton>
      </div>
    </article>
  );
}
