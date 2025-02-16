
## API documentation for Social Media Application


## 1. ***Overview***

```
this documentation contains information for a social media application the API enables users to create accounts, manage friendships, create posts, and interact with content.
```

## 2. Base 

	All API requests should be made to:
	https://socialmedia-api.com/


## 3. Authentication

```
the API uses JWT for authentication. After successful login, include the token in the Authorization header for all protected endpoints:
		
	 Auth token : Bearer {jwt_token} 
```


## Endpoints


### API Tree :- 
	
	auth/
		signup (post) Create a new user account.
		login (post) Authenticate user and receive JWT token.
	JWT Token
	
	friends/
		requests (post) send a friend request to another user.
		requests/{requestId} (put) Accept or reject a pending friend request.
		
	posts/
		POST /posts Create a new post.
		GET /posts/page=1&limit=10 list all post with pagination.
		POST {postId}/likes Like/unlike a post 
		
		
		
POST /auth/signup
Create a new user account

Request Body :

{
  "username": "name",
  "email": "name@gmail.com",
  "password": "abc1234",
  "fullName": "Manan Telrandhe"
}

Response :

status 201 user Created:

{
  "message": "User created successfully",
  "userId": "12345"
}

status 400 Bad Request 
{ 
"message": "User already present with same email"
}

status 400 Bad Request
{ 
"message": "Email format should have @"
} 
 
status 400 Bad Request 
{ 
"message": "Password must be greater then 8 and less then 20"
}
 
status 400 Bad Request 
{ 
"message": "Password required"
} 
 
status 500 Internal Server Error 
{ 
"message": "Internal Server Error Try After Some Time" 
}
 




POST /auth/login
Authenticate user and receive JWT token.

Request Body:

{
  "email": "name@gmail.com",
  "password": "abc1234"
}

Response :

status 200 OK 
{
  "token": "xyztoken1234......",
  "userId": "12345"
}

status 404 Not Found
{
"message": "User Not Present"
}

status 400 Bad Request
{
"message": "User credentials don't match" 
}

status 500 Internal Server Error
{
"message": "Internal Server Error Try After Some Time"
}



Send Friend Request

POST /friends/requests
send a friend request to another user.

Request Body:

{
  "toUserId": "67891"
}

Response :

status 201 Created
{
  "requestId": "req123",
  "status": "pending"
}	

status 400 Bad Request 
{
"message": "Friend request already sent"
}

status 404 Not Found
{
"message": "User not found"
}


Accept/Reject Friend Request

PUT /friends/requests/{requestId}

Accept or reject a pending friend request.

Request Body:

{
  "status": "accepted" or "rejected",
}

Response 

status 200 OK 

{
  "message": "friend request accepted",
  "friendId": "friend123"
}

status 400 Bad Request
{
  "message": "Invalid action specified"
}

status 404 Not Found
{
  "message": "Friend request not found"
}

status 500 Internal Server Error
{
  "message": "Internal Server Error Try After Some Time"
}


Create Post

POST /posts
Create a new post.

Request Body:

{
  "content": "post content"
}

Response (201 Created):

{
  "postId": "post123",
  "content": "post content",
}

status 400 Bad Request for validation check
{
  "message": "Post content exceeds 256 characters"
}

status 400 Bad Request for valication check
{
  "message": "Post content cannot be empty"
}

status 500 Internal Server Error
{
  "message": "Internal Server Error Try After Some Time"
}

 Like Post

POST /posts/{postId}/likes
Like or unlike a post.

Response 

status 200 OK :

{
  "liked": true,
  "likesCount": 1,
  "message": "Post liked successfully"
}

status 200 OK
{
  "message": "Post removed liked"
}

status 404 Not Found
{
  "message": "Post not found"
}

status 500 Internal Server Error
{
  "message": "Internal Server Error Try After Some Time"
}



List Posts

GET /posts?page=1&limit=10
Retrieve a list of posts with pagination.

Response (200 OK):

{
  "posts": [
	{
	  "postId": "post1234",
	  "content": "post content",
	  "author": {
		"userId": "12345",
		"username": "Manan Telrandhe"
	  },
	  "likesCount": 1,
	},
  ],
  "pagination":{
  "page":1,
  "limit":10,
  "totalpages":10
  }
}


	
2. Validation Rules

- Username: 3-30 characters, alphanumeric and underscores only
- Email: Valid email format required
- Password: Minimum 8 characters, must include uppercase, lowercase, number , special character
- Post content: Maximum 256 characters



3. Security Measures

	All endpoints except signup and login require JWT authentication
	
	- Passwords are hashed using bcrypt before storage
	- Rate limiting implemented on all endpoints
	- HTTPS required for all API calls
	- Two-factor authentication (2FA) support


 
4. Database Table :- 


user table

| userid  | username | email               | password | full-name | createdat      |
| ------- | -------- | ------------------- | -------- | --------- | -------------- |
| id uuid | 3-30     | valid email address | hased    | fullname  | auto timestamp |


friend request

| requestid | from userid | to userid | status                         | createdat      |
| --------- | ----------- | --------- | ------------------------------ | -------------- |
| id uuid   | sender      | receiver  | pending (accepted or rejected) | auto timestamp |



post table

| post id | userid       | content      | createdat      |
| ------- | ------------ | ------------ | -------------- |
| id uuid | creator user | max 256 char | auto timestamp |


like table

| likeid  | postid | userid              | createdat      |
| ------- | ------ | ------------------- | -------------- |
| id uuid | 3-30   | valid email address | auto timestamp |




5. Relationships


	- User <-> Friend Requests  => one-to-many
	- Friend Requests <-> User => many-to-one
	- Users <-> Posts  => one-to-many
	- Posts <-> Users => many-to-one
	- Users <-> Likes <-> Posts => many-to-many
	- Users <-> Users via friendrequest => many-to-many