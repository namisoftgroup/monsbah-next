import ChatList from "@/components/chats/ChatList";
import ChatRoom from "@/components/chats/ChatRoom";
import { getChat } from "@/hooks/queries/chat/getChat";
import { getChats } from "@/services/chats/getChats";
import React from "react";

export async function generateMetadata() {
  const t = await getTranslations("meta");

  return {
    title: t("chats.defaultTitle"),
    description: t("chats.defaultDescription"),
  };
}

export default async function page({ searchParams }) {
  const searchParamsStore = await searchParams;
  const { user_id } = searchParamsStore;
  const chats = await getChats();
  const chat = await getChat(user_id);

  return (
    <section className="chats-section">
      <div className="container h-100 p-0 ">
        <div className="row m-0 h-100 justify-content-center">
          <ChatList chats={chats} />

          <div className="chat-room-wrapper col-lg-8 col-12 p-2 h-100 ">
            {user_id ? (
              <ChatRoom chat={chat} />
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center">
                <h2 className="text-muted">Welcome to Your Chats</h2>
                <p className="text-secondary">
                  Please select a conversation from the list to start chatting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
