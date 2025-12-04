# System Architecture

## Overview

The Group Order Processor is a full-stack web application that automates the extraction of catering order data from PDF files using AI and generates structured Google Sheets.

## Architecture Diagram

```
┌─────────────┐
│   Browser   │
│  (React UI) │
└──────┬──────┘
       │
       │ Upload PDFs
       ▼
┌─────────────────────────────────┐
│      Next.js Frontend           │
│  - File Upload Component        │
│  - Order Preview Component      │
│  - Progress Tracking            │
└──────────┬──────────────────────┘
           │
           │ API Calls
           ▼
┌─────────────────────────────────┐
│    Next.js API Routes           │
│  - /api/process-order           │
│  - /api/generate-sheet          │
└──────┬──────────────────────────┘
       │
       ├─────────────┬──────────────┬──────────────┐
       │             │              │              │
       ▼             ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Google   │  │ Google   │  │ SendGrid │  │  XLSX    │
│ Gemini   │  │ Sheets   │  │  Email   │  │Generator │
│   AI     │  │   API    │  │   API    │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TailwindCSS** - Styling
- **TypeScript** - Type safety
- **react-dropzone** - File upload
- **lucide-react** - Icons

### Backend
- **Next.js API Routes** - Serverless functions
- **Google Gemini AI** - PDF data extraction
- **Google Sheets API** - Spreadsheet generation
- **SendGrid** - Email delivery
- **XLSX** - Excel file generation

### Infrastructure
- **Vercel** - Hosting and deployment
- **GitHub** - Version control

## Data Flow

### 1. Upload Phase
```
User → Drag & Drop PDFs → FileUploader Component → State Management
```

### 2. Processing Phase
```
Files → FormData → /api/process-order → Gemini AI → Extract JSON → Return Data
```

### 3. Preview Phase
```
Extracted Data → OrderPreview Component → User Review → Confirm/Cancel
```

### 4. Generation Phase
```
Confirmed Data → /api/generate-sheet → Create Google Sheet → Generate Excel → Send Email
```

## Key Components

### Frontend Components

#### `FileUploader.tsx`
- Handles drag-and-drop file uploads
- Validates PDF files
- Displays uploaded file list
- Manages file removal

#### `OrderPreview.tsx`
- Displays extracted order data
- Shows order-level information
- Lists all guest orders
- Provides confirmation interface

#### `page.tsx`
- Main application page
- Manages workflow state
- Coordinates component interactions
- Displays progress steps

### API Routes

#### `/api/process-order`
**Purpose:** Extract data from PDF files using AI

**Input:**
- FormData with PDF files

**Process:**
1. Receive uploaded PDFs
2. Convert to base64
3. Send to Gemini AI with extraction prompt
4. Parse AI response
5. Return structured JSON

**Output:**
```json
{
  "success": true,
  "data": {
    "businessClient": "Group - Grubhub",
    "clientName": "Company Name",
    "guestOrders": [...]
  }
}
```

#### `/api/generate-sheet`
**Purpose:** Create Google Sheet and send email

**Input:**
- Extracted order data JSON

**Process:**
1. Create Google Sheet with formatted data
2. Generate Excel file
3. Send email with attachments
4. Return sheet URL

**Output:**
```json
{
  "success": true,
  "sheetUrl": "https://docs.google.com/spreadsheets/d/..."
}
```

## AI Extraction Strategy

### Gemini AI Prompt Engineering

The system uses a carefully crafted prompt that:

1. **Defines Data Structure** - Specifies exact fields to extract
2. **Maps Platform Names** - Standardizes business client names
3. **Handles Variations** - Accounts for different PDF formats
4. **Separates Data Types** - Distinguishes modifications from comments
5. **Ensures Completeness** - Extracts all guest orders

### Multi-PDF Support

The system handles:
- Multiple PDFs per order
- Mixed document types (cover sheets, labels, tables)
- Orders split across files
- Multiple orders in single PDF

## Google Sheets Generation

### Sheet Structure

```
Row 1-9:   Main Order Information
Row 10:    Blank
Row 11:    Header "Group Order Information"
Row 12:    Column Headers
Row 13+:   Guest Orders (one per row)
```

### Formatting
- Header row: Blue background, white bold text
- Auto-sized columns
- Named sheet tab
- Shareable link generated

## Email System

### Email Content
- Subject: `Group Order Submitted - [Client] - [Date] - [Guests]`
- HTML body with order summary
- Link to Google Sheet
- Excel file attachment

### Delivery
- Sent via SendGrid API
- Target: eatcon@terra-ny.com
- From: Verified sender email

## Security Considerations

### API Keys
- Stored in environment variables
- Never committed to repository
- Rotated regularly

### File Upload
- PDF validation
- Size limits (50MB)
- Virus scanning (recommended)

### Data Privacy
- No persistent storage of PDFs
- Temporary processing only
- Secure API communications

## Scalability

### Current Limits
- 50MB file size limit
- Multiple concurrent uploads supported
- Serverless auto-scaling

### Future Enhancements
- Database for order history
- User authentication
- Batch processing
- Webhook integrations

## Error Handling

### Frontend
- File validation errors
- Upload progress tracking
- User-friendly error messages
- Retry mechanisms

### Backend
- Try-catch blocks
- Detailed error logging
- Graceful degradation
- Status code responses

## Performance Optimization

### Frontend
- Code splitting
- Lazy loading
- Optimized images
- Minimal bundle size

### Backend
- Serverless functions
- Parallel processing
- Efficient AI prompts
- Caching strategies

## Monitoring & Logging

### Recommended Tools
- Vercel Analytics
- SendGrid Activity Logs
- Google Cloud Logging
- Error tracking (Sentry)

### Key Metrics
- Upload success rate
- Processing time
- Email delivery rate
- User satisfaction

## Deployment Pipeline

```
Code Change → Git Push → GitHub → Vercel Build → Deploy → Live
```

### Environments
- **Development:** Local (localhost:3000)
- **Production:** Vercel (custom domain)

### CI/CD
- Automatic deployments on push
- Preview deployments for PRs
- Environment variable management
- Build optimization

## Future Roadmap

### Phase 2
- User authentication
- Order history dashboard
- Advanced analytics
- Custom templates

### Phase 3
- Mobile app
- API for integrations
- Webhook support
- Multi-language support

### Phase 4
- Machine learning improvements
- Automated testing
- Performance monitoring
- Advanced reporting
