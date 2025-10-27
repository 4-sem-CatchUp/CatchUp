using Social.Core;

namespace Social.Core.Ports.Outgoing
{
    public interface IPostRepository
    {
        Task<Post?> GetByIdAsync(Guid postId);
        Task<IEnumerable<Post>> GetAllAsync();
        Task<IEnumerable<Post>> GetFeedByAuthorsAsync(IEnumerable<Guid> authorIds);
        Task AddAsync(Post post);
        Task UpdateAsync(Post post);
        Task DeleteAsync(Guid postId);
    }
}
