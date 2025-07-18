export class Constants {
  public static readonly MESSAGE_EVENT = 'message';
  public static readonly ADD_EVENT = 'add';
  public static readonly KICK_EVENT = 'kick';
  public static readonly LEAVE_EVENT = 'leave';
  public static readonly ERROR_EVENT = 'error';
  public static readonly USER_CONNECT_EVENT = 'userConnected';
  public static readonly USER_DISCONNECT_EVENT = 'userDisconnected';
  public static readonly GET_ONLINE_USERS_EVENT = 'userJoinChat';

  //statuses
  public static readonly RECEIVED_MESSAGE = 'Message received';
  public static readonly USER_JOIN_CHAT = 'User joined the chat';
  public static readonly USER_LEAVE_CHAT = 'User left the chat';
  public static readonly USER_KICKED = 'has been kicked from the chat';

  public static readonly UNAUTHORIZED_USER_MESSAGE = 'Unauthorized user';
  public static readonly CONSOLE_MESSAGES_USER = 'Console';
  public static readonly USERNAME_COOKIE = 'username';
}
