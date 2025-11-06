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
            return CreatedAtAction(nameof(AddComment), new { id = commentId }, null);
        }

        [HttpPut("{commentId:guid}/{userId:guid}")]
        public async Task<IActionResult> UpdateComment(
            Guid commentId,
            Guid userId,
            [FromBody] UpdateCommentDto dto
        )
        {
            var result = await _commentUseCases.UpdateCommentAsync(
                commentId,
                userId,
                dto.NewContent
            );
            if (result == false)
                return Forbid();
            return NoContent();
        }

        [HttpDelete("{postId:guid}/{commentId:guid}/{userId:guid}")]
        public async Task<IActionResult> DeleteComment(Guid postId, Guid commentId, Guid userId)
        {
            var result = await _commentUseCases.DeleteComment(postId, commentId, userId);
            if (result == false)
                return Forbid();
            return NoContent();
        }

        [HttpPost("{commentId:guid}/vote")]
        public async Task<IActionResult> VoteComment(Guid commentId, [FromBody] CommentVoteDto dto)
        {
            await _commentUseCases.VoteComment(commentId, dto.UpVote, dto.UserId);
            return Ok();
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
