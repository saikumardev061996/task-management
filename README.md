Task Management System:

Setup and Installation

Prerequisites

Ensure you have the following installed:

Node.js
PostgreSQL 

**Installation Steps**

Clone the repository:

git clone https://github.com/saikumardev061996/task-management.git

Install dependencies:

npm install

Set up environment variables:

Copy  to .env and update values.

Start the server:

## API Endpoints
### Create a Task
**POST /tasks**
**Payload:**
{
  "title": "Task Title",
  "description": "Task Description",
  "due_date": "YYYY-MM-DD"
}
\`\`\`

### Retrieve Tasks
**GET /tasks**

### Update a Task
**PUT /tasks/{id}**

### Mark Task as Completed
**PUT /tasks/{id}/complete**

### Delete a Task
**DELETE /tasks/{id}**

### Search Tasks
**GET /tasks/search?search=your_query**
