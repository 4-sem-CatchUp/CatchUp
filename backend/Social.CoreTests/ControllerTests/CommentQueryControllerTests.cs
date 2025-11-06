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
    public class CommentQueryControllerTests
    {
        private Mock<ICommentQueryUseCases> _mockQuery;
        private Mock<ILogger<CommentQueryController>> _loggerMock;
        private CommentQueryController _controller;

        [SetUp]
        public void Setup()
        {
            _mockQuery = new Mock<ICommentQueryUseCases>();
            _loggerMock = new Mock<ILogger<CommentQueryController>>();
            _controller = new CommentQueryController(_mockQuery.Object, _loggerMock.Object);
        }

        [Test]
        public async Task GetCommentById_WhenCommentExists_ReturnsOk()
        {
            var commentId = Guid.NewGuid();
            var dummyComment = new Comment(commentId, Guid.Empty, "Hello", DateTime.Now, null);

            _mockQuery.Setup(x => x.GetCommentByIdAsync(commentId)).ReturnsAsync(dummyComment);

            var result = await _controller.GetCommentById(commentId);

            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = (OkObjectResult)result;
            Assert.That(okResult.Value, Is.EqualTo(dummyComment));
        }

        [Test]
        public async Task GetCommentById_WhenNotFound_ReturnsNotFound()
        {
            var commentId = Guid.NewGuid();

            _mockQuery.Setup(x => x.GetCommentByIdAsync(commentId)).ReturnsAsync((Comment?)null);

            var result = await _controller.GetCommentById(commentId);

            Assert.That(result, Is.InstanceOf<NotFoundResult>());
        }

        [Test]
        public async Task GetCommentsForPost_ReturnsOk()
        {
            // Arrange
            var postId = Guid.NewGuid();

            // Lav dummy kommentarer
            var comments = new List<Comment>
            {
                new Comment(
                    Guid.NewGuid(),
                    Guid.NewGuid(),
                    "Kommentar 1",
                    DateTime.UtcNow,
                    new List<Vote>()
                ),
                new Comment(
                    Guid.NewGuid(),
                    Guid.NewGuid(),
                    "Kommentar 2",
                    DateTime.UtcNow,
                    new List<Vote>()
                ),
            };

            // Mock GetCommentsByPostIdAsync til at returnere disse kommentarer
            _mockQuery.Setup(x => x.GetCommentsByPostIdAsync(postId)).ReturnsAsync(comments);

            // Act
            var result = await _controller.GetCommentsForPost(postId);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = (OkObjectResult)result;

            // Test at Value indeholder præcis de mocked kommentarer
            Assert.That(okResult.Value, Is.EqualTo(comments));
        }

        [Test]
        public async Task GetUserCommentVote_ReturnsOk()
        {
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            bool? vote = true;

            _mockQuery.Setup(x => x.GetUserCommentVoteAsync(commentId, userId)).ReturnsAsync(vote);

            var result = await _controller.GetUserCommentVote(commentId, userId);

            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = (OkObjectResult)result;

            var value = (UserVoteDto)okResult.Value!;
            Assert.That(value.Upvoted, Is.EqualTo(vote));
        }
    }
}
