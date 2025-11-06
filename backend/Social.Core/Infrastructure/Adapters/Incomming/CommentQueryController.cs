using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social.Core.Ports.Incomming;

namespace Social.Infrastructure.Adapters.Incomming
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentQueryController : ControllerBase
    {
        private readonly ICommentQueryUseCases _commentQueryUseCases;
        private readonly ILogger<CommentQueryController> _logger;

        public CommentQueryController(
            ICommentQueryUseCases commentQueryUseCases,
            ILogger<CommentQueryController> logger
        )
        {
            _commentQueryUseCases = commentQueryUseCases;
            _logger = logger;
        }

        [HttpGet("{commentId:guid}")]
        public async Task<IActionResult> GetCommentById(Guid commentId)
        {
            _logger.LogInformation("Getting comment by ID: {CommentId}", commentId);
            var comment = await _commentQueryUseCases.GetCommentByIdAsync(commentId);
            if (comment == null)
            {
                _logger.LogWarning("Comment with ID: {CommentId} not found", commentId);
                return NotFound();
            }
            _logger.LogInformation(
                "Comment with ID: {CommentId} retrieved successfully",
                commentId
            );
            return Ok(comment);
        }

        [HttpGet("post/{postId:guid}")]
        public async Task<IActionResult> GetCommentsForPost(Guid postId)
        {
            _logger.LogInformation("Getting comments for post ID: {PostId}", postId);
            var comments = await _commentQueryUseCases.GetCommentsByPostIdAsync(postId);
            _logger.LogInformation(
                "Retrieved {CommentCount} comments for post ID: {PostId}",
                comments.Count(),
                postId
            );
            return Ok(comments);
        }

        [HttpGet("{commetId:guid}/vote/{userId:guid}")]
        public async Task<IActionResult> GetUserCommentVote(Guid commentId, Guid userId)
        {
            _logger.LogInformation(
                "Getting vote for comment ID: {CommentId} by user ID: {UserId}",
                commentId,
                userId
            );
            var vote = await _commentQueryUseCases.GetUserCommentVoteAsync(commentId, userId);
            _logger.LogInformation(
                "Vote for comment ID: {CommentId} by user ID: {UserId} is {Vote}",
                commentId,
                userId,
                vote
            );
            return Ok(new UserVoteDto { Upvoted = vote });
        }
    }

    public class UserVoteDto
    {
        public bool? Upvoted { get; set; }
    }
}
