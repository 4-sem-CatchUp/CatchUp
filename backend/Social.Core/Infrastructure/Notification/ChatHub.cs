using Microsoft.AspNetCore.SignalR;
using Social.Core;
using Social.Core.Ports.Outgoing;

namespace Social.Social.Infrastructure.Notification
{
    public class ChatHub : Hub, IChatNotifier
    {
        public async Task NotifyChatCreated(Chat chat)
        {
            await Clients.All.SendAsync("ChatCreated", chat);
        }

        public async Task NotifyMessageSent(ChatMessage message)
        {
            await Clients.Group(message.ChatId.ToString()).SendAsync("MessageSent", message);
        }
    }
}
