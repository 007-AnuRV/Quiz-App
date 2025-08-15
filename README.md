# Quiz App 

## Brief Overview
I built a Quiz App where users can take a 15-question MCQ quiz with a 30-minute timer. The app is designed to be interactive, user-friendly, and provide a clear overview of the quiz progress.

## Tech Stack
- ReactJS
- TailwindCSS

## Approach to the Problem:

- The app tracks user progress, showing which questions are attempted, visited, or not visited.
- Users can navigate freely between questions using Next and Previous buttons.
- As users navigate between questions, the Overview Panel updates in real-time, using color coding to indicate question status for better understanding.
- Users can clear their response for any question if they want to change their answer.
- Users can navigate freely between questions and submit the quiz at any time.
- A background timer ensures the quiz is time-bound for testing purposes.
- After submission, a detailed report is generated so users can compare their answers with the correct ones and see their score.

## Components Built

### 1. StartPage 
- Allows users to enter their email to begin the quiz.

  <img width="1106" height="699" alt="image" src="https://github.com/user-attachments/assets/33028a97-e6ac-4879-b031-7a93f118813d" />

### 2. QuizPage
- Displays questions with multiple-choice options.
- Provides Previous and Next buttons for navigation.
- Includes a Clear Response functionality to reset selected answers.
- Shows a timer running in the background
  - The timer updates in real-time and changes color based on the remaining time:
    - **Green:** More than 5 minutes left
    - **Orange:** 5 minutes or less remaining
    - **Red:** Critical time running out
- Includes a Quiz Overview Panel to track attempted, visited, unvisited, and current questions 

  <img width="1619" height="755" alt="image" src="https://github.com/user-attachments/assets/cab06d07-823a-4851-a570-5071fec764da" /><br><br>
  <img width="1551" height="760" alt="image" src="https://github.com/user-attachments/assets/3ad4356d-496c-4383-8014-da28e56373ed" />
  
### 3. OverviewPanel
- Provides a clear snapshot of the quiz progress.
- Shows the status of each question: Attempted, Visited, unvisited, and current by using color coding:
  - **Green:** Attempted
  - **Yellow:** Current
  - **Purple:** Visited
  - **Gray:** Unvisited
- Helps users navigate quickly between questions.
- Updates dynamically as the user answers questions.

  <img width="412" height="410" alt="image" src="https://github.com/user-attachments/assets/91bd9f0f-8a36-4f13-9571-a284e177a123" />


### 4. ReportPage
- Displays the score out of 15 questions.
- Shows attempted vs. unattempted questions.
- Allows users to compare their answers with the correct ones.
- Includes a Restart button to reset the quiz and go back to the Start Page.

  <img width="1193" height="873" alt="image" src="https://github.com/user-attachments/assets/d0ebbdac-84d5-4897-af93-b4a9b51f07be" /><br><br>
  <img width="1057" height="527" alt="image" src="https://github.com/user-attachments/assets/244444a8-4653-48f4-9d5b-50a144afa5b9" /><br><br>
  <img width="1143" height="727" alt="image" src="https://github.com/user-attachments/assets/1048435e-0b77-4211-9f74-02add9ce897c" />




## Setup & Installation

1. Install React + Vite : 
npm create vite@latest quiz-app
2. Set up Tailwind CSS :
Follow the official site: https://tailwindcss.com/docs/installation/using-vite
3. Install Framer Motion : 
npm install framer-motion
4. Start the development server :
npm run dev

## Challenges Faced & Overcame

### 1. Designing a User-Friendly UI:
Creating an interface that provides a good user experience was challenging. 
To overcome this, I explored many websites to understand modern UI practices, applied color theory, and used Tailwind CSS to design a clean, intuitive, and visually appealing interface.

### 2. Dynamic Quiz Overview Panel:
Building a panel that updates in real-time to show the status of attempted, visited, and not visited questions was tricky. 
I solved this by syncing the overview state with user actions, ensuring the panel reflects the latest progress instantly and helps users navigate efficiently.

### 3. Timer Management:
Implementing a background timer that continues running even when users navigate between questions required careful state management. Using React Hooks, I ensured the timer is accurate, persistent, and does not reset unexpectedly when users move across questions.

## Additional feature

### Clear Response:
- Users can reset their selected answer for any question at any time.
- Updates the Quiz Overview Panel and question status dynamically after clearing the response.

### Responsive:
- The app is fully responsive, providing a seamless experience on both desktop and mobile devices.
- All pages and components adapt smoothly to different screen sizes for better usability.

  <img width="377" height="842" alt="image" src="https://github.com/user-attachments/assets/87fdc81c-2a44-4ee3-997a-fe93c3b29d96" /><br><br>
  <img width="382" height="837" alt="image" src="https://github.com/user-attachments/assets/076dcb4d-0f39-44af-b204-c63284a72737" /><br><br>
  <img width="370" height="827" alt="image" src="https://github.com/user-attachments/assets/33a68976-92de-48db-98a8-6d09e10c145d" />


