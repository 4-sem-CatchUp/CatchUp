using Social.Core.Ports.Incomming;
using Social.Core.Ports.Outgoing;

namespace Social.Core.Application
{
    public class ChatService : IChatUseCases
    {
        private readonly IChatRepository _chatRepository;
        private readonly IChatNotifier _chatNotifier;

        public ChatService(IChatRepository chatRepository, IChatNotifier chatNotifier)
        {
            _chatRepository = chatRepository;
            _chatNotifier = chatNotifier;
        }

        public async Task<Chat> CreateChat(Profile creator, List<Profile> participants)
        {
            // Create new chat with participants
            var chat = new Chat(participants);

            // Add creator as participant
            chat.AddParticipant(creator);

            // Save chat to repository
            await _chatRepository.CreateChat(chat);

            // Notify participants about new chat
            await _chatNotifier.NotifyChatCreated(chat);

            return chat;
        }

        public async Task DeleteMessage(Guid chatId, Guid messageId, Profile deleter)
        {
            // Retrieve message from repository
            var message = await _chatRepository.GetMessage(chatId, messageId);

            // Check if message exists and if deleter is the sender
            if (message == null)
                throw new InvalidOperationException("Message not found");
            if (message.Sender.Id != deleter.Id)
                throw new InvalidOperationException("Only the sender can delete the message");

            // Delete message
            await _chatRepository.DeleteMessage(chatId, messageId);
        }

        public async Task<ChatMessage> EditMessage(
            Guid chatId,
            Guid messageId,
            Profile editor,
            string newContent
        )
        {
            // Retrieve message from repository
            var message = await _chatRepository.GetMessage(chatId, messageId);

            // Check if message exists and if editor is the sender
            if (message == null)
                throw new InvalidOperationException("Message not found");

            if (message.Sender.Id != editor.Id)
                throw new InvalidOperationException("Only the sender can edit the message");

            // Edit message content
            message.EditContent(newContent);

            // Update message in repository
            await _chatRepository.UpdateMessage(chatId, message);

            return message;
        }

        public async Task<List<ChatMessage>> GetMessages(
            Guid chatId,
            Profile requester,
            int count,
            int offset
        )
        {
            // Retrieve chat from repository
            var chat = await _chatRepository.GetChat(chatId);

            // Check if chat exists and if requester is a participant
            if (chat == null)
                throw new InvalidOperationException("Chat not found");

            if (!chat.Participants.Any(p => p.Id == requester.Id))
                throw new InvalidOperationException("Requester is not a participant of the chat");

            // Retrieve messages from repository
            var messages = await _chatRepository.GetMessages(chatId, count, offset);

            return messages;
        }

        public async Task<ChatMessage> SendImage(
            Guid chatId,
            Guid messageId,
            Profile sender,
            string? fileName,
            string? contentType,
            byte[]? data
        )
        {
            // Retrieve chat from repository
            var chat = await _chatRepository.GetChat(chatId);

            // Check if chat exists
            if (chat == null)
                throw new InvalidOperationException("Chat not found");

            // Create new message with image
            var message = chat.SendMessage(sender, "");
            // Add image to message
            if (data != null)
                message.AddImage(fileName, contentType, data);

            // Save message to repository
            await _chatRepository.AddMessage(chatId, message);

            // Notify participants about new message
            await _chatNotifier.NotifyMessageSent(message);

            return message;
        }

        public async Task<ChatMessage> SendMessage(Guid chatId, Profile sender, string content)
        {
            // Retrieve chat from repository
            var chat = await _chatRepository.GetChat(chatId);

            // Check if chat exists
            if (chat == null)
                throw new InvalidOperationException("Chat not found");

            // Create new message
            var message = chat.SendMessage(sender, content);

            // Save message to repository
            await _chatRepository.AddMessage(chatId, message);

            // Notify participants about new message
            await _chatNotifier.NotifyMessageSent(message);
            return message;
        }
    }
}
