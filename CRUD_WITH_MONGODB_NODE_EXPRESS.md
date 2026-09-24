CRUD with MongoDB Using Node.js and Express
Introduction
CRUD is an acronym for Create, Read, Update, and Delete. These are the four basic operations performed when working with data in an application. CRUD operations are commonly used in backend applications to create new records, retrieve existing records, modify records, and remove records.

In this project, MongoDB is used as the database, while Node.js provides the runtime environment and Express.js is used to build the server and API routes. Together, these technologies make it possible to create a functional backend application.

What is MongoDB?
MongoDB is a NoSQL database that stores data in documents rather than traditional rows and columns. The documents are stored in a format similar to JSON, making MongoDB convenient to use with JavaScript applications.

For example, a user document may look like:

{
name: "John",
email: "john@example.com",
role: "user",
isBlocked: false
}
MongoDB allows applications to easily create, retrieve, update, and delete these documents.

What is Node.js?
Node.js is a JavaScript runtime environment that allows JavaScript to run outside the browser. It is commonly used for developing backend applications and APIs.

In this project, Node.js is responsible for running the server-side JavaScript code and communicating with MongoDB.

What is Express.js?
Express.js is a web framework for Node.js. It makes it easier to create servers, routes, APIs, and middleware.

For example, an Express route can be written as:


router.get("/users", getAllUsers);

This route allows the application to respond when a client requests the /users endpoint.

CRUD Operations
1. Create
Create involves adding new data to the database.

For example, when a new user signs up, their information is stored in MongoDB.

A typical MongoDB operation for creating a user is:

const user = await User.create({
name,
email,
password
});

The create() method adds a new document to the users collection.

In this project, the signup functionality performs the Create operation by registering new users.

2. Read
Read involves retrieving information from the database.

For example, the application can retrieve all registered users using:

const users = await User.find();

In our project, the admin can view all registered users through the users endpoint.

We also implemented a user-count feature using:

const totalUsers = await User.countDocuments();

const totalUsers = await User.countDocuments();

This allows the admin to see the total number of users registered on the application.

For Example;
{
"totalUsers": 7
}

3. Update
Update involves modifying information that already exists in the database.

In our project, an example is blocking a user who has defaulted on a loan.

The user’s isBlocked field is initially

isBlocked: false

When the administrator blocks the user, the value is changed to:

user.isBlocked = true;
await user.save();

This is an Update operation because an existing document is being modified.

The route used for this operation is:

router.patch(
"/users/:userId/block",
authMiddleware,
adminMiddleware,
blockUser
);

The PATCH method is appropriate because only part of the user’s information—the isBlocked status—is being updated.

4. Delete
Delete involves removing a document from the database.

MongoDB provides methods such as:

await User.findByIdAndDelete(userId);

This finds a user using their ID and removes the corresponding document from the database.

A typical Express route could be:

router.delete(
"/users/:userId",
authMiddleware,
adminMiddleware,
deleteUser
);

The DELETE HTTP method is used because the operation removes an existing resource.

CRUD and HTTP Methods
CRUD operations are commonly associated with HTTP methods as follows:

CRUD Operation

HTTP Method

Example

Create

POST

/users

Read

GET

/users

Update

PUT/PATCH

/users/:userId

Delete

DELETE

/users/:userId


These methods allow a frontend or API client such as Thunder Client or Postman to communicate with the backend.

Authentication and Security
Security is important when building a backend application. In this project, JSON Web Token (JWT) is used for authentication.

After a user logs in successfully, the server provides a JWT. The token is then sent with requests to protected endpoints.

For example:

Authorization: Bearer YOUR_JWT_TOKEN

The application uses authentication middleware to verify the token before allowing access to protected routes.

Administrative operations are additionally protected using admin middleware. This ensures that operations such as blocking users and viewing administrative information are restricted to administrators.

Login and signup endpoints remain accessible because users need to be able to authenticate and create accounts before accessing protected resources.

Middleware
Middleware functions are functions that run between the incoming request and the final route handler.

In this project, authentication middleware checks whether a valid JWT has been provided.

For example:

router.get(
"/users",
authMiddleware,
adminMiddleware,
getAllUsers
);



Here, the request must pass through:

authMiddleware
adminMiddleware
getAllUsers
before the user can access the endpoint.

The project also checks whether a user’s account has been blocked. If:


isBlocked === true

the request is rejected with a 403 Forbidden response.

Role of Controllers
Controllers contain the logic that performs operations on the database.

For example, our bankController.js contains functions such as:

getAccountNumber
getAllUsers
blockUser
getUserCount

The route determines which endpoint is being accessed, while the controller determines what happens when that endpoint is accessed.

This separation makes the application easier to maintain and understand.

Conclusion
CRUD is a fundamental concept in backend development because almost every application needs to create, retrieve, update, and delete data. By combining MongoDB, Node.js, and Express.js, developers can build efficient APIs that manage application data.

In this project, CRUD principles were applied to a banking and loan application. Users can be registered and retrieved, administrators can view the number of registered users, and users can be blocked by updating their account status. JWT authentication and middleware are also used to protect the application’s endpoints.

Therefore, understanding CRUD with MongoDB, Node.js, and Express provides a strong foundation for developing secure and functional backend applications.

