# Sample Test PDF Generator

This document describes how to create test PDFs for the Group Order Processor.

## Sample Order Data

### Grubhub Group Order Example

**Order Information:**
- Platform: Grubhub
- Client: Tech Startup Inc.
- Address: 123 Innovation Drive, San Francisco, CA 94105
- Phone: (415) 555-0123
- Email: orders@techstartup.com
- Order Number: GH-2024-001234
- Pick-up Time: 12:30 PM
- Pick-up Date: December 5, 2024
- Number of Guests: 5
- Subtotal: $127.50
- Delivery: No (Pick-up)

**Guest Orders:**

1. **Sarah Johnson**
   - Item: Mediterranean Chicken Bowl
   - Modifications: Extra hummus, no olives
   - Comments: Please pack dressing separately

2. **Mike Chen**
   - Item: Spicy Tuna Poke Bowl
   - Modifications: Brown rice instead of white, extra avocado
   - Comments: Allergic to sesame

3. **Emily Rodriguez**
   - Item: Caesar Salad with Grilled Chicken
   - Modifications: Light dressing, add bacon
   - Comments: No croutons please

4. **David Kim**
   - Item: BBQ Pulled Pork Sandwich
   - Modifications: Extra BBQ sauce, no pickles
   - Comments: Make it spicy

5. **Lisa Wang**
   - Item: Vegetarian Buddha Bowl
   - Modifications: No cheese, extra quinoa
   - Comments: Vegan option

---

## How to Create Test PDF

### Option 1: Use Online PDF Creator

1. Go to: https://www.sejda.com/html-to-pdf
2. Copy the HTML template below
3. Paste and convert to PDF
4. Download and test

### Option 2: Use Google Docs

1. Create new Google Doc
2. Copy the formatted text below
3. File → Download → PDF
4. Test with your app

---

## HTML Template for PDF

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .header { background: #ff6b35; color: white; padding: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .label { font-weight: bold; color: #333; }
        .value { color: #666; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background: #f0f0f0; padding: 12px; text-align: left; border: 1px solid #ddd; }
        td { padding: 12px; border: 1px solid #ddd; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #ff6b35; }
    </style>
</head>
<body>
    <div class="header">
        <h1>GRUBHUB GROUP ORDER</h1>
        <p>Order Confirmation</p>
    </div>

    <div class="section">
        <h2>Order Details</h2>
        <div class="label">Order Number:</div>
        <div class="value">GH-2024-001234</div>
        
        <div class="label">Client Name:</div>
        <div class="value">Tech Startup Inc.</div>
        
        <div class="label">Client Information:</div>
        <div class="value">
            123 Innovation Drive<br>
            San Francisco, CA 94105<br>
            Phone: (415) 555-0123<br>
            Email: orders@techstartup.com
        </div>
        
        <div class="label">Pick-up Date:</div>
        <div class="value">December 5, 2024</div>
        
        <div class="label">Pick-up Time:</div>
        <div class="value">12:30 PM</div>
        
        <div class="label">Number of Guests:</div>
        <div class="value">5</div>
        
        <div class="label">Order Subtotal:</div>
        <div class="value">$127.50</div>
        
        <div class="label">Delivery:</div>
        <div class="value">No - Pick-up Order</div>
    </div>

    <div class="section">
        <h2>Guest Orders</h2>
        <table>
            <thead>
                <tr>
                    <th>Guest Name</th>
                    <th>Item</th>
                    <th>Modifications</th>
                    <th>Comments</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Sarah Johnson</td>
                    <td>Mediterranean Chicken Bowl</td>
                    <td>Extra hummus, no olives</td>
                    <td>Please pack dressing separately</td>
                </tr>
                <tr>
                    <td>Mike Chen</td>
                    <td>Spicy Tuna Poke Bowl</td>
                    <td>Brown rice instead of white, extra avocado</td>
                    <td>Allergic to sesame</td>
                </tr>
                <tr>
                    <td>Emily Rodriguez</td>
                    <td>Caesar Salad with Grilled Chicken</td>
                    <td>Light dressing, add bacon</td>
                    <td>No croutons please</td>
                </tr>
                <tr>
                    <td>David Kim</td>
                    <td>BBQ Pulled Pork Sandwich</td>
                    <td>Extra BBQ sauce, no pickles</td>
                    <td>Make it spicy</td>
                </tr>
                <tr>
                    <td>Lisa Wang</td>
                    <td>Vegetarian Buddha Bowl</td>
                    <td>No cheese, extra quinoa</td>
                    <td>Vegan option</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p><strong>Restaurant:</strong> Fresh Bowl Kitchen</p>
        <p><strong>Restaurant Address:</strong> 456 Market Street, San Francisco, CA 94102</p>
        <p><strong>Restaurant Phone:</strong> (415) 555-9876</p>
        <p><strong>Order placed via Grubhub Corporate Accounts</strong></p>
    </div>
</body>
</html>
```

---

## Quick Test Instructions

1. **Create the PDF:**
   - Copy the HTML above
   - Go to: https://www.sejda.com/html-to-pdf
   - Paste and convert
   - Download as "grubhub-test-order.pdf"

2. **Test Your App:**
   - Go to: https://group-order-processor1.vercel.app
   - Upload the PDF
   - Verify all data is extracted correctly

3. **Expected Results:**
   - Business Client: "Group - Grubhub"
   - Client Name: "Tech Startup Inc."
   - Order Number: "GH-2024-001234"
   - 5 guest orders extracted
   - All modifications and comments captured

---

## Additional Test Scenarios

### Test Case 2: Forkable Order
- Change header to "FORKABLE"
- Use order number: FK-2024-5678
- Test with different items

### Test Case 3: Delivery Order
- Change "Delivery: No" to "Delivery: Yes"
- Add delivery address
- Test delivery time extraction

### Test Case 4: Large Order
- Add 15-20 guests
- Test performance with larger dataset

---

## Troubleshooting Test PDFs

**If extraction fails:**
- Ensure text is selectable (not image-based)
- Check that table structure is clear
- Verify platform name is visible
- Make sure order number is present

**If data is incomplete:**
- Add more explicit labels
- Use clearer formatting
- Separate sections with headers

---

## Next Steps

After creating and testing with sample PDF:
1. Test with real client PDFs
2. Compare results
3. Adjust extraction logic if needed
4. Document any platform-specific quirks
