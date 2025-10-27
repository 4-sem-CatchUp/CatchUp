using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using NUnit.Framework.Legacy;
using Social.Core;
using Social.Core.Application;
using Social.Core.Ports.Outgoing;

namespace SocialCoreTests.CoreTests.ApplicationTests
{
    [TestFixture]
    public class SubscriptionServiceTests
    {
        private Mock<ISubscriptionRepository> _subscriptionRepoMock;
        private Mock<INotificationSender> _notificationSenderMock;
        private SubscriptionService _service;
        private Profile _subscriber1;
        private Profile _subscriber2;
        private Profile _publisher1;
        private Profile _publisher2;

        [SetUp]
        public void Setup()
        {
            _subscriptionRepoMock = new Mock<ISubscriptionRepository>();
            _notificationSenderMock = new Mock<INotificationSender>();
            _service = new SubscriptionService(
                _subscriptionRepoMock.Object,
                _notificationSenderMock.Object
            );

            _subscriber1 = new Profile("Alice");
            _subscriber2 = new Profile("Charlie");
            _publisher1 = new Profile("Bob");
            _publisher2 = new Profile("Diana");
        }

        [Test]
        public void Subscribe_AddsSubscriptionAndCallsRepo()
        {
            _service.Subscribe(_subscriber1, _publisher1);

            _subscriptionRepoMock.Verify(r => r.Add(It.IsAny<Subscription>()), Times.Once);
        }

        [Test]
        public void Unsubscribe_RemovesExistingSubscription()
        {
            _service.Subscribe(_subscriber1, _publisher1);

            _service.Unsubscribe(_subscriber1, _publisher1);

            _subscriptionRepoMock.Verify(r => r.Remove(It.IsAny<Subscription>()), Times.Once);
        }

        [Test]
        public void Unsubscribe_NonExisting_ThrowsException()
        {
            Assert.Throws<InvalidOperationException>(() =>
                _service.Unsubscribe(_subscriber1, _publisher1)
            );
        }

        [Test]
        public void Notify_SendsMessageToAllSubscribers()
        {
            // Arrange
            _service.Subscribe(_subscriber1, _publisher1);
            _service.Subscribe(_subscriber2, _publisher1);
            string message = "New post available!";

            // Act
            _service.Notify(_publisher1, message);

            // Assert
            _notificationSenderMock.Verify(
                n => n.SendNotification(_subscriber1, message),
                Times.Once
            );
            _notificationSenderMock.Verify(
                n => n.SendNotification(_subscriber2, message),
                Times.Once
            );
        }

        [Test]
        public void Notify_DoesNotSendMessageToNonSubscribers()
        {
            var nonSubscriber = new Profile("NonSubscriber");
            _service.Subscribe(_subscriber1, _publisher1);
            string message = "Hello!";

            _service.Notify(_publisher1, message);

            _notificationSenderMock.Verify(
                n => n.SendNotification(nonSubscriber, It.IsAny<string>()),
                Times.Never
            );
        }

        [Test]
        public void Subscription_SetsSubscribedOnToUtcNow()
        {
            var subscription = new Subscription(_subscriber1, _publisher1);

            Assert.That(subscription.SubscribedOn, Is.LessThanOrEqualTo(DateTime.UtcNow));
        }

        // 🧩 NY TEST: dækker GetSubscribedAuthors
        [Test]
        public async Task GetSubscribedAuthors_ReturnsPublisherIds()
        {
            // Arrange
            var subscriptions = new List<Subscription>
            {
                new Subscription(_subscriber1, _publisher1),
                new Subscription(_subscriber1, _publisher2),
            };

            _subscriptionRepoMock
                .Setup(r => r.GetSubscriptionsBySubscriberIdAsync(_subscriber1.Id))
                .ReturnsAsync(subscriptions);

            // Act
            var result = await _service.GetSubscribedAuthors(_subscriber1.Id);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(
                result,
                Is.EquivalentTo(new[] { _publisher1.Id, _publisher2.Id }),
                "Metoden returnerede ikke de forventede Publisher-IDs."
            );
        }

        [Test]
        public async Task GetSubscribedAuthors_ReturnsEmpty_WhenNoSubscriptions()
        {
            // Arrange
            _subscriptionRepoMock
                .Setup(r => r.GetSubscriptionsBySubscriberIdAsync(_subscriber1.Id))
                .ReturnsAsync(new List<Subscription>());

            // Act
            var result = await _service.GetSubscribedAuthors(_subscriber1.Id);

            // Assert
            Assert.That(result, Is.Empty, "Der burde ikke returneres nogen publisher-IDs.");
        }

        [Test]
        public async Task GetSubscribedAuthors_ReturnsEmpty_WhenRepositoryReturnsNull()
        {
            // Arrange: Repository returnerer null
            _subscriptionRepoMock
                .Setup(r => r.GetSubscriptionsBySubscriberIdAsync(_subscriber1.Id))
                .ReturnsAsync((IEnumerable<Subscription>?)null!); // Vi tvinger null

            // Act
            var result = await _service.GetSubscribedAuthors(_subscriber1.Id);

            // Assert
            Assert.That(
                result,
                Is.Empty,
                "Metoden burde returnere tom liste, hvis repository returnerer null."
            );
        }

        [Test]
        public async Task GetSubscribedAuthors_HandlesEmptySubscriptionListGracefully()
        {
            // Arrange: Repository returnerer tom liste
            _subscriptionRepoMock
                .Setup(r => r.GetSubscriptionsBySubscriberIdAsync(_subscriber1.Id))
                .ReturnsAsync(new List<Subscription>());

            // Act
            var result = await _service.GetSubscribedAuthors(_subscriber1.Id);

            // Assert
            Assert.That(
                result,
                Is.Empty,
                "Metoden burde returnere tom liste, hvis der ingen subscriptions er."
            );
        }
    }
}
