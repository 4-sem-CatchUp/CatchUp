//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Logging;
//using Moq;
//using Social.Core.Ports.Incomming;
//using Social.Infrastructure.Adapters.Incomming;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace SocialCoreTests.ControllerTests
//{
//    [TestFixture]
//    public class CommentQueryControllerTests
//    {
//        private Mock<ICommentQueryUseCases> _mockQuery;
//        private Mock<ILogger<CommentQueryController>> _loggerMock;
//        private CommentQueryController _controller;

//        [SetUp]
//        public void Setup()
//        {
//            _mockQuery = new Mock<ICommentQueryUseCases>();
//            _loggerMock = new Mock<ILogger<CommentQueryController>>();
//            _controller = new CommentQueryController(_mockQuery.Object, _loggerMock.Object);
//        }

//        [Test]
//        public async Task GetCommentById_WhenCommentExists_ReturnsOk()
//        {
//            var commentId = Guid.NewGuid();
//            var dummyComment = new { Id = commentId, Content = "Hello" };

//            _mockQuery.Setup(x => x.GetCommentsByPostIdAsync(commentId))
//                      .ReturnsAsync(dummyComment);

//            var result = await _controller.GetCommentById(commentId);

//            Assert.That(result, Is.InstanceOf<OkObjectResult>());
//            var okResult = (OkObjectResult)result;
//            Assert.That(okResult.Value, Is.EqualTo(dummyComment));
//        }

//        [Test]
//        public async Task GetCommentById_WhenNotFound_ReturnsNotFound()
//        {
//            var commentId = Guid.NewGuid();

//            _mockQuery.Setup(x => x.GetCommentByIdAsync(commentId))
//                      .ReturnsAsync((object?)null);

//            var result = await _controller.GetCommentById(commentId);

//            Assert.That(result, Is.InstanceOf<NotFoundResult>());
//        }

//        [Test]
//        public async Task GetCommentsForPost_ReturnsOk()
//        {
//            var postId = Guid.NewGuid();
//            var comments = new List<object> { new { Id = Guid.NewGuid(), Content = "A" } };

//            _mockQuery.Setup(x => x.GetCommentsByPostIdAsync(postId))
//                      .ReturnsAsync(comments);

//            var result = await _controller.GetCommentsForPost(postId);

//            Assert.That(result, Is.InstanceOf<OkObjectResult>());
//            var okResult = (OkObjectResult)result;
//            Assert.That(okResult.Value, Is.EqualTo(comments));
//        }

//        [Test]
//        public async Task GetUserCommentVote_ReturnsOk()
//        {
//            var commentId = Guid.NewGuid();
//            var userId = Guid.NewGuid();
//            bool? vote = true;

//            _mockQuery.Setup(x => x.GetUserCommentVoteAsync(commentId, userId))
//                      .ReturnsAsync(vote);

//            var result = await _controller.GetUserCommentVote(commentId, userId);

//            Assert.That(result, Is.InstanceOf<OkObjectResult>());
//            var okResult = (OkObjectResult)result;
//            dynamic value = okResult.Value!;
//            Assert.That(value.upvoted, Is.EqualTo(vote));
//        }
//    }
