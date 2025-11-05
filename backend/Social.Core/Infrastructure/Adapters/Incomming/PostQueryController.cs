using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social.Core.Ports.Incomming;

namespace Social.Infrastructure.Adapters.Incomming
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostQueryController : ControllerBase
    {
        private readonly IPostQueryUseCases _queryService;
        private readonly ILogger<PostQueryController> _logger;

        public PostQueryController(
            IPostQueryUseCases queryService,
            ILogger<PostQueryController> logger
        )
        {
            _queryService = queryService;
            _logger = logger;
        }

        [HttpGet("feed")]
        public async Task<IActionResult> GetFeed([FromQuery] Guid? userId)
        {
            _logger.LogInformation("Getting feed for user: {UserId}", userId);
            var feed = await _queryService.GetFeedAsync(userId);
            _logger.LogInformation("Feed retrieved with {PostCount} posts", feed.Count());
            return Ok(feed);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(Guid id)
        {
            _logger.LogInformation("Getting post by ID: {PostId}", id);
            var post = await _queryService.GetPostByIdAsync(id);
            if (post == null)
            {
                _logger.LogWarning("Post with ID: {PostId} not found", id);
                return NotFound();
            }
            _logger.LogInformation("Post with ID: {PostId} retrieved successfully", id);
            return Ok(post);
        }
    }
}
