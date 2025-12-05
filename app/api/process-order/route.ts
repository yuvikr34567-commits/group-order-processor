import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files uploaded' },
        { status: 400 }
      )
    }

    // Process each PDF file
    const extractedData = await processPDFs(files)

    return NextResponse.json({
      success: true,
      data: extractedData
    })
  } catch (error: any) {
    console.error('Error processing order:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

async function processPDFs(files: File[]) {
  // Try different model names - Gemini API has different naming conventions
  let model;
  try {
    // Try gemini-pro first (most common)
    model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  } catch (e) {
    try {
      // Fallback to gemini-1.5-flash
      model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    } catch (e2) {
      // Last resort: try gemini-1.5-pro
      model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    }
  }

  // Convert PDFs to base64 for Gemini
  const pdfDataPromises = files.map(async (file) => {
    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    return {
      inlineData: {
        data: base64,
        mimeType: 'application/pdf'
      }
    }
  })

  const pdfData = await Promise.all(pdfDataPromises)

  const prompt = `
You are an expert at extracting structured data from catering order PDFs.

Extract the following information from these PDF files:

ORDER-LEVEL INFORMATION:
1. Business Client - Map platform name to standardized format:
   - Grubhub → "Group - Grubhub"
   - Forkable → "Group - Forkable"
   - Sharebite → "Group - Sharebite"
   - CaterCow → "Group - CaterCow"
   - EzCater → "Group - EzCater"
   - Hungry → "Group - Hungry"
   - ClubFeast → "Group - ClubFeast"

2. Client Name (company placing order)
3. Client Information (address, phone, contact, email)
4. Group Order Number
5. Group Order Pick Time or Delivery Time
6. Order Subtotal (exclude tax, fees)
7. Requested Pick-Up Date
8. Number of Guests
9. Delivery (true/false)

GUEST-LEVEL INFORMATION (for each individual order):
1. Group Order Number
2. Guest Name
3. Item Name
4. Modifications (changes affecting the build)
5. Comments (notes that don't change the build)

Return the data in this exact JSON format:
{
  "businessClient": "Group - [Platform]",
  "clientName": "Company Name",
  "clientInformation": "Full contact details",
  "groupOrderNumber": "Order ID",
  "groupOrderPickTime": "Time",
  "orderSubtotal": "Amount",
  "requestedPickUpDate": "Date",
  "numberOfGuests": number,
  "delivery": boolean,
  "guestOrders": [
    {
      "groupOrderNumber": "Order ID",
      "guestName": "Name",
      "itemName": "Item",
      "modifications": "Modifications",
      "comments": "Comments"
    }
  ]
}

IMPORTANT:
- If a guest orders multiple items, create separate entries for each item
- Extract ALL guest orders from labels or tables
- Be thorough and accurate
- If information is missing, use null
`

  const result = await model.generateContent([prompt, ...pdfData])
  const response = await result.response
  const text = response.text()

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from AI response')
  }

  const extractedData = JSON.parse(jsonMatch[0])
  return extractedData
}
