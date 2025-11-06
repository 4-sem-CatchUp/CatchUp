using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using Social.Core;
using Social.Core.Application;
using Social.Core.Ports.Outgoing;

namespace SocialCoreTests.CoreTests.ApplicationTests
{
    [TestFixture]
    public class CommentQueryServicesTests
    {
        private Mock<ICommentRepository> _commentRepoMock;
        private Mock<IVoteRepository> _voteRepoMock;
        private CommentQueryServices _service;

        [SetUp]
        public void Setup()
        {
            _commentRepoMock = new Mock<ICommentRepository>();
            _voteRepoMock = new Mock<IVoteRepository>();
            _service = new CommentQueryServices(_commentRepoMock.Object, _voteRepoMock.Object);
        }

        [Test]
        public async Task GetCommentByIdAsync_Returns_Comment_WhenExists()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var comment = Comment.CreateNewComment(Guid.NewGuid(), "Test comment");
            _commentRepoMock.Setup(r => r.GetByIdAsync(commentId)).ReturnsAsync(comment);

            // Act
            var result = await _service.GetCommentByIdAsync(commentId);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Content, Is.EqualTo("Test comment"));
        }

        [Test]
        public async Task GetCommentByIdAsync_Returns_Null_WhenNotFound()
        {
            // Arrange
            _commentRepoMock
                .Setup(r => r.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync((Comment?)null);

            // Act
            var result = await _service.GetCommentByIdAsync(Guid.NewGuid());

            // Assert
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task GetCommentsByPostIdAsync_Returns_Comments()
        {
            // Arrange
            var postId = Guid.NewGuid();
            var comments = new List<Comment>
            {
                Comment.CreateNewComment(Guid.NewGuid(), "C1"),
                Comment.CreateNewComment(Guid.NewGuid(), "C2"),
            };
            _commentRepoMock.Setup(r => r.GetCommentsByIdAsync(postId)).ReturnsAsync(comments);

            // Act
            var result = await _service.GetCommentsByPostIdAsync(postId);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetUserCommentVoteAsync_Returns_UpvoteStatus()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var vote = new Vote
            {
                Id = Guid.NewGuid(),
                TargetId = commentId,
                VoteTargetType = VoteTargetType.Comment,
                UserId = userId,
                Upvote = true,
            };
            _voteRepoMock
                .Setup(r => r.GetUserVoteAsync(commentId, VoteTargetType.Comment, userId))
                .ReturnsAsync(vote);

            // Act
            var result = await _service.GetUserCommentVoteAsync(commentId, userId);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public async Task GetUserCommentVoteAsync_Returns_Null_WhenNoVote()
        {
            // Arrange
            _voteRepoMock
                .Setup(r =>
                    r.GetUserVoteAsync(It.IsAny<Guid>(), VoteTargetType.Comment, It.IsAny<Guid>())
                )
                .ReturnsAsync((Vote?)null);

            // Act
            var result = await _service.GetUserCommentVoteAsync(Guid.NewGuid(), Guid.NewGuid());

            // Assert
            Assert.That(result, Is.Null);
        }
    }
}
