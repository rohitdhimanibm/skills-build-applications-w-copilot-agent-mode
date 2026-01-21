# Mobile Banking Application

A full-stack mobile banking application with user registration, beneficiary management, fund transfers, and bill payment capabilities.

## Features

- **User Registration and Login**: Secure user authentication with token-based authorization
- **Dashboard**: View account information and balance
- **Beneficiary Management**: Add, view, and delete beneficiaries for quick transfers
- **Fund Transfer**: Transfer money to registered beneficiaries or any account
- **Bill Payment**: Pay bills for utilities like electricity, water, gas, internet, mobile, and credit cards
- **Transaction History**: View all past transactions with detailed information

## Technology Stack

### Backend
- **Django 4.1.7**: Python web framework
- **Django REST Framework**: API development
- **SQLite**: Database (can be easily switched to PostgreSQL or MySQL)
- **Token Authentication**: Secure API access

### Frontend
- **React 18**: JavaScript library for building user interfaces
- **React Router**: Navigation and routing
- **Bootstrap 5**: CSS framework for responsive design
- **Axios**: HTTP client for API calls

## Project Structure

```
mobile-banking-app/
├── backend/
│   ├── accounts/          # User authentication and profiles
│   ├── beneficiaries/     # Beneficiary management
│   ├── transactions/      # Fund transfers and bill payments
│   ├── banking_project/   # Django project settings
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/         # React page components
    │   ├── services/      # API service layer
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd mobile-banking-app/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (optional, for admin access):
   ```bash
   python manage.py createsuperuser
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

   The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd mobile-banking-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/accounts/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/accounts/profile/` - Get user profile

### Beneficiaries
- `GET /api/beneficiaries/` - List all beneficiaries
- `POST /api/beneficiaries/` - Create a new beneficiary
- `GET /api/beneficiaries/{id}/` - Get beneficiary details
- `PUT /api/beneficiaries/{id}/` - Update beneficiary
- `DELETE /api/beneficiaries/{id}/` - Delete beneficiary

### Transactions
- `GET /api/transactions/` - List all transactions
- `POST /api/transactions/transfer/` - Create fund transfer
- `GET /api/transactions/bill-payments/` - List bill payments
- `POST /api/transactions/bill-payments/` - Create bill payment

## Usage

1. **Register a New User**:
   - Open the application at `http://localhost:3000`
   - Click on "Register" and fill in the required details
   - Upon successful registration, you'll be automatically logged in

2. **View Dashboard**:
   - After login, you'll see your account details and balance
   - Access different features through the dashboard cards

3. **Add Beneficiaries**:
   - Navigate to "Beneficiaries"
   - Click "Add Beneficiary" and enter beneficiary details
   - Save the beneficiary for quick future transfers

4. **Transfer Funds**:
   - Navigate to "Fund Transfer"
   - Select a beneficiary or enter account details manually
   - Enter the amount and optional description
   - Submit the transfer

5. **Pay Bills**:
   - Navigate to "Bill Payment"
   - Select the biller category (Electricity, Water, Gas, etc.)
   - Enter biller details and amount
   - Submit the payment

6. **View Transaction History**:
   - Navigate to "Transactions"
   - View all past transactions with status and details

## Security Features

- Token-based authentication for secure API access
- Password validation (minimum 8 characters)
- CORS configuration for cross-origin requests
- Protected routes requiring authentication

## Development Notes

- The backend uses SQLite for development. For production, switch to PostgreSQL or MySQL
- All amounts are handled as Decimal fields for precision
- Transaction IDs are automatically generated with unique identifiers
- Balance validation is performed before processing transfers and payments

## Future Enhancements

- Email notifications for transactions
- SMS verification for login
- Transaction scheduling
- Recurring bill payments
- Multi-currency support
- Transaction export (PDF/CSV)
- Mobile app (React Native)

## License

MIT License
