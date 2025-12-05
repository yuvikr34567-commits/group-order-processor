import { NextRequest, NextResponse } from 'next/server'

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
  // Convert PDFs to base64
  const pdfDataPromises = files.map(async (file) => {
    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    return {
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'application/pdf',
        data: base64
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
- Return ONLY the JSON, no other text
`

  // Use OpenRouter API with Claude
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://group-order-processor.vercel.app',
      'X-Title': 'Group Order Processor'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3.5-sonnet', // Using Claude 3.5 Sonnet - excellent for document analysis
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            ...pdfData
          ]
        }
      ],
      temperature: 0.1, // Low temperature for consistent extraction
      max_tokens: 4000
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter API error: ${error}`)
  }

  const result = await response.json()
  const text = result.choices[0].message.content

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from AI response')
  }

  const extractedData = JSON.parse(jsonMatch[0])
  return extractedData
}
