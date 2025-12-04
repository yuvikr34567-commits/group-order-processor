import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import sgMail from '@sendgrid/mail'
import * as XLSX from 'xlsx'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Create Google Sheet
    const sheetUrl = await createGoogleSheet(data)

    // Generate Excel file
    const excelBuffer = generateExcelFile(data)

    // Send email with attachments
    await sendEmail(data, sheetUrl, excelBuffer)

    return NextResponse.json({
      success: true,
      sheetUrl
    })
  } catch (error: any) {
    console.error('Error generating sheet:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

async function createGoogleSheet(data: any) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  // Create spreadsheet
  const title = `${data.businessClient} - ${data.requestedPickUpDate} - ${data.numberOfGuests}`
  
  const spreadsheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title
      },
      sheets: [{
        properties: {
          title
        }
      }]
    }
  })

  const spreadsheetId = spreadsheet.data.spreadsheetId!

  // Prepare data for sheet
  const values = [
    ['Main Order Information'],
    ['Business Client', data.businessClient],
    ['Client name', data.clientName],
    ['Client Information', data.clientInformation],
    ['Order Subtotal', data.orderSubtotal],
    ['Requested Pick Up Time', data.groupOrderPickTime],
    ['Requested Pick Up Date', data.requestedPickUpDate],
    ['Number of Guests', data.numberOfGuests],
    ['Delivery', data.delivery ? 'Yes' : 'No'],
    [],
    ['Group Order Information'],
    ['Group Order Number #', 'Guest Name', 'Item Name', 'Modifications', 'Comments'],
  ]

  // Add guest orders
  data.guestOrders?.forEach((order: any) => {
    values.push([
      order.groupOrderNumber,
      order.guestName,
      order.itemName,
      order.modifications || '',
      order.comments || ''
    ])
  })

  // Update sheet with data
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'A1',
    valueInputOption: 'RAW',
    requestBody: {
      values
    }
  })

  // Format the sheet
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId: 0,
              startRowIndex: 0,
              endRowIndex: 1
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.2, green: 0.4, blue: 0.8 },
                textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)'
          }
        }
      ]
    }
  })

  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
}

function generateExcelFile(data: any): Buffer {
  const worksheet = XLSX.utils.aoa_to_sheet([
    ['Main Order Information'],
    ['Business Client', data.businessClient],
    ['Client name', data.clientName],
    ['Client Information', data.clientInformation],
    ['Order Subtotal', data.orderSubtotal],
    ['Requested Pick Up Time', data.groupOrderPickTime],
    ['Requested Pick Up Date', data.requestedPickUpDate],
    ['Number of Guests', data.numberOfGuests],
    ['Delivery', data.delivery ? 'Yes' : 'No'],
    [],
    ['Group Order Information'],
    ['Group Order Number #', 'Guest Name', 'Item Name', 'Modifications', 'Comments'],
    ...data.guestOrders.map((order: any) => [
      order.groupOrderNumber,
      order.guestName,
      order.itemName,
      order.modifications || '',
      order.comments || ''
    ])
  ])

  const workbook = XLSX.utils.book_new()
  const sheetName = `${data.businessClient} - ${data.requestedPickUpDate} - ${data.numberOfGuests}`.substring(0, 31)
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}

async function sendEmail(data: any, sheetUrl: string, excelBuffer: Buffer) {
  const subject = `Group Order Submitted - ${data.businessClient} - ${data.requestedPickUpDate} - ${data.numberOfGuests}`
  
  const msg = {
    to: process.env.TARGET_EMAIL || 'eatcon@terra-ny.com',
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject,
    html: `
      <h2>New Group Order Processed</h2>
      <p><strong>Business Client:</strong> ${data.businessClient}</p>
      <p><strong>Client Name:</strong> ${data.clientName}</p>
      <p><strong>Pick Up Date:</strong> ${data.requestedPickUpDate}</p>
      <p><strong>Number of Guests:</strong> ${data.numberOfGuests}</p>
      <p><strong>Order Subtotal:</strong> $${data.orderSubtotal}</p>
      <br>
      <p><a href="${sheetUrl}">View Google Sheet</a></p>
    `,
    attachments: [
      {
        content: excelBuffer.toString('base64'),
        filename: `${data.businessClient} - ${data.requestedPickUpDate}.xlsx`,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        disposition: 'attachment'
      }
    ]
  }

  await sgMail.send(msg)
}
