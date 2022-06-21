import { HttpException } from "@core/exceptions";
import { UserSchema } from "@modules/users";
import SendMessageDto from "./dtos/send_message.dto";
import { IConversation, IMessage } from "./conversations.interface";
import { ConversationSchema } from "@modules/conversations";

export default class ConversationService {
  public async sendMessage(
    userId: string,
    dto: SendMessageDto
  ): Promise<IConversation> {
    const user = await UserSchema.findById(userId).select("-password").exec();
    if (!user) throw new HttpException(400, "User id is not exist");

    const toUser = await UserSchema.findById(dto.to).select("-password").exec();
    if (!toUser) throw new HttpException(400, "To user id is not exist");

    if (!dto.conversationId) {
      const newConversation = new ConversationSchema({
        user1: userId,
        user2: dto.to,
        message: [
          {
            from: userId,
            to: dto.to,
            text: dto.text,
          },
        ],
      });
      await newConversation.save();
      return newConversation;
    } else {
      const conversation = await ConversationSchema.findById(
        dto.conversationId
      ).exec();
      if (!conversation)
        throw new HttpException(400, "Conversation id is not exist");
      conversation.messages.unshift({
        to: dto.to,
        text: dto.text,
        from: userId,
      } as IMessage);
      await conversation.save();
      return conversation;
    }
  }
}
