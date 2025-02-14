
# API documentation for Social Media Application

## 1. ***Overview***

```
this documentation contains information for a social media application the API enables users to create accounts, manage friendships, create posts, and interact with content.
```

## 2. Base 

	All API requests should be made to:
	https://socialmedia-api.com/


## 3. Authentication

	 the API uses JWT for authentication. After successful login, include the token in the Authorization header for all protected endpoints:
	
	 Auth token : Bearer {jwt_token} 
	 
## Endpoints
		
	POST /auth/signup
	Create a new user account
	
	Request Body:
	{
	  "username": "name",
	  "email": "name@gmail.com",
	  "password": "abc1234",
	  "fullName": "Manan Telrandhe"
	}

	
	Response (201 user Created): 
	{
	  "message": "User created successfully",
	  "userId": "12345"
	}
		

	POST /auth/login
	Authenticate user and receive JWT token.
	
	Request Body:
	
	{
	  "email": "name@gmail.com",
	  "password": "abc1234"
	}
	
	Response (200 OK):
	{
	  "token": "xyztoken1234......",
	  "userId": "12345"
	}
	
	Send Friend Request
	
	POST /friends/requests
	send a friend request to another user.

	Request Body:
	
	{
	  "toUserId": "67891"
	}
	
	Response (201 Created):
	{
	  "requestId": "req123",
	  "status": "pending"
	}	
	
	Accept/Reject Friend Request

	PUT /friends/requests/{requestId}

	Accept or reject a pending friend request.
	
	Request Body:
	
	{
	  "status": "accepted" or "rejected",
	}
	
	Response (200 OK):
	
	{
	  "message": "friend request accepted",
	  "friendId": "friend123"
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
	

	 Like Post
	
	POST /posts/{postId}/likes
	Like or unlike a post.
	
	Response (200 OK):
	
	{
	  "liked": true,
	  "likesCount": 1
	}
	
	List Posts

	GET /posts
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
	    }
	  ],
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

| userid  | username | email               | password | full-name | createdat      |
| ------- | -------- | ------------------- | -------- | --------- | -------------- |
| id uuid | 3-30     | valid email address | hased    | fullname  | auto timestamp |


post table

| userid  | username | email               | password | full-name | createdat      |
| ------- | -------- | ------------------- | -------- | --------- | -------------- |
| id uuid | 3-30     | valid email address | hased    | fullname  | auto timestamp |


like table

| userid  | username | email               | password | full-name | createdat      |
| ------- | -------- | ------------------- | -------- | --------- | -------------- |
| id uuid | 3-30     | valid email address | hased    | fullname  | auto timestamp |
