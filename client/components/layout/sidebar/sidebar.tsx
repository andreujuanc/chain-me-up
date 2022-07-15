import { ReactElement } from 'react';
import { CallToAction } from './call-to-action';
import { TabButton } from './tab-button';

export function Sidebar(): ReactElement {
  return (
    <nav className="">
      <h1>Chain Me Up</h1>
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
