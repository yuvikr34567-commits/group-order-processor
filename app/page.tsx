'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react'
import FileUploader from '@/components/FileUploader'
import OrderPreview from '@/components/OrderPreview'

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [step, setStep] = useState<'upload' | 'processing' | 'preview' | 'complete'>('upload')

  const handleFilesUploaded = async (files: File[]) => {
    setUploadedFiles(files)
    setStep('processing')
    setProcessing(true)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('files', file)
      })

      const response = await fetch('/api/process-order', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (data.success) {
        setExtractedData(data.data)
        setStep('preview')
      } else {
        alert('Error processing files: ' + data.error)
        setStep('upload')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to process files')
      setStep('upload')
    } finally {
      setProcessing(false)
    }
  }

  const handleConfirmAndSend = async () => {
    setProcessing(true)
    try {
      const response = await fetch('/api/generate-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(extractedData),
      })

      const data = await response.json()
      
      if (data.success) {
        setStep('complete')
      } else {
        alert('Error generating sheet: ' + data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate sheet')
    } finally {
      setProcessing(false)
    }
  }

  const resetProcess = () => {
    setUploadedFiles([])
    setExtractedData(null)
    setStep('upload')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Group Order Processor
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered PDF extraction for catering orders
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <StepIndicator 
              icon={<Upload size={20} />} 
              label="Upload" 
              active={step === 'upload'} 
              completed={['processing', 'preview', 'complete'].includes(step)}
            />
            <div className="w-16 h-1 bg-gray-300" />
            <StepIndicator 
              icon={<Loader2 size={20} className={processing ? 'animate-spin' : ''} />} 
              label="Processing" 
              active={step === 'processing'} 
              completed={['preview', 'complete'].includes(step)}
            />
            <div className="w-16 h-1 bg-gray-300" />
            <StepIndicator 
              icon={<FileText size={20} />} 
              label="Preview" 
              active={step === 'preview'} 
              completed={step === 'complete'}
            />
            <div className="w-16 h-1 bg-gray-300" />
            <StepIndicator 
              icon={<CheckCircle size={20} />} 
              label="Complete" 
              active={step === 'complete'} 
              completed={false}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 'upload' && (
            <FileUploader onFilesUploaded={handleFilesUploaded} />
          )}

          {step === 'processing' && (
            <div className="text-center py-20">
              <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Processing PDFs...
              </h2>
              <p className="text-gray-600">
                Extracting data using AI. This may take a moment.
              </p>
            </div>
          )}

          {step === 'preview' && extractedData && (
            <OrderPreview 
              data={extractedData} 
              onConfirm={handleConfirmAndSend}
              onCancel={resetProcess}
              processing={processing}
            />
          )}

          {step === 'complete' && (
            <div className="text-center py-20">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Order Processed Successfully!
              </h2>
              <p className="text-gray-600 mb-8">
                Google Sheet has been created and emailed to eatcon@terra-ny.com
              </p>
              <button
                onClick={resetProcess}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Process Another Order
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function StepIndicator({ icon, label, active, completed }: any) {
  return (
    <div className="flex flex-col items-center">
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors
        ${completed ? 'bg-green-600 text-white' : active ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}
      `}>
        {icon}
      </div>
      <span className={`text-sm font-medium ${active || completed ? 'text-gray-900' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  )
}
