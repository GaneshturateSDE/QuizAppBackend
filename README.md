# QuizApp Backend

This is the backend service for a Quiz Application built using **Node.js** and **Express.js**.  
It manages **questions**, **quizzes**, and allows users to **submit answers** to quizzes and calculate their scores.  
The project uses **MongoDB** for storage and **Jest** for unit testing.  

---

## 📌 Features
- Manage **Questions** (CRUD operations)  
- Manage **Quizzes** (CRUD operations, linked with questions)  
- Submit quiz responses and get scores  
- Validation to ensure answers belong to the given options  
- Options stored with IDs for mapping answers  

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/GaneshturateSDE/QuizAppBackend.git
cd QuizAppBackend

## install dependencies
npm install


## environment variables
DATABASE_URL=MONGODB_CONNECTION_URL
PORT=5000


## Run Server

npm start
```


# 📡 API Endpoints
## Questions API → /api/questions
➤ Add Question

POST /api/questions/

Request Body:
```bash
{
  "title": "What is Java?",
  "options": [
    "Object oriented progeamming",
    "semi Object progeamming",
    "Machine language",
    "low language"
  ],
  "answer": "semi Object progeamming",
  "category": "Java"
} 
```

#### ➤ Get All Questions
```
GET /api/questions/
```
#### ➤ Get Question by ID
```
GET /api/questions/:id
```
#### ➤ Update Question
```
PUT /api/questions/:id
(Same body schema as add question)
```
#### ➤ Delete Question
```
DELETE /api/questions/:id
```


## Quiz API → /api/quizs
➤ Add Quiz

POST /api/quizs/
Request Body:
 ```bash
{
  "title": "Python Developer",
  "questions": [
    "68d5b679cb7cc743066cd60c",
    "68d5bc6db45f90f9266dc3d8",
    "68d5bc9ab45f90f9266dc3e5"
  ]
}
```

 #### ➤ Get All Quizzes
```
GET /api/quizs/
```

#### ➤ Get Quiz by ID
```
GET /api/quizs/:id
```
#### ➤ Update Quiz
``` 
PUT /api/quizs/:id
(Same schema as add quiz)
```
#### ➤ Delete Quiz
```
DELETE /api/quizs/:id
```
## Submit Quiz API → /api/quizs/submit/:id
➤ Submit Answers for a Quiz

POST /api/quizs/submit/:id
### Request Body:
```bash
{
  "answers": [
    {
      "qid": "68d5b679cb7cc743066cd60c",
      "aid": "68d5bad9ad68c4c64bb26933"
    },
    {
      "qid": "68d5bc6db45f90f9266dc3d8",
      "aid": "68d5bc6db45f90f9266dc3da"
    },
    {
      "qid": "68d5bc9ab45f90f9266dc3e5",
      "aid": "68d5bc9ab45f90f9266dc3e7"
    }
  ]
}
 ```

### response Body
```bash
{
    score,
    total
}
```




# 📝 Assumptions & Design Choices

### Options are stored with unique IDs so answers can map directly.

### The answer provided during question creation must match one of the options.

### Submissions compare the submitted answer ID (aid) with the stored correct answer’s ID.

### APIs are RESTful and kept simple for easy frontend integration.

### MongoDB instance is assumed to be running locally or via Docker.