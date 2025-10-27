namespace Social.Core.Ports.Incomming
{
    public interface IPostQueryUseCases
    {
        Task<Post?> GetPostByIdAsync(Guid postId);
        Task<IEnumerable<Post>> GetFeedAsync(Guid? userId = null);
    }
}
