import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { VerifyToken } from 'src/lib/verifyToken';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})


export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly verifyToken: VerifyToken) {}

  @WebSocketServer()
  server: Server;


  handleConnection(client: Socket) {
    const authHeader =
      client.handshake.headers?.authorization ||
      client.handshake.auth?.token;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      client.disconnect();
      return;
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const user =  this.verifyToken.verify(token);
      client.data.user = user;
      console.log('✅ User connected:',client.data.user);
    } catch {
      client.disconnect();
    }
  }

  // DISCONNECTION

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    if (user) {
      console.log('❌ User disconnected:', user.id);
    }
  }

  // SEND MESSAGE

  @SubscribeMessage('chat.send')
  handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      roomId: string;
      content: string;
    },
  ) {
    const user = client.data.user;
    if (!user) return;

    const message = {
      roomId: payload.roomId,
      content: payload.content,
      senderId: user.id,
      createdAt: new Date(),
    };

    this.server.to(payload.roomId).emit('chat.message', message);

    return message;
  }

  // JOIN ROOM

  @SubscribeMessage('chat.join')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    client.join(roomId);
    client.emit('chat.joined', roomId);
  }

  // LEAVE ROOM

  @SubscribeMessage('chat.leave')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    client.leave(roomId);
    client.emit('chat.left', roomId);
  }
}
