namespace Social.Core.Ports.Incomming
{
    public interface ICommentQueryUseCases
    {
        Task<Comment?> GetCommentByIdAsync(Guid commentId);
        Task<IEnumerable<Comment>> GetCommentsByPostIdAsync(Guid postId);
        Task<bool?> GetUserCommentVoteAsync(Guid commentId, Guid userId);
    }
}
