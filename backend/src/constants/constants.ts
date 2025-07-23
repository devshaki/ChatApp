export class Constants {
  public static readonly MESSAGE_EVENT: string = 'message';
  public static readonly ADD_EVENT: string = 'add';
  public static readonly KICK_EVENT: string = 'kick';
  public static readonly LEAVE_EVENT: string = 'leave';
  public static readonly ERROR_EVENT: string = 'error';
  public static readonly USER_CONNECT_EVENT: string = 'userConnected';
  public static readonly USER_DISCONNECT_EVENT: string = 'userDisconnected';
  public static readonly GET_ONLINE_USERS_EVENT: string = 'userJoinChat';

  //statuses
  public static readonly RECEIVED_MESSAGE: string = 'Message received';
  public static readonly USER_JOIN_CHAT: string = 'User joined the chat';
  public static readonly USER_LEAVE_CHAT: string = 'User left the chat';
  public static readonly USER_KICKED: string = 'has been kicked from the chat';

  public static readonly UNAUTHORIZED_USER_MESSAGE: string =
    'Unauthorized user';
  public static readonly CONSOLE_MESSAGES_USER: string = 'Console';
  public static readonly USERNAME_COOKIE: string = 'username';
}
