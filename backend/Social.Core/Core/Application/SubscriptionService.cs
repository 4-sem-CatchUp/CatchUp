using Social.Core.Ports.Incomming;
using Social.Core.Ports.Outgoing;

namespace Social.Core.Application
{
    public class SubscriptionService : ISubscribeUseCases
    {
        private readonly List<Subscription> _subscriptions = new();
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly INotificationSender _notificationSender;

        public SubscriptionService(
            ISubscriptionRepository subscriptionRepository,
            INotificationSender notificationSender
        )
        {
            _subscriptionRepository = subscriptionRepository;
            _notificationSender = notificationSender;
            var entities = _subscriptionRepository.GetAllSubscriptions().Result;
            _subscriptions.AddRange(entities);
        }

        public async Task<IEnumerable<Guid>> GetSubscribedAuthors(Guid subscriberId)
        {
            // Retrieve subscriptions from repository
            var subscriptions =
                await _subscriptionRepository.GetSubscriptionsBySubscriberIdAsync(subscriberId)
                ?? Enumerable.Empty<Subscription>();

            // Return the list of publisher IDs
            return subscriptions.Select(s => s.Publisher.Id);
        }

        public async Task Notify(Profile Subscriber, string message)
        {
            // Retrieve subscriptions from repository
            var subscriptions = _subscriptions.Where(s => s.Publisher.Id == Subscriber.Id).ToList();

            // Send notification to each subscriber
            foreach (var subscription in subscriptions)
            {
                _notificationSender.SendNotification(subscription.Subscriber, message);
            }
        }

        public void Subscribe(Profile subscriber, Profile publisher)
        {
            // Add new subscription
            var subscription = new Subscription(subscriber, publisher);
            _subscriptions.Add(subscription);
            _subscriptionRepository.Add(subscription);
        }

        public void Unsubscribe(Profile subscriber, Profile publisher)
        {
            // Remove existing subscription
            var subscription = _subscriptions.FirstOrDefault(s =>
                s.Subscriber.Id == subscriber.Id && s.Publisher.Id == publisher.Id
            );
            // If found, remove it from both in-memory list and repository
            if (subscription != null)
            {
                _subscriptions.Remove(subscription);
                _subscriptionRepository.Remove(subscription);
            }
            // If not found, throw an exception
            else
            {
                throw new InvalidOperationException("Subscription not found.");
            }
        }
    }
}
