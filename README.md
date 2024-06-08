## Blog API Documentation

## Introduction

Welcome to the Blog API! This API allows users to sign up, manage their accounts, and create, edit, and publish blog posts. The API supports two states for blog posts: drafts and published. Draft posts are private and can only be viewed by their creators, while published posts are public and can be viewed by anyone.

### Base URL

http://localhost:7000

### Authentication

All routes, except for user registration, login, published blogs routes and the base route, require authentication via a token.

### Endpoints

#### User Routes

###### Register a New User

- Endpoint: **/api/user/auth**
- Method: POST
- Description: Register a new user.
- Request Body:
  {
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string"
  }
- Response:
  {
  "first_name": "xxx",
  "last_name": "xxx",
  "email": "xxx"
  }

###### Login

- Endpoint: **/api/user**
- Method: POST
- Description: Login a user and retrieve a token.
- Request Body:
  {
  "email": "string",
  "password": "string"
  }
- Response:
  {
  "first_name": "xxx",
  "last_name": "xxx",
  "email": "xxx",
  {
  "token": "jwt_token"
  }
  }

###### Logout

- Endpoint: **/api/user/logout**
- Method: POST
- Description: Logout a user and delete the user's token.
- Request Body:
  {

}

- Response:
  {
  "message": "User logged out"
  }

###### Get User Profile

- Endpoint: **/api/user/profile**
- Method: GET
- Description: Retrieve the logged-in user's profile.
- Response:
  {
  "id": "user_id",
  "username": "string",
  "email": "string"
  }
  {
  "user": {
  "\_id": "xxx",
  "first_name": "xxx",
  "last_name": "xxx",
  "email": "xxx"
  }
  }

###### Update User Profile

- Endpoint: **/api/user/profile**
- Method: PUT
- Description: Update the logged-in user's profile.
- Request Body:
  {
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string"
  }
- Response:
  {
  "\_id": "xxx",
  "first_name": "xxx",
  "last_name": "xxx",
  "email": "xxx"
  }

#### Blog Routes

###### Get All Blogs

- Endpoint: **/api/blog/all**
- Method: GET
- Description: Retrieve all blogs created by the authenticated user.
- Response:

[
{
"_id": "blog_id",
"title": "string",
"state": "string",
"read_count": "integer"
}
]

###### Get All Blogs by State

- Endpoint: **/api/blog/all/{state}**
- Method: GET
- Description: Retrieve all blogs created by the authenticated user by State: **draft/published**.
- Response:

[
{
"_id": "blog_id",
"title": "string",
"state": "string",
"read_count": "integer"
}
]

###### Get a Specific Blog Post

- Endpoint: **/api/blog/item/{id}**
- Method: GET
- Description: Retrieve a single blog created by the authenticated user by id.
- Response:
  {
  "\_id": "blog_id",
  "title": "string",
  "description": "string",
  "author": "string",
  "state": "string",
  "read_count": "integer",
  "reading_time": "string",
  "tags": "string",
  "body": "string",
  "userID": "user_id",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "\_\_v": 0
  }

###### Get All Published Blogs

- Endpoint: **/api/blog/published/items**
- Method: GET
- Description: Retrieve all published blogs.
- Response:

[
{
"_id": "blog_id",
"title": "string",
"author": "string",
"read_count": "integer",
"tags": "string",
}
]

###### Get a Specific Published Blog Post

- Endpoint: **/api/blog/published/item/{id}**
- Method: GET
- Description: Retrieve a specific published blog post.
- Response:
  {
  "\_id": "blog_id",
  "title": "string",
  "description": "string",
  "author": "string",
  "state": "string",
  "read_count": "integer",
  "reading_time": "string",
  "tags": "string",
  "body": "string",
  "userID": "user_id",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "\_\_v": 0
  }

###### Create a New Blog Post

- Endpoint: **/api/blog**
- Method: POST
- Description: Create a new blog post (draft). NB: State is set to "draft" by default but can be set to "published" if so desired.
- Request Body:
  {
  "title": "string",
  "description": "string",
  "tags": "string",
  "body": "string"
  }
- Response:
  {
  "\_id": "blog_id",
  "title": "string",
  "description": "string",
  "author": "string",
  "state": "string",
  "read_count": "integer",
  "reading_time": "string",
  "tags": "string",
  "body": "string",
  "userID": "user_id",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "\_\_v": 0
  }

###### Update a Blog Post

- Endpoint: **/api/blog/{id}**
- Method: PUT
- Description: Update a blog post. Only the author can update their posts.
- Request Body:
  {
  "title": "string",
  "description": "string",
  "state": "string",
  "tags": "string",
  "body": "string"
  }
- Response:
  {
  "\_id": "blog_id",
  "title": "string",
  "description": "string",
  "author": "string",
  "state": "string",
  "read_count": "integer",
  "reading_time": "string",
  "tags": "string",
  "body": "string",
  "userID": "user_id",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "\_\_v": 0
  }

###### Delete a Blog Post

- Endpoint: **/api/blog/{id}**
- Method: DELETE
- Description: Delete a blog post. Only the author can delete their posts.
- Response:
  {
  "\_id": "blog_id",
  "title": "string",
  "description": "string",
  "author": "string",
  "state": "string",
  "read_count": "integer",
  "reading_time": "string",
  "tags": "string",
  "body": "string",
  "userID": "user_id",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "\_\_v": 0
  }
