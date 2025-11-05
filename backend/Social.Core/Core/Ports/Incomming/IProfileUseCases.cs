namespace Social.Core.Ports.Incomming
{
    public interface IProfileUseCases
    {
        Task<Guid> CreateProfileAsync(string userName, string? bio = null, Image? pic = null);
        Task UpdateProfileAsync(Guid profileId, string? name, Image? profilePic, string? bio);
        Task AddFriendAsync(Guid profileId, Guid friendId);
    }
}
