import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  // NOTE***** That we made overflow hidden here as we don't want Chat + ChatInput both to scroll, but only inside Chat comp. to scroll
  // For SideBar, we already have overflow-y-auto in layout.tsx
  // console.log(Props);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <div className="flex justify-center items-center shadow-2xl shadow-white">
        <ChatInput chatId={id} />
      </div>
    </div>
  );
}

export default ChatPage;
