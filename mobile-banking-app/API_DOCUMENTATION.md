# Mobile Banking API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
Most endpoints require authentication using Token-based authentication. Include the token in the Authorization header:
```
Authorization: Token <your-auth-token>
```

## Endpoints

### Authentication Endpoints

#### 1. User Registration
**POST** `/accounts/register/`

Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "password": "string",
  "password2": "string",
  "phone_number": "string"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "profile": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "first_name": "Test",
      "last_name": "User",
      "phone_number": "1234567890",
      "account_number": "ACC00000001",
      "balance": "0.00",
      "created_at": "2026-01-21T12:22:59.684559Z",
      "updated_at": "2026-01-21T12:22:59.686864Z"
    }
  },
  "token": "your-auth-token-here"
}
```

#### 2. User Login
**POST** `/auth/login/`

Login with username and password.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:** `200 OK`
```json
{
  "key": "your-auth-token-here"
}
```

#### 3. User Logout
**POST** `/auth/logout/`

Logout the current user (requires authentication).

**Response:** `200 OK`

#### 4. Get User Profile
**GET** `/accounts/profile/`

Get the current user's profile (requires authentication).

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "first_name": "Test",
  "last_name": "User",
  "phone_number": "1234567890",
  "account_number": "ACC00000001",
  "balance": "10000.00",
  "created_at": "2026-01-21T12:22:59.684559Z",
  "updated_at": "2026-01-21T12:22:59.686864Z"
}
```

### Beneficiary Endpoints

#### 5. List Beneficiaries
**GET** `/beneficiaries/`

Get all beneficiaries for the current user (requires authentication).

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "account_number": "ACC00000002",
    "bank_name": "Test Bank",
    "ifsc_code": "TEST0001234",
    "created_at": "2026-01-21T12:23:11.209398Z",
    "updated_at": "2026-01-21T12:23:11.209422Z"
  }
]
```

#### 6. Create Beneficiary
**POST** `/beneficiaries/`

Add a new beneficiary (requires authentication).

**Request Body:**
```json
{
  "name": "string",
  "account_number": "string",
  "bank_name": "string",
  "ifsc_code": "string"
}
```

**Response:** `201 Created`

#### 7. Get Beneficiary Details
**GET** `/beneficiaries/{id}/`

Get details of a specific beneficiary (requires authentication).

**Response:** `200 OK`

#### 8. Update Beneficiary
**PUT** `/beneficiaries/{id}/`

Update a beneficiary's details (requires authentication).

**Response:** `200 OK`

#### 9. Delete Beneficiary
**DELETE** `/beneficiaries/{id}/`

Delete a beneficiary (requires authentication).

**Response:** `204 No Content`

### Transaction Endpoints

#### 10. List Transactions
**GET** `/transactions/`

Get all transactions for the current user (requires authentication).

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "transaction_type": "TRANSFER",
    "amount": "100.50",
    "recipient_account": "ACC00000002",
    "recipient_name": "John Doe",
    "description": "Test transfer",
    "status": "COMPLETED",
    "transaction_id": "TXN85C4873E79A6",
    "created_at": "2026-01-21T12:23:32.184846Z",
    "updated_at": "2026-01-21T12:23:32.187931Z"
  }
]
```

#### 11. Fund Transfer
**POST** `/transactions/transfer/`

Transfer funds to another account (requires authentication).

**Request Body:**
```json
{
  "recipient_account": "string",
  "recipient_name": "string",
  "amount": "number",
  "description": "string (optional)"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "transaction_type": "TRANSFER",
  "amount": "100.50",
  "recipient_account": "ACC00000002",
  "recipient_name": "John Doe",
  "description": "Test transfer",
  "status": "COMPLETED",
  "transaction_id": "TXN85C4873E79A6",
  "created_at": "2026-01-21T12:23:32.184846Z",
  "updated_at": "2026-01-21T12:23:32.187931Z"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "detail": "Insufficient balance"
}
```

#### 12. List Bill Payments
**GET** `/transactions/bill-payments/`

Get all bill payments for the current user (requires authentication).

**Response:** `200 OK`

#### 13. Create Bill Payment
**POST** `/transactions/bill-payments/`

Pay a bill (requires authentication).

**Request Body:**
```json
{
  "biller_category": "ELECTRICITY|WATER|GAS|INTERNET|MOBILE|CREDIT_CARD",
  "biller_name": "string",
  "consumer_number": "string",
  "amount": "number",
  "due_date": "YYYY-MM-DD (optional)"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "biller_category": "ELECTRICITY",
  "biller_name": "ABC Electricity Company",
  "consumer_number": "123456789",
  "due_date": "2026-01-31",
  "transaction_id": "BILL287C576B78D7",
  "status": "COMPLETED",
  "created_at": "2026-01-21T12:24:32.299562Z"
}
```

#### 14. Get Bill Payment Details
**GET** `/transactions/bill-payments/{id}/`

Get details of a specific bill payment (requires authentication).

**Response:** `200 OK`

## Error Responses

### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Resource deleted successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Transaction Statuses

- `PENDING` - Transaction is being processed
- `COMPLETED` - Transaction completed successfully
- `FAILED` - Transaction failed

## Biller Categories

- `ELECTRICITY` - Electricity bills
- `WATER` - Water bills
- `GAS` - Gas bills
- `INTERNET` - Internet bills
- `MOBILE` - Mobile bills
- `CREDIT_CARD` - Credit card bills
