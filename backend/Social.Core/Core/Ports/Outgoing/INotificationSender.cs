namespace Social.Core.Ports.Outgoing
{
    public interface INotificationSender
    {
        Task SendNotification(Profile recipient, string message);
    }
}
