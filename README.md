## CatchUp — 4th Semester Exam Project (Team 7, Datamatiker 2025)

**CatchUp** is a European-focused **social media platform** developed as our 4th-semester project.  
The goal is to build a *transparent, decentralized and GDPR-friendly* alternative to existing social media platforms — combining a clean architecture backend, a modern React/TypeScript frontend, and a gamified user experience.


## System Overview

The system consists of multiple parts working together:

- **Frontend (React + TypeScript + Vite)** — the main web client for posts, profiles, comments, and messaging  
- **Backend (C# / .NET 8)** — built around **Hexagonal Architecture (Ports & Adapters)** for modularity and scalability  
- **Game / Gamification Module (Unity)** — provides a connected hub experience and achievement system  

The architecture is intentionally modular to mirror a real-world microservice-inspired system while keeping development manageable for a student team.


## Technologies Used

### Frontend  
- React 18 + TypeScript  
- Vite  
- Tailwind CSS 
- ESLint + Prettier + Husky (pre-commit linting/testing)  
- Coderabbit (AI-assisted code review and automated unit tests)  

### Backend  
- .NET 8 / C#  
- Entity Framework Core  
- Clean / Hexagonal Architecture  
- PostgreSQL (planned)  
- xUnit for testing  

### Gamification / Unity  
- Unity 6 (C#)  
- Custom 3D assets and environment design  
- Player/NPC interaction system and achievement triggers  

## Core Architecture (Backend)

The backend is organized into multiple *cores* under the main solution:

| Core | Responsibility |
|------|----------------|
| **SocialCore** | Handles posts, comments, chat, and profiles |
| **AchievementCore** | Gamification logic, XP and badge progression |
| **UserAuthCore** | Authentication, authorization, and user management |
| **ActivityPubCore** | Federated communication between instances |
| **NotificationCore** | System-wide notifications through an event broker |

Each core defines its own **domain layer**, **ports**, and **adapters**, making them individually testable and extensible.



## Frontend Structure
```
/src
├── app/ # Global layout (AppLayout, routes, providers)
├── assets/ # Images, icons, static resources
├── components/ # Shared UI components (layout, sidebar, badges, etc.)
├── features/ # Domain-specific areas (feed, post, profile, etc.)
├── hooks/ # Custom React hooks
├── lib/ # Helper functions, constants
├── services/ # API integrations (currently mock via MSW)
├── styles/ # Tailwind + global CSS
└── tests/ # Unit and integration tests
```

## Team Members

| Name | Role / Responsibilities |
|------|--------------------------|
| **Bo** | Frontend (React + TypeScript), Automation & Scripting (Prettier, Linting, Coderabbit, Unit Tests) |
| **Burak** | UI/UX design (Tailwind), consent management, API integration |
| **Peter** | Backend architecture (Hexagonal Architecture, EF Core, CI/CD pipelines) |
| **Kenneth** | Gamification design, Unity development, achievement logic & asset integration |


## Project Repositoy

| Part | Repository |
|------|-------------|
| **Frontend** | [https://github.com/4-sem-CatchUp/CatchUp/frontend](https://github.com/4-sem-CatchUp/frontend) |
| **Backend** | [https://github.com/4-sem-CatchUp/CatchUp/backend](https://github.com/4-sem-CatchUp/CatchUp/backend) |
| **Game / Unity Module** | Private repo, internal development (soon to be added here) |


## Running the Frontend Locally

```bash
# Clone the repository
git clone https://github.com/4-sem-CatchUp/CatchUp.git
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

The app will start on http://localhost:5173/
```

## Testing & Automation

Prettier + ESLint ensure code consistency

Husky triggers lint/test on every commit

Coderabbit performs automatic code reviews and test validations on PR merge

Vitest / Jest used for unit tests

Example:

```bash
npm run test
```

## Vision

“A social media platform built around community, privacy, and transparency — not ads.”

CatchUp is meant as a proof-of-concept for an ethical, European alternative to commercial social networks.
It experiments with decentralization, gamified engagement, and responsible data ownership while remaining fully open-source.

```
   ██████╗ █████╗ ████████╗ ██████╗██╗  ██╗██╗   ██╗██████╗ 
  ██╔════╝██╔══██╗╚══██╔══╝██╔════╝██║  ██║██║   ██║██╔══██╗
  ██║     ███████║   ██║   ██║     ███████║██║   ██║██████╔╝
  ██║     ██╔══██║   ██║   ██║     ██╔══██║██║   ██║██╔═══╝ 
  ╚██████╗██║  ██║   ██║   ╚██████╗██║  ██║╚██████╔╝██║     
   ╚═════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     
```