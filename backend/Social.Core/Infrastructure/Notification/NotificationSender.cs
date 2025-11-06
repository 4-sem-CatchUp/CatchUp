using Microsoft.AspNetCore.SignalR;
using Social.Core;
using Social.Core.Ports.Outgoing;
using Social.Social.Infrastructure.Notification;

namespace Social.Infrastructure.Notification
{
    public class NotificationSender : INotificationSender
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationSender(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task SendNotification(Profile recipient, string message)
        {
            await _hubContext
                .Clients.User(recipient.Id.ToString())
                .SendAsync("ReceiveNotification", message);
        }
    }
}
