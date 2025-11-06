using Microsoft.AspNetCore.SignalR;
using Social.Core;
using Social.Core.Ports.Outgoing;
using Social.Social.Infrastructure.Notification;

namespace Social.Infrastructure.Notification
{
    public class ChatNotifierService : IChatNotifier
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatNotifierService(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task NotifyChatCreated(Chat chat)
        {
            await _hubContext.Clients.All.SendAsync("ChatCreated", chat);
        }

        public async Task NotifyMessageSent(ChatMessage message)
        {
            await _hubContext
                .Clients.Group(message.ChatId.ToString())
                .SendAsync("MessageSent", message);
        }
    }
}
