'use client'

import { Loader2 } from 'lucide-react'

interface OrderPreviewProps {
  data: any
  onConfirm: () => void
  onCancel: () => void
  processing: boolean
}

export default function OrderPreview({ data, onConfirm, onCancel, processing }: OrderPreviewProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Review Extracted Data</h2>

      {/* Order Information */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <InfoField label="Business Client" value={data.businessClient} />
          <InfoField label="Client Name" value={data.clientName} />
          <InfoField label="Order Number" value={data.groupOrderNumber} />
          <InfoField label="Pick Up Date" value={data.requestedPickUpDate} />
          <InfoField label="Pick Up Time" value={data.requestedPickUpTime} />
          <InfoField label="Number of Guests" value={data.numberOfGuests} />
          <InfoField label="Order Subtotal" value={`$${data.orderSubtotal}`} />
          <InfoField label="Delivery" value={data.delivery ? 'Yes' : 'No'} />
        </div>
      </div>

      {/* Guest Orders */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Guest Orders ({data.guestOrders?.length || 0})
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {data.guestOrders?.map((order: any, index: number) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-gray-900">{order.guestName}</p>
                <span className="text-sm text-gray-500">#{index + 1}</span>
              </div>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Item:</span> {order.itemName}
              </p>
              {order.modifications && (
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Modifications:</span> {order.modifications}
                </p>
              )}
              {order.comments && (
                <p className="text-gray-500 text-sm">
                  <span className="font-medium">Comments:</span> {order.comments}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onCancel}
          disabled={processing}
          className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={processing}
          className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Generating Sheet...
            </>
          ) : (
            'Confirm & Send'
          )}
        </button>
      </div>
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="font-semibold text-gray-900">{value || 'N/A'}</p>
    </div>
  )
}
