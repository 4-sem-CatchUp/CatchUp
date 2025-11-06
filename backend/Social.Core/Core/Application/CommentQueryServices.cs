using Social.Core.Ports.Incomming;
using Social.Core.Ports.Outgoing;

namespace Social.Core.Application
{
    public class CommentQueryServices : ICommentQueryUseCases
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IVoteRepository _voteRepository;

        public CommentQueryServices(
            ICommentRepository commentRepository,
            IVoteRepository voteRepository
        )
        {
            _commentRepository = commentRepository;
            _voteRepository = voteRepository;
        }

        public async Task<Comment?> GetCommentByIdAsync(Guid commentId)
        {
            return await _commentRepository.GetByIdAsync(commentId);
        }

        public async Task<IEnumerable<Comment>> GetCommentsByPostIdAsync(Guid postId)
        {
            return await _commentRepository.GetCommentsByIdAsync(postId);
        }

        public async Task<bool?> GetUserCommentVoteAsync(Guid commentId, Guid userId)
        {
            var vote = await _voteRepository.GetUserVoteAsync(
                commentId,
                VoteTargetType.Comment,
                userId
            );
            return vote?.Upvote;
        }
    }
}
