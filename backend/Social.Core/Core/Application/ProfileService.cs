using Social.Core;
using Social.Core.Ports.Incomming;
using Social.Core.Ports.Outgoing;

namespace Social.Core.Application
{
    public class ProfileService : IProfileUseCases
    {
        private readonly IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public async Task<Guid> CreateProfileAsync(string userName)
        {
            // Create new profile
            var profile = Profile.CreateNewProfile(userName);
            // Save profile to repository
            await _profileRepository.AddProfileAsync(profile);
            return profile.Id;
        }

        public async Task UpdateProfileAsync(
            Guid profileId,
            string? name,
            Image? profilePic,
            string? bio
        )
        {
            // Retrieve the profile
            var profile =
                await _profileRepository.GetProfileByIdAsync(profileId)
                ?? throw new InvalidOperationException("Profile not found");
            // Update profile details
            profile.UpdateProfile(name, bio, profilePic);
            await _profileRepository.UpdateProfileAsync(profile);
        }

        public async Task AddFriendAsync(Guid profileId, Guid friendId)
        {
            // Prevent adding oneself as a friend
            if (profileId == friendId)
                throw new InvalidOperationException("You cannot add yourself as a friend.");

            // Retrieve both profiles
            var profile =
                await _profileRepository.GetProfileByIdAsync(profileId)
                ?? throw new KeyNotFoundException("Profile not found");

            var friend =
                await _profileRepository.GetProfileByIdAsync(friendId)
                ?? throw new KeyNotFoundException("Friend not found");

            // Add the friend relationship if not already friends
            profile.AddFriend(friendId);

            // Update both profiles in the repository
            await _profileRepository.UpdateProfileAsync(profile);
        }
    }
}