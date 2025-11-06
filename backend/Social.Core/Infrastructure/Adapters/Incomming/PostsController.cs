using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social.Core;
using Social.Core.Ports.Incomming;

namespace Social.Infrastructure.Adapters.Incomming
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostUseCases _postUseCases;
        private readonly ILogger<PostsController> _logger;

        public PostsController(IPostUseCases postUseCases, ILogger<PostsController> logger)
        {
            _postUseCases = postUseCases;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto dto)
        {
            _logger.LogInformation("Creating post for author: {AuthorId}", dto.AuthorId);
            var postId = await _postUseCases.CreatePostAsync(
                dto.AuthorId,
                dto.Title,
                dto.Content,
                dto.Images
            );
            _logger.LogInformation("Post created with ID: {PostId}", postId);
            return CreatedAtAction(
                nameof(PostQueryController.GetPostById),
                new { id = postId },
                null
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdatePostDto dto)
        {
            _logger.LogInformation("Updating post with ID: {PostId}", id);
            await _postUseCases.UpdatePostAsync(id, dto.NewTitle, dto.NewContent);
            _logger.LogInformation("Post with ID: {PostId} updated successfully", id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            _logger.LogInformation("Deleting post with ID: {PostId}", id);
            await _postUseCases.DeletePost(id);
            _logger.LogInformation("Post with ID: {PostId} deleted successfully", id);
            return NoContent();
        }

        [HttpPost("{id}/vote")]
        public async Task<IActionResult> VotePost(Guid id, [FromBody] PostVoteDto dto)
        {
            _logger.LogInformation(
                "User {UserId} voting on post {PostId} with UpVote: {UpVote}",
                dto.UserId,
                id,
                dto.UpVote
            );
            await _postUseCases.VotePost(id, dto.UpVote, dto.UserId);
            _logger.LogInformation(
                "Vote recorded for user {UserId} on post {PostId}",
                dto.UserId,
                id
            );
            return Ok();
        }

        [HttpGet("{id}/vote/{userId}")]
        public async Task<IActionResult> GetUserVote(Guid id, Guid userId)
        {
            _logger.LogInformation(
                "Retrieving vote for user {UserId} on post {PostId}",
                userId,
                id
            );
            var vote = await _postUseCases.GetUserPostVote(id, userId);
            _logger.LogInformation(
                "Vote retrieved for user {UserId} on post {PostId}: {Vote}",
                userId,
                id,
                vote
            );
            return Ok(vote);
        }
    }

    public class CreatePostDto
    {
        public Guid AuthorId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Content { get; set; }
        public List<Image>? Images { get; set; }
    }

    public class UpdatePostDto
    {
        public string? NewTitle { get; set; }
        public string? NewContent { get; set; }
    }

    public class PostVoteDto
    {
        public Guid UserId { get; set; }
        public bool UpVote { get; set; }
    }

    public class ImageDto
    {
        public string FileName { get; set; } = string.Empty;
        public string ContentType { get; set; } = string.Empty;
        public byte[] Data { get; set; } = Array.Empty<byte>();
    }
}
