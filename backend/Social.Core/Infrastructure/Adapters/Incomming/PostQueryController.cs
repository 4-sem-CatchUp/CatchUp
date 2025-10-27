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

        public PostQueryController(IPostQueryUseCases queryService)
        {
            _queryService = queryService;
        }

        [HttpGet("feed")]
        public async Task<IActionResult> GetFeed([FromQuery] Guid? userId)
        {
            var feed = await _queryService.GetFeedAsync(userId);
            return Ok(feed);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(Guid id)
        {
            var post = await _queryService.GetPostByIdAsync(id);
            if (post == null)
                return NotFound();
            return Ok(post);
        }
    }
}
