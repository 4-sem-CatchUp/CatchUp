using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Social.Core;
using Social.Core.Ports.Incomming;
using Social.Infrastructure.Adapters.Incomming;

namespace SocialCoreTests.ControllerTests
{
    [TestFixture]
    public class PostQueryControllerTests
    {
        private Mock<IPostQueryUseCases> _queryUseCasesMock;
        private PostQueryController _controller;
        private Mock<ILogger<PostQueryController>> _loggerMock;

        [SetUp]
        public void Setup()
        {
            _queryUseCasesMock = new Mock<IPostQueryUseCases>();
            _loggerMock = new Mock<ILogger<PostQueryController>>();
            _controller = new PostQueryController(_queryUseCasesMock.Object, _loggerMock.Object);
        }

        [Test]
        public async Task GetPostById_Returns_Ok_When_PostExists()
        {
            var postId = Guid.NewGuid();
            var post = Post.CreateNewPost(Guid.NewGuid(), "Title", "Content");

            _queryUseCasesMock.Setup(q => q.GetPostByIdAsync(postId)).ReturnsAsync(post);

            var result = await _controller.GetPostById(postId) as OkObjectResult;

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Value, Is.EqualTo(post));
        }

        [Test]
        public async Task GetPostById_Returns_NotFound_When_PostDoesNotExist()
        {
            var postId = Guid.NewGuid();

            _queryUseCasesMock.Setup(q => q.GetPostByIdAsync(postId)).ReturnsAsync((Post?)null);

            var result = await _controller.GetPostById(postId) as NotFoundResult;

            Assert.That(result, Is.Not.Null);
        }

        [Test]
        public async Task GetFeed_Returns_Ok_WithPosts()
        {
            var userId = Guid.NewGuid();
            var posts = new List<Post>
            {
                Post.CreateNewPost(Guid.NewGuid(), "Title1", "C1"),
                Post.CreateNewPost(Guid.NewGuid(), "Title2", "C2"),
            };

            _queryUseCasesMock.Setup(q => q.GetFeedAsync(userId)).ReturnsAsync(posts);

            var result = await _controller.GetFeed(userId) as OkObjectResult;

            Assert.That(result, Is.Not.Null);
            var value = result.Value as IEnumerable<Post>;
            Assert.That(value!.Count(), Is.EqualTo(2));
        }
    }
}
