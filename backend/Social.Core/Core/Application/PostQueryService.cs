using Social.Core.Ports.Incomming;
using Social.Core.Ports.Outgoing;

namespace Social.Core.Application
{
    public class PostQueryService : IPostQueryUseCases
    {
        private readonly IPostRepository _postRepository;
        private readonly IProfileRepository _profileRepository;
        private readonly ISubscribeUseCases _subscriptionService;

        public PostQueryService(
            IPostRepository postRepository,
            IProfileRepository profileRepository,
            ISubscribeUseCases subscriptionService
        )
        {
            _postRepository = postRepository;
            _profileRepository = profileRepository;
            _subscriptionService = subscriptionService;
        }

        public async Task<IEnumerable<Post>> GetFeedAsync(Guid? userId = null)
        {
            // If userId is provided, get personalized feed; otherwise, return all posts
            if (userId.HasValue)
            {
                // Validate that the user exists
                var profile = await _profileRepository.GetProfileByIdAsync(userId.Value);
                if (profile == null)
                {
                    throw new InvalidOperationException("Profile not found.");
                }
                // Here you would typically get the list of authors the user is subscribed to
                // and then fetch posts from those authors. For simplicity, we'll just return all posts.

                var subscribedAuthors = await _subscriptionService.GetSubscribedAuthors(
                    userId.Value
                );

                return await _postRepository.GetFeedByAuthorsAsync(subscribedAuthors);
            }
            else
            {
                return await _postRepository.GetAllAsync();
            }
        }

        public async Task<Post?> GetPostByIdAsync(Guid postId)
        {
            // Retrieve post by its ID
            var post = await _postRepository.GetByIdAsync(postId);
            return post;
        }
    }
}
