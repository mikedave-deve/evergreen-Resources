import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'

const inquiryTypes = ['General Inquiry', 'I\'m Hiring', 'I\'m a Candidate', 'Executive Search', 'Partnership']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  const Field = ({ label, name, type = 'text', placeholder, required }) => (
    <div>
      <label className="block text-xs font-600 uppercase tracking-widest text-forest-700 mb-1.5">
        {label}{required && <span className="text-gold-600 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => { setForm({ ...form, [name]: e.target.value }); setErrors({ ...errors, [name]: '' }) }}
        placeholder={placeholder}
        className={`w-full border ${errors[name] ? 'border-red-400' : 'border-cream-200'} bg-white text-forest-900 px-4 py-3 text-sm focus:outline-none focus:border-forest-600 transition-colors placeholder:text-forest-400`}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <>
      {/* Header */}
      <div className="bg-forest-950 pt-32 pb-16">
        <div className="container-main">
          <p className="label-tag">Get In Touch</p>
          <h1 className="heading-xl text-cream-100 mb-4">Let's talk.</h1>
          <p className="text-cream-300 max-w-lg">Whether you're ready to hire or ready for a new chapter, we're here to help.</p>
        </div>
      </div>

      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <SectionReveal>
                <div className="gsap-hidden bg-white border border-cream-200 p-8 md:p-10">
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle2 size={48} className="text-forest-700 mx-auto mb-4" />
                      <h3 className="font-display text-3xl text-forest-900 mb-3">Message Received</h3>
                      <p className="text-forest-600">A member of our team will be in touch within one business day.</p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl text-forest-900 mb-7">Send us a message</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <Field label="Full Name" name="name" placeholder="Jane Smith" required />
                        <Field label="Email Address" name="email" type="email" placeholder="jane@company.com" required />
                        <Field label="Company" name="company" placeholder="Your organization" />
                        <Field label="Phone" name="phone" type="tel" placeholder="(555) 000-0000" />
                      </div>
                      <div className="mb-5">
                        <label className="block text-xs font-600 uppercase tracking-widest text-forest-700 mb-1.5">Inquiry Type</label>
                        <select
                          value={form.type}
                          onChange={(e) => setForm({ ...form, type: e.target.value })}
                          className="w-full border border-cream-200 bg-white text-forest-900 px-4 py-3 text-sm focus:outline-none focus:border-forest-600 transition-colors"
                        >
                          <option value="">Select one...</option>
                          {inquiryTypes.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="mb-7">
                        <label className="block text-xs font-600 uppercase tracking-widest text-forest-700 mb-1.5">
                          Message <span className="text-gold-600">*</span>
                        </label>
                        <textarea
                          rows={5}
                          value={form.message}
                          onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }) }}
                          placeholder="Tell us about your needs..."
                          className={`w-full border ${errors.message ? 'border-red-400' : 'border-cream-200'} bg-white text-forest-900 px-4 py-3 text-sm focus:outline-none focus:border-forest-600 transition-colors placeholder:text-forest-400 resize-none`}
                        />
                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                      </div>
                      <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
                        Send Message <Send size={16} />
                      </button>
                    </>
                  )}
                </div>
              </SectionReveal>
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <SectionReveal options={{ stagger: 0.15 }}>
                <div className="gsap-hidden bg-forest-950 text-cream-100 p-8">
                  <h3 className="font-display text-xl mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-cream-300 uppercase tracking-wider mb-1">Address</p>
                        <p className="text-sm">1200 Forest Way, Suite 400<br />Austin, TX 78701</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={16} className="text-gold-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-cream-300 uppercase tracking-wider mb-1">Phone</p>
                        <p className="text-sm">(512) 555-0190</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail size={16} className="text-gold-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-cream-300 uppercase tracking-wider mb-1">Email</p>
                        <p className="text-sm">hello@evergreenresources.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={16} className="text-gold-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-cream-300 uppercase tracking-wider mb-1">Office Hours</p>
                        <p className="text-sm">Mon – Fri: 8:00am – 6:00pm CT</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gsap-hidden bg-cream-200 border border-cream-300 p-8">
                  <h3 className="font-display text-xl text-forest-900 mb-3">Chicago Office</h3>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-forest-700">455 N. Cityfront Plaza Dr, Suite 2100<br />Chicago, IL 60611</p>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="gsap-hidden bg-forest-800 aspect-video flex items-center justify-center border border-forest-700">
                  <div className="text-center">
                    <MapPin size={32} className="text-gold-400 mx-auto mb-2" />
                    <p className="text-cream-300 text-sm">Interactive map placeholder</p>
                    <p className="text-cream-300/50 text-xs mt-1">Integrate Google Maps API here</p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
