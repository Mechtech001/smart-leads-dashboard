# Smart Leads API Documentation

## Authentication Routes

### Register a new user
- **Method:** `POST`
- **URL:** `/api/auth/register`
- **Description:** Create a new user account.
- **Auth required:** No
- **Role required:** Any

**Request Body:**
```json
{
  "name": "John Doe", // required, string
  "email": "john@example.com", // required, string (valid email)
  "password": "password123", // required, string (min 6 chars)
  "role": "sales" // optional, string ('admin' | 'sales')
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "654321...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation Error (e.g., email already exists, invalid email format, password too short)

---

### Login user
- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Description:** Authenticate a user and get a token.
- **Auth required:** No
- **Role required:** Any

**Request Body:**
```json
{
  "email": "john@example.com", // required, string
  "password": "password123" // required, string
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "user": {
      "id": "654321...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation Error (missing fields)
- `401 Unauthorized`: Invalid email or password

---

## Lead Routes

**All Lead routes require Authentication.**
**Request Headers:** `Authorization: Bearer <token>`

### Get all leads
- **Method:** `GET`
- **URL:** `/api/leads`
- **Description:** Get a paginated list of leads with optional filtering.
- **Auth required:** Yes
- **Role required:** Any ('admin' or 'sales')

**Query Parameters:**
- `status` (optional): Filter by exact match ('New', 'Contacted', 'Qualified', 'Lost')
- `source` (optional): Filter by exact match ('Website', 'Instagram', 'Referral')
- `search` (optional): Regex search on name or email (case insensitive)
- `sort` (optional): 'latest' (-createdAt) | 'oldest' (+createdAt) (default: 'latest')
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of items per page or 'all' to disable pagination (default: 10)

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "654321...",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "status": "New",
      "source": "Website",
      "createdAt": "2023-11-01T12:00:00.000Z",
      "updatedAt": "2023-11-01T12:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

**Note:** If `limit=all` is provided, the response will be:
```json
{
  "success": true,
  "message": "Success",
  "data": [ ... ]
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token

---

### Get a single lead
- **Method:** `GET`
- **URL:** `/api/leads/:id`
- **Description:** Get details of a specific lead by ID.
- **Auth required:** Yes
- **Role required:** Any ('admin' or 'sales')

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "_id": "654321...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "New",
    "source": "Website",
    "createdAt": "2023-11-01T12:00:00.000Z",
    "updatedAt": "2023-11-01T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: Lead not found

---

### Create a lead
- **Method:** `POST`
- **URL:** `/api/leads`
- **Description:** Create a new lead.
- **Auth required:** Yes
- **Role required:** Admin

**Request Body:**
```json
{
  "name": "Alice Brown", // required, string
  "email": "alice@example.com", // required, string (valid email)
  "status": "New", // optional, string ('New' | 'Contacted' | 'Qualified' | 'Lost', default: 'New')
  "source": "Referral" // required, string ('Website' | 'Instagram' | 'Referral')
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "654322...",
    "name": "Alice Brown",
    "email": "alice@example.com",
    "status": "New",
    "source": "Referral",
    "createdAt": "2023-11-02T10:00:00.000Z",
    "updatedAt": "2023-11-02T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation Error (missing fields, invalid enum)
- `401 Unauthorized`: No token provided or invalid token
- `403 Forbidden`: Access denied (not an admin)

---

### Update a lead
- **Method:** `PUT`
- **URL:** `/api/leads/:id`
- **Description:** Update an existing lead.
- **Auth required:** Yes
- **Role required:** Admin

**Request Body:** (All fields are optional)
```json
{
  "name": "Alice White",
  "email": "alice.w@example.com",
  "status": "Contacted",
  "source": "Referral"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "_id": "654322...",
    "name": "Alice White",
    "email": "alice.w@example.com",
    "status": "Contacted",
    "source": "Referral",
    "createdAt": "2023-11-02T10:00:00.000Z",
    "updatedAt": "2023-11-02T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation Error
- `401 Unauthorized`: No token provided or invalid token
- `403 Forbidden`: Access denied (not an admin)
- `404 Not Found`: Lead not found

---

### Delete a lead
- **Method:** `DELETE`
- **URL:** `/api/leads/:id`
- **Description:** Delete a lead.
- **Auth required:** Yes
- **Role required:** Admin

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Lead deleted successfully",
  "data": null
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `403 Forbidden`: Access denied (not an admin)
- `404 Not Found`: Lead not found
