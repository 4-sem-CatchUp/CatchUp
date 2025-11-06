namespace Social.Core
{
    public class Chat
    {
        public Guid ChatId { get; set; } = Guid.NewGuid();
        public List<Profile> Participants { get; private set; } = new List<Profile>();
        public List<ChatMessage> Messages { get; private set; } = new List<ChatMessage>();
        public bool Active { get; set; } = false;

        public Chat() { }

        public Chat(IEnumerable<Profile> participants)
        {
            // Initialize chat with participants
            Participants.AddRange(participants);
            Active = true;
        }

        public void AddParticipant(Profile profile)
        {
            // Avoid adding duplicate participants
            if (!Participants.Any(p => p.Id == profile.Id))
                Participants.Add(profile);
        }

        public void RemoveParticipant(Guid profileId)
        {
            // Remove participant by profile ID
            var participant = Participants.FirstOrDefault(p => p.Id == profileId);
            // If found, remove from participants list
            if (participant != null)
                Participants.Remove(participant);
        }

        public ChatMessage SendMessage(Profile sender, string content)
        {
            // Ensure sender is a participant
            if (!Participants.Any(p => p.Id == sender.Id))
                throw new InvalidOperationException("Sender is not a participant of the chat.");

            // Create and add new message to the chat
            var message = new ChatMessage(ChatId, sender, content);
            Messages.Add(message);
            return message;
        }

        public void CloseChat()
        {
            // Mark chat as inactive
            Active = false;
        }
    }
}
