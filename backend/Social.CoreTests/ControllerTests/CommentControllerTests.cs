using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Social.Core;
using Social.Core.Ports.Incomming;
using Social.Infrastructure.Adapters.Incomming;

namespace SocialCoreTests.ControllerTests
{
    [TestFixture]
    public class CommentControllerTests
    {
        private Mock<ICommentUseCases> _mockUseCases;
        private CommentController _controller;

        [SetUp]
        public void Setup()
        {
            _mockUseCases = new Mock<ICommentUseCases>();
            _controller = new CommentController(_mockUseCases.Object);
        }

        [Test]
        public async Task AddComment_ReturnsCreatedAtAction()
        {
            var commentId = Guid.NewGuid();
            _mockUseCases
                .Setup(x =>
                    x.AddComment(
                        It.IsAny<Guid>(),
                        It.IsAny<Guid>(),
                        It.IsAny<string>(),
                        It.IsAny<List<Image>?>()
                    )
                )
                .ReturnsAsync(commentId);

            var dto = new AddCommentDto
            {
                PostId = Guid.NewGuid(),
                AuthorId = Guid.NewGuid(),
                Text = "Hello",
            };

            var result = await _controller.AddComment(dto);

            Assert.That(result, Is.InstanceOf<CreatedAtActionResult>());
            var createdResult = (CreatedAtActionResult)result;
            Assert.That(createdResult.RouteValues!["id"], Is.EqualTo(commentId));
        }

        [Test]
        public async Task UpdateComment_WhenNotAuthorized_ReturnsForbid()
        {
            _mockUseCases
                .Setup(x =>
                    x.UpdateCommentAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<string>())
                )
                .ReturnsAsync(false);

            var result = await _controller.UpdateComment(
                Guid.NewGuid(),
                Guid.NewGuid(),
                new UpdateCommentDto { NewContent = "test" }
            );

            Assert.That(result, Is.InstanceOf<ForbidResult>());
        }

        [Test]
        public async Task DeleteComment_WhenNotAuthorized_ReturnsForbid()
        {
            _mockUseCases
                .Setup(x => x.DeleteComment(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<Guid>()))
                .ReturnsAsync(false);

            var result = await _controller.DeleteComment(
                Guid.NewGuid(),
                Guid.NewGuid(),
                Guid.NewGuid()
            );

            Assert.That(result, Is.InstanceOf<ForbidResult>());
        }

        [Test]
        public async Task VoteComment_ReturnsOk()
        {
            var dto = new CommentVoteDto { UserId = Guid.NewGuid(), UpVote = true };

            var result = await _controller.VoteComment(Guid.NewGuid(), dto);

            Assert.That(result, Is.InstanceOf<OkResult>());
            _mockUseCases.Verify(
                x => x.VoteComment(It.IsAny<Guid>(), dto.UpVote, dto.UserId),
                Times.Once
            );
        }
    }
}
