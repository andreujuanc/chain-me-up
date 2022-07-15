import { ReactElement } from 'react';
import { CallToAction } from './call-to-action';
import { TabButton } from './tab-button';

export function Sidebar(): ReactElement {
  return (
    <nav className="order-first px-4 py-2 sm:w-64">
      <ul className="flex flex-col list-none">
        <TabButton icon="home">Home</TabButton>
        <TabButton icon="notification">Notifications</TabButton>
        <TabButton icon="message">Messages</TabButton>
        <TabButton icon="bookmark">Bookmarks</TabButton>
        <TabButton icon="list">Lists</TabButton>
        <TabButton icon="subscription">Subscriptions</TabButton>
        <TabButton icon="profile">Profile</TabButton>
        <TabButton icon="more">More</TabButton>
        <CallToAction>New Post</CallToAction>
      </ul>
    </nav>
  );
}
