# ChatApp

A real-time chat application built with Angular frontend and NestJS backend, featuring group messaging, direct messages, and online user tracking.

## 🚀 Features

- **Real-time Messaging**: Instant messaging using Socket.IO
- **Group Chats**: Create and manage group conversations
- **Direct Messages**: Private one-on-one messaging
- **Online Status**: See who's currently online
- **User Management**: Add/remove friends and group members
- **Authentication**: Cookie-based user authentication

## 🛠️ Tech Stack

### Frontend

- **Angular 16+** - Main framework
- **Angular Material** - UI components
- **Socket.IO Client** - Real-time communication
- **RxJS** - Reactive programming
- **TypeScript** - Type safety

### Backend

- **NestJS** - Node.js framework
- **Socket.IO** - WebSocket implementation
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **TypeScript** - Type safety

## 📁 Project Structure

```
ChatApp/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── chat/           # Chat functionality
│   │   ├── database/       # Database service
│   │   ├── friends/        # Friends management
│   │   ├── schemas/        # MongoDB schemas
│   │   ├── dto/           # Data transfer objects
│   │   └── shared/        # Shared modules
│   └── package.json
├── clientside/             # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/      # Authentication
│   │   │   ├── chatting-page/ # Main chat interface
│   │   │   ├── login-page/    # Login interface
│   │   │   ├── signup-page/   # Registration
│   │   │   └── services/      # Shared services
│   │   └── assets/
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ChatApp
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../clientside
   npm install
   ```

4. **Setup MongoDB**
   - Ensure MongoDB is running on `mongodb://localhost/chatapp`
   - Or update the connection string in `backend/src/app.module.ts`

### Running the Application

1. **Start the Backend**

   ```bash
   cd backend
   npm run start:dev
   ```

   Backend runs on `http://localhost:3000`

2. **Start the Frontend**

   ```bash
   cd clientside
   ng serve
   ```

   Frontend runs on `http://localhost:4200`

3. **Access the Application**
   - Open your browser to `http://localhost:4200`
   - Create an account or login
   - Start chatting!

## 🔧 Configuration

### Backend Configuration

- **MongoDB URL**: Update in `backend/src/app.module.ts`
- **Port**: Default 3000, change in `backend/src/main.ts`
- **CORS**: Configured for `http://localhost:4200`

### Frontend Configuration

- **API URL**: Update in `clientside/src/app/api.service.ts`
- **Socket URL**: Update in `clientside/src/app/socket-io.service.ts`

## 📱 Usage

### Authentication

1. **Sign Up**: Create a new account with username and password
2. **Login**: Access your account using credentials

### Messaging

1. **Groups**:

   - Create new groups from the sidebar
   - Add/remove members
   - Send messages in real-time

2. **Direct Messages**:

   - Add friends using the "Add Contact" feature
   - Start private conversations
   - See online status

3. **Online Users**:
   - Green indicators show online users
   - Real-time updates when users connect/disconnect

## 🔌 API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration

### Chat

- `GET /chat/groups` - Get user's groups
- `GET /chat/contacts` - Get user's contacts
- `POST /chat/group` - Create new group
- `GET /chat/:groupId/messages` - Get messages
- `GET /chat/:groupId/members` - Get group members

### Socket Events

- `message` - Send/receive messages
- `add` - Add user to group
- `kick` - Remove user from group
- `userConnected` - User comes online
- `userDisconnected` - User goes offline

## 🐛 Known Issues

1. **Online Users**: Initial load timing issue (see Issue #1)
2. **Database Service**: Incomplete `getUsernames()` method
3. **Module Dependencies**: Some circular dependency warnings

## 🚧 Development Status

This project is currently in **development phase**. Features are functional but may need refinement for production use.

### TODO

- [ ] Fix online users initial load
- [ ] Implement proper error handling
- [ ] Add message persistence
- [ ] Improve UI/UX design
- [ ] Add unit tests
- [ ] Add proper logging
- [ ] Implement message encryption
- [ ] Add file sharing capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors

- **Guy** - Initial work

## 🙏 Acknowledgments

- Angular team for the excellent framework
- NestJS team for the backend framework
- Socket.IO team for real-time communication
- MongoDB team for the database solution

## 📞 Support

For support, email [your-email] or create an issue in the repository.

---

**Note**: This is a learning project and may not be suitable for production use without additional security and performance optimizations.
