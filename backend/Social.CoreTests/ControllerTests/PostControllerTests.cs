using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Social.Core;
using Social.Core.Ports.Incomming;
using Social.Infrastructure.Adapters.Incomming;

namespace SocialCoreTests.ControllerTests
{
    [TestFixture]
    public class PostsControllerTests
    {
        private Mock<IPostUseCases> _postUseCasesMock;
        private PostsController _controller;
        private Mock<ILogger<PostsController>> _loggerMock;

        [SetUp]
        public void Setup()
        {
            _postUseCasesMock = new Mock<IPostUseCases>();
            _loggerMock = new Mock<ILogger<PostsController>>();
            _controller = new PostsController(_postUseCasesMock.Object, _loggerMock.Object);
        }

        [Test]
        public async Task CreatePost_Returns_CreatedAtAction()
        {
            var dto = new CreatePostDto
            {
                AuthorId = Guid.NewGuid(),
                Title = "Test Post",
                Content = "Some content",
                Images = new List<Image>(),
            };
            var postId = Guid.NewGuid();
            _postUseCasesMock
                .Setup(u => u.CreatePostAsync(dto.AuthorId, dto.Title, dto.Content, dto.Images))
                .ReturnsAsync(postId);

            var result = await _controller.CreatePost(dto) as CreatedAtActionResult;

            Assert.That(result, Is.Not.Null);
            Assert.That(result.ActionName, Is.EqualTo(nameof(PostQueryController.GetPostById)));
            Assert.That(result.RouteValues!["id"], Is.EqualTo(postId));
        }

        [Test]
        public async Task UpdatePost_Returns_NoContent()
        {
            var dto = new UpdatePostDto { NewTitle = "New", NewContent = "Updated" };
            var id = Guid.NewGuid();

            var result = await _controller.UpdatePost(id, dto) as NoContentResult;

            Assert.That(result, Is.Not.Null);
            _postUseCasesMock.Verify(
                u => u.UpdatePostAsync(id, dto.NewTitle, dto.NewContent),
                Times.Once
            );
        }

        [Test]
        public async Task DeletePost_Returns_NoContent()
        {
            var id = Guid.NewGuid();

            var result = await _controller.DeletePost(id) as NoContentResult;

            Assert.That(result, Is.Not.Null);
            _postUseCasesMock.Verify(u => u.DeletePost(id), Times.Once);
        }

        [Test]
        public async Task VotePost_Returns_Ok()
        {
            var id = Guid.NewGuid();
            var dto = new PostVoteDto { UserId = Guid.NewGuid(), UpVote = true };

            var result = await _controller.VotePost(id, dto) as OkResult;

            Assert.That(result, Is.Not.Null);
            _postUseCasesMock.Verify(u => u.VotePost(id, dto.UpVote, dto.UserId), Times.Once);
        }

        [Test]
        public async Task GetUserVote_Returns_OkWithVote()
        {
            var id = Guid.NewGuid();
            var userId = Guid.NewGuid();
            bool? vote = true;

            _postUseCasesMock
                .Setup(u => u.GetUserPostVote(It.IsAny<Guid>(), It.IsAny<Guid>()))
                .ReturnsAsync(vote);

            var result = await _controller.GetUserVote(id, userId) as OkObjectResult;

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Value, Is.EqualTo(vote));
        }
    }
}
