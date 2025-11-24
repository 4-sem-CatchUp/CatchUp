using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework.Legacy;
using Social.Core;
using Social.Core.Application;
using Social.Core.Ports.Incomming;
using Social.Core.Ports.Outgoing;

namespace SocialCoreTests.CoreTests.ApplicationTests
{
    [TestFixture]
    public class PostQueryServiceEdgeTests
    {
        private FakePostRepository _postRepo;
        private FakeProfileRepository _profileRepo;
        private FakeSubscribeService _subscribeService;
        private PostQueryService _queryService;

        private Guid _userId;
        private Guid _author1;
        private Guid _author2;

        [SetUp]
        public void Setup()
        {
            _postRepo = new FakePostRepository();
            _profileRepo = new FakeProfileRepository();
            _subscribeService = new FakeSubscribeService();
            _queryService = new PostQueryService(_postRepo, _profileRepo, _subscribeService);

            _userId = Guid.NewGuid();
            _author1 = Guid.NewGuid();
            _author2 = Guid.NewGuid();
        }

        [Test]
        public void GetFeedAsync_Throws_WhenProfileNotFound()
        {
            // Arrange: FakeProfileRepository returnerer null
            var fakeProfileRepo = new FakeProfileRepositoryAlwaysNull();
            var service = new PostQueryService(_postRepo, fakeProfileRepo, _subscribeService);

            // Act & Assert
            Assert.ThrowsAsync<InvalidOperationException>(
                async () => await service.GetFeedAsync(_userId),
                "Metoden burde kaste InvalidOperationException, når profilen ikke findes."
            );
        }

        [Test]
        public async Task GetFeedAsync_ReturnsEmpty_WhenNoSubscriptions()
        {
            // Arrange: Profil findes, men ingen subscriptions
            _subscribeService.SetSubscriptions(_userId, new List<Guid>());

            // Act
            var feed = await _queryService.GetFeedAsync(_userId);

            // Assert
            Assert.That(feed, Is.Empty, "Feed burde være tomt, når user har ingen subscriptions.");
        }

        [Test]
        public async Task GetFeedAsync_ReturnsAllSubscribedAuthorsPosts()
        {
            // Arrange: flere authors, flere posts
            var post1 = Post.CreateNewPost(_author1, "Post 1", "Content 1");
            var post2 = Post.CreateNewPost(_author2, "Post 2", "Content 2");
            var post3 = Post.CreateNewPost(Guid.NewGuid(), "Post 3", "Content 3"); // Ikke abonneret

            await _postRepo.AddAsync(post1);
            await _postRepo.AddAsync(post2);
            await _postRepo.AddAsync(post3);

            _subscribeService.SetSubscriptions(_userId, new List<Guid> { _author1, _author2 });

            // Act
            var feed = await _queryService.GetFeedAsync(_userId);

            // Assert
            Assert.That(feed.Count(), Is.EqualTo(2));
            Assert.That(
                feed.Select(p => p.AuthorId),
                Is.EquivalentTo(new[] { _author1, _author2 }),
                "Feed burde kun indeholde posts fra abonnementsliste."
            );
        }
    }

    // Helper FakeRepository som altid returnerer null for profiler
    public class FakeProfileRepositoryAlwaysNull : IProfileRepository
    {
        public Task AddProfileAsync(Profile profile) => Task.CompletedTask;

        public Task DeleteProfileAsync(Guid profileId) => Task.CompletedTask;

        public Task<IEnumerable<Profile>> GetAllProfilesAsync() =>
            Task.FromResult<IEnumerable<Profile>>(new List<Profile>());

        public Task<Profile?> GetProfileByIdAsync(Guid id) => Task.FromResult<Profile?>(null);

        public Task UpdateProfileAsync(Profile profile) => Task.CompletedTask;

        public Task AddFriendAsync(Guid profileId, Guid friendId) => Task.CompletedTask;
        public Task<Profile?> GetProfileByUserNameAsync(string username)
        {
            return Task.FromResult<Profile?>(null);
        }
    }

    // Fake repositories til test
    public class FakePostRepository : IPostRepository
    {
        private readonly List<Post> _posts = new();

        public Task AddAsync(Post post)
        {
            _posts.Add(post);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid postId)
        {
            _posts.RemoveAll(p => p.Id == postId);
            return Task.CompletedTask;
        }

        public Task<IEnumerable<Post>> GetAllAsync() => Task.FromResult<IEnumerable<Post>>(_posts);

        public Task<Post?> GetByIdAsync(Guid postId) =>
            Task.FromResult(_posts.FirstOrDefault(p => p.Id == postId));

        public Task<IEnumerable<Post>> GetFeedByAuthorsAsync(IEnumerable<Guid> authorIds) =>
            Task.FromResult<IEnumerable<Post>>(_posts.Where(p => authorIds.Contains(p.AuthorId)));

        public Task UpdateAsync(Post post)
        {
            var idx = _posts.FindIndex(p => p.Id == post.Id);
            if (idx >= 0)
                _posts[idx] = post;
            return Task.CompletedTask;
        }
    }

    public class FakeProfileRepository : IProfileRepository
    {
        public Task<Profile?> GetProfileByIdAsync(Guid id) =>
            Task.FromResult<Profile?>(new Profile { Id = id, Name = "TestUser" });

        public Task AddProfileAsync(Profile profile) => Task.CompletedTask;

        public Task DeleteProfileAsync(Guid profileId) => Task.CompletedTask;

        public Task<IEnumerable<Profile>> GetAllProfilesAsync() =>
            Task.FromResult<IEnumerable<Profile>>(new List<Profile>());

        public Task UpdateProfileAsync(Profile profile) => Task.CompletedTask;

        public Task AddFriendAsync(Guid profileId, Guid friendId) => Task.CompletedTask;
        public Task<Profile?> GetProfileByUserNameAsync(string username)
        {
            // Return whatever you're testing for
            return Task.FromResult<Profile?>(null);
        }
    }

    public class FakeSubscribeService : ISubscribeUseCases
    {
        private readonly Dictionary<Guid, List<Guid>> _subscriptions = new();

        public void SetSubscriptions(Guid userId, List<Guid> authorIds) =>
            _subscriptions[userId] = authorIds;

        public Task<IEnumerable<Guid>> GetSubscribedAuthors(Guid subscriberId) =>
            Task.FromResult(
                _subscriptions.ContainsKey(subscriberId)
                    ? _subscriptions[subscriberId].AsEnumerable()
                    : Enumerable.Empty<Guid>()
            );

        public Task Notify(Profile profile, string message) => Task.CompletedTask;

        public void Subscribe(Profile subscriber, Profile publisher) =>
            throw new NotImplementedException();

        public void Unsubscribe(Profile subscriber, Profile publisher) =>
            throw new NotImplementedException();
    }
}
