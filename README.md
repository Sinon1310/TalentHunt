

# TalentHunt 🤝 Automated Team Formation & Mentorship Platform

**TalentHunt** is a full-stack web application developed to automate multidisciplinary team formation and faculty mentorship allocation for institutional technical competitions. It enables students to build effective teams based on skill compatibility and aligns their projects with the UN Sustainable Development Goals (SDGs).

---

## 🧩 Problem Statement  
**Automated Team Selection & Mentorship System for Technical Competitions**

The platform is designed to:

- Automate team formation based on complementary student skills and interests  
- Assign domain-specific faculty mentors to teams  
- Manage competition milestones, mentorship progress, and student participation  
- Enable skill-based teammate search and open slot applications  
- Align projects with Sustainable Development Goals (SDGs)  

---

## 🚀 Features

- Student skill-based profile and AI-driven team matching  
- Manual & automated team formation  
- Teammate search with skill/department/experience filters  
- Mentor assignment based on domain expertise  
- Milestone tracking for competition deliverables  
- Chat-based collaboration and notifications  
- Admin and faculty dashboards with analytics  
- SDG mapping of problem statements and student projects  
- Role-based authentication and access control  

---

## 🛠️ Tech Stack

- **Frontend**: React.js / Next.js  
- **Backend**: Node.js, Express.js (or Django/Spring Boot)  
- **Database**: MongoDB / MySQL  
- **Authentication**: Firebase Auth / JWT / OAuth  
- **Hosting**: Vercel / Netlify / AWS  

---

## 🧑‍💻 How to Set Up the Project Locally

### Prerequisites

Make sure you have the following installed:

- Node.js  
- MongoDB  
- Git  

### Installation Steps

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/talenthunt.git
cd talenthunt
```

2. **Install backend dependencies**:

```bash
npm install
```

3. **Set up environment variables**:  
Create a `.env` file in the root directory and add your configuration:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/talenthunt
JWT_SECRET=your_jwt_secret_here
```

4. **Start the server**:

```bash
npm start
```

5. **(Optional) Start frontend if applicable**:  
If the frontend is in a separate directory (e.g., `client/`):

```bash
cd client
npm install
npm start
```

---

## 📁 Project Structure (Example)

```bash
talenthunt/
│
├── models/           # Mongoose or Sequelize schemas
├── routes/           # Express route handlers
├── controllers/      # Route logic
├── client/           # Frontend React app
├── public/           # Static assets
├── .env              # Environment variables
├── server.js         # Entry point
└── README.md         # Documentation
```

---

## 📌 Future Enhancements

- Integration with SDG API for dynamic goal mapping  
- Real-time mentor feedback and comment threads  
- Analytics dashboard for team performance tracking  
- Leaderboard and competition result management  
- Email notifications and reminders for deadlines  

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to contribute:

1. Fork the repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Make your changes  
4. Commit and push (`git push origin feature-name`)  
5. Open a Pull Request  

---

## 📜 License

This project is licensed under the MIT License.

---

## 🎥 Demo / Presentation

- **🎞️ Presentation Link**: [Watch Here](https://drive.google.com/file/d/1yf4k0BFp8e6-n_2gLFWy-Lvqhq-AtDhd/view?usp=drivesdk)  
- **📽️ Demo Video**: [Watch Here](https://drive.google.com/file/d/1yf4k0BFp8e6-n_2gLFWy-Lvqhq-AtDhd/view?usp=drivesdk)

