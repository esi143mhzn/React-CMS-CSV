
# Client Management System

Client management system that enables users to import client data from CSV files, automatically detect and highlight duplicate records, manage client information, and export data back to CSV format.

## Features

- **CSV Import:** Upload client data directly from CSV files.  
- **Duplicate Detection:** Automatically flags records with identical company name, email, and phone number.  
- **Client Management:** Edit and delete duplicate client records.  
- **CSV Export:** Export filtered or full client lists to CSV.  
- **Pagination & Filtering:** Easily navigate through large datasets.  
- **Error Handling:** Prevents invalid or incomplete imports.

## Tech Stack

- **Framework:** React 19.1.1 + Vite  
- **Language:** JavaScript (ES6+)  
- **HTTP Client:** Axios
- **Styling:** TailwindCSS
- **State Management:** React Hooks
- **Version Control:** Git

## Prerequisites

Ensure the following are installed on your system:

| Requirement | Recommended Version |
|--------------|----------------------|
| Node.js | ≥ 22.17.1 |
| npm | ≥ 10.9.2 |
| Backend API | Laravel 12 / Node.js (running separately) |

## Installation (Local Setup)

### Clone the Repository
```bash
git clone https://github.com/esi143mhzn/React-CMS-CSV.git
cd React-CMS-CSV 
```

### Install Dependencies
```bash
npm install 
```

### Configure API URL
Open src/api/clientApi.js and update the base URL to your backend API endpoint:
```bash
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: false,
})
```

### Run the Development Server
```bash
npm run dev
```
Then visit the app at:
```bash
http://localhost:5173
```
**NOTE:** Ensure your backend server is running (e.g., Laravel API) before using the app.

## License

This project is open-sourced under the MIT License.

## Support

For technical issues or feature requests, please open an issue or contact the maintainer.