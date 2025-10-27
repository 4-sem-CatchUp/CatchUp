using Microsoft.AspNetCore.Http.Connections;
using Social.Core;
using Social.Core.Ports.Incomming;
using Social.Core.Ports.Outgoing;

namespace Social.Core.Application
{
    public class PostService : IPostUseCases
    {
        private readonly IPostRepository _postRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IVoteRepository _voteRepository;
        private readonly IProfileRepository _profileRepository;
        private readonly ISubscribeUseCases _subscriptionService;

        public PostService(
            IPostRepository postRepository,
            ICommentRepository commentRepository,
            IVoteRepository voteRepository,
            IProfileRepository profileRepository,
            ISubscribeUseCases subscribeUseCases
        )
        {
            _postRepository = postRepository;
            _commentRepository = commentRepository;
            _voteRepository = voteRepository;
            _profileRepository = profileRepository;
            _subscriptionService = subscribeUseCases;
        }

        public async Task<Guid> CreatePostAsync(
            Guid authorId,
            string title,
            string? content,
            List<Image>? images
        )
        {
            // Create new post
            var post = Post.CreateNewPost(authorId, title, content);
            // Add images if any
            if (images != null)
            {
                foreach (var image in images)
                {
                    post.AddImage(image.FileName, image.ContentType, image.Data);
                }
            }
            // Save post to repository
            await _postRepository.AddAsync(post);
            return post.Id;
        }

        public async Task VotePost(Guid postId, bool upVote, Guid userId)
        {
            // Retrieve the post
            var post =
                await _postRepository.GetByIdAsync(postId)
                ?? throw new InvalidOperationException("Post not found");

            // Add or update the vote
            var vote = post.AddVote(userId, upVote);

            // Persist the vote
            if (vote.Action == VoteAction.Add)
                await _voteRepository.AddAsync(vote);
            else if (vote.Action == VoteAction.Update)
                await _voteRepository.UpdateAsync(vote);
            else if (vote.Action == VoteAction.Remove)
                await _voteRepository.DeleteAsync(vote.Id);

            // Notify post author about the new vote
            var profile =
                await _profileRepository.GetProfileByIdAsync(post.AuthorId)
                ?? throw new InvalidOperationException("Profile not found");
            await _subscriptionService.Notify(
                profile,
                $"Your post ({post.Id}) received a new vote."
            );
        }

        public async Task<bool?> GetUserPostVote(Guid postId, Guid userId)
        {
            // Retrieve the user's vote on the post
            var vote = await _voteRepository.GetUserVoteAsync(postId, VoteTargetType.Post, userId);
            return vote?.Upvote;
        }

        public async Task DeletePost(Guid postId)
        {
            // Retrieve the post
            var post =
                await _postRepository.GetByIdAsync(postId)
                ?? throw new InvalidOperationException("Post not found");
            // Delete associated comments
            await _postRepository.DeleteAsync(postId);
        }

        public async Task UpdatePostAsync(Guid postId, string? newTitle, string? newContent)
        {
            // Retrieve the post
            var post =
                await _postRepository.GetByIdAsync(postId)
                ?? throw new InvalidOperationException("Post not found");
            // Update post details
            post.UpdatePost(newTitle, newContent);
            await _postRepository.UpdateAsync(post);
        }
    }
}
