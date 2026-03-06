import { useState, useRef, useCallback, useEffect } from 'react'
import { CheckCircle2, Upload, FileText, X, AlertCircle } from 'lucide-react'

// Shared input styling mirrors ContactPage exactly
const inputClass = [
  'w-full px-4 py-3 text-sm font-body',
  'border border-forest-200 rounded-sm',
  'bg-forest-50 text-forest-900 placeholder-forest-400',
  'focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent',
  'transition-all duration-200',
].join(' ')

const labelClass = 'block font-body text-xs font-medium text-forest-700 mb-1.5 tracking-wide'

const industries = [
  'Technology', 'Finance', 'Healthcare', 'Marketing', 'Human Resources',
  'Engineering', 'Customer Support', 'Sales', 'Administration', 'Other',
]

function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-forest-600" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-forest-500 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      </div>
      <h3 className="font-display text-2xl font-bold text-forest-900 mb-3">Resume Submitted</h3>
      <p className="font-body text-sm text-forest-700/70 max-w-sm leading-relaxed">
        Thank you for submitting your resume. Our recruitment team will review your application and contact you if there is a match.
      </p>
      <div className="mt-6 px-5 py-3 bg-forest-50 border border-forest-100 rounded-sm">
        <p className="font-body text-xs text-forest-500">
          Expected response time: <span className="font-semibold text-forest-700">3 to 5 business days</span>
        </p>
      </div>
    </div>
  )
}

// Drag-and-Drop Upload Zone
// One single input always in the DOM. Drag-dropped files are synced to it
// via DataTransfer so the native form POST sends the file correctly.
function UploadZone({ file, onFileChange, error }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function assignToInput(f) {
    if (!inputRef.current) return
    if (!f) { inputRef.current.value = ''; return }
    try {
      const dt = new DataTransfer()
      dt.items.add(f)
      inputRef.current.files = dt.files
    } catch (_) {}
  }

  const handleDragOver = useCallback((e) => { e.preventDefault(); setDragging(true) }, [])
  const handleDragLeave = useCallback(() => setDragging(false), [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return
    assignToInput(dropped)
    onFileChange(dropped)
  }, [onFileChange])

  const handleInputChange = (e) => {
    const selected = e.target.files[0]
    if (selected) onFileChange(selected)
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    onFileChange(null)
    assignToInput(null)
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        name="resume"
        onChange={handleInputChange}
        required
        className="sr-only"
        tabIndex={-1}
      />

      {file ? (
        <div className="relative flex items-center gap-4 p-4 bg-forest-50 border-2 border-forest-400 rounded-sm transition-all">
          <div className="w-10 h-10 bg-forest-700 rounded-sm flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-cream-100" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm font-semibold text-forest-900 truncate">{file.name}</p>
            <p className="font-body text-xs text-forest-500 mt-0.5">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 w-7 h-7 rounded-full bg-white border border-forest-200 flex items-center justify-center text-forest-500 hover:text-forest-800 hover:border-forest-400 transition-colors"
            aria-label="Remove file"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          aria-label="Upload resume file"
          className={[
            'relative flex flex-col items-center justify-center gap-3',
            'p-8 border-2 border-dashed rounded-sm cursor-pointer transition-all duration-200 group',
            dragging
              ? 'border-forest-500 bg-forest-50 scale-[1.01]'
              : error
                ? 'border-red-300 bg-red-50 hover:border-red-400'
                : 'border-forest-200 bg-forest-50/50 hover:border-forest-400 hover:bg-forest-50',
          ].join(' ')}
        >
          <div className={['w-12 h-12 rounded-sm flex items-center justify-center transition-colors', dragging ? 'bg-forest-700' : 'bg-forest-100 group-hover:bg-forest-200'].join(' ')}>
            <Upload className={['w-5 h-5 transition-colors', dragging ? 'text-cream-100' : 'text-forest-600'].join(' ')} />
          </div>
          <div className="text-center">
            <p className="font-body text-sm font-medium text-forest-800">
              Drag and drop your resume here or{' '}
              <span className="text-forest-600 underline underline-offset-2 group-hover:text-forest-500">browse files</span>
            </p>
            <p className="font-body text-xs text-forest-400 mt-1">All files accepted · Max 10 MB</p>
          </div>
        </div>
      )}
    </>
  )
}

// Main Form Component
export default function ResumeSubmissionForm() {
  const [file,      setFile]      = useState(null)
  const [fileError, setFileError] = useState('')
  const [loading,   setLoading]   = useState(false)

  // Detect ?success=true in URL — set by FormSubmit via the _next redirect
  const [submitted, setSubmitted] = useState(() =>
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('success') === 'true'
  )

  // Strip the ?success param from the URL bar without reloading
  useEffect(() => {
    if (!submitted) return
    const url = new URL(window.location.href)
    url.searchParams.delete('success')
    window.history.replaceState({}, '', url.toString())
  }, [submitted])

  function handleFileChange(selectedFile) {
    setFileError('')
    if (!selectedFile) { setFile(null); return }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError('File size must be under 10 MB.')
      setFile(null)
      return
    }
    setFile(selectedFile)
  }

  // Validate only. If OK, do NOT call preventDefault — let the native POST fire.
  // The file is already on the real <input> via DataTransfer, so FormSubmit gets it.
  function handleSubmit(e) {
    if (!file) {
      e.preventDefault()
      setFileError('Please attach your resume before submitting.')
      return
    }
    setLoading(true)
    // Native form POST takes over from here — page navigates to FormSubmit then back
  }

  if (submitted) return <SuccessMessage />

  return (
    <form
      onSubmit={handleSubmit}
      action="https://formsubmit.co/info@evergreenresources.org"
      method="POST"
      encType="multipart/form-data"
      className="space-y-5"
    >
      {/* FormSubmit configuration */}
      <input type="hidden" name="_subject" value="New Resume Submission" />
      <input type="hidden" name="_captcha" value="false" />
      {/*
        _next: after a successful submission FormSubmit redirects here.
        For local dev:   http://localhost:5173/submit-resume?success=true
        For production:  https://yourdomain.com/submit-resume?success=true
      */}
      <input type="hidden" name="_next" value="/submit-resume?success=true" />

      {/* Row 1: Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name *</label>
          <input id="firstName" type="text" name="firstName" required placeholder="Jane" className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name *</label>
          <input id="lastName" type="text" name="lastName" required placeholder="Smith" className={inputClass} />
        </div>
      </div>

      {/* Row 2: Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input id="email" type="email" name="email" required placeholder="jane@example.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input id="phone" type="tel" name="phone" placeholder="(503) 555-0100" className={inputClass} />
        </div>
      </div>

      {/* Row 3: Industry */}
      <div>
        <label htmlFor="industry" className={labelClass}>Industry *</label>
        <select id="industry" name="industry" required defaultValue="" className={inputClass}>
          <option value="" disabled>Select your industry...</option>
          {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
        </select>
      </div>

      {/* Row 4: Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Additional Notes <span className="ml-1 font-normal text-forest-400">(optional)</span>
        </label>
        <textarea
          id="message" name="message" rows={4}
          placeholder="Tell us about your experience, preferred role, availability, or anything else that would help us match you to the right opportunity..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Row 5: Resume Upload */}
      <div>
        <label className={labelClass}>Resume / CV *</label>
        <UploadZone file={file} onFileChange={handleFileChange} error={!!fileError} />
        {fileError && (
          <p className="flex items-center gap-1.5 mt-2 font-body text-xs text-red-600">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {fileError}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-forest-100" />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-sm py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting...
          </>
        ) : 'Submit Resume'}
      </button>

      <p className="font-body text-xs text-center text-forest-400">
        Your information is kept confidential and will only be used for recruitment purposes.
      </p>
    </form>
  )
}