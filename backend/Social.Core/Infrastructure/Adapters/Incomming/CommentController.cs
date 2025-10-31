using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social.Core;
using Social.Core.Ports.Incomming;

namespace Social.Infrastructure.Adapters.Incomming
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        public readonly ICommentUseCases _commentUseCases;

        public CommentController(ICommentUseCases commentUseCases)
        {
            _commentUseCases = commentUseCases;
        }

        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] AddCommentDto dto)
        {
            var commentId = await _commentUseCases.AddComment(
                dto.PostId,
                dto.AuthorId,
                dto.Text,
                dto.Images
            );
            return CreatedAtAction(nameof(GetCommentById), new { id = commentId }, null);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCommentById(Guid id)
        {
            // Dette kunne kalde et ICommentQueryUseCase, hvis du har et query-lag
            return Ok(new { Message = $"Dummy: Would return comment {id}" });
        }

        [HttpPut("{commentId}, {userId}")]
        public async Task<IActionResult> UpdateComment(
            Guid commentId,
            Guid userId,
            [FromBody] UpdateCommentDto dto
        )
        {
            await _commentUseCases.UpdateCommentAsync(commentId, userId, dto.NewContent);
            return NoContent();
        }

        [HttpDelete("{postId}, {commentId}, {userId}")]
        public async Task<IActionResult> DeleteComment(Guid postId, Guid commentId, Guid userId)
        {
            await _commentUseCases.DeleteComment(postId, commentId, userId);
            return NoContent();
        }

        [HttpPost("{commentId}/vote")]
        public async Task<IActionResult> VoteComment(Guid commentId, [FromBody] CommentVoteDto dto)
        {
            await _commentUseCases.VoteComment(commentId, dto.UpVote, dto.UserId);
            return Ok();
        }

        [HttpGet("{postId}, {commentId}/vote/{userId}")]
        public async Task<IActionResult> GetUserCommentVote(
            Guid postId,
            Guid commentId,
            Guid userId
        )
        {
            var vote = await _commentUseCases.GetUserCommentVote(postId, commentId, userId);
            return Ok(vote);
        }
    }

    public class AddCommentDto
    {
        public Guid PostId { get; set; }
        public Guid AuthorId { get; set; }
        public string? Text { get; set; }
        public List<Image>? Images { get; set; }
    }

    public class UpdateCommentDto
    {
        public string? NewContent { get; set; }
    }

    public class CommentVoteDto
    {
        public bool UpVote { get; set; }
        public Guid UserId { get; set; }
    }
}
