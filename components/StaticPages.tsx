
import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Loader2, Send } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export const AboutUs: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About MJFashionMart</h2>
      <p className="mt-4 text-lg text-gray-500">
        We believe that good design should be accessible to everyone. 
        MJFashionMart was founded in 2024 with a simple mission: to curate high-quality, aesthetically pleasing products that elevate everyday life.
      </p>
    </div>
    <div className="mt-16 bg-white overflow-hidden shadow rounded-lg">
      <img className="w-full h-64 object-cover" src="https://picsum.photos/id/48/1200/400" alt="Team working" />
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Our Story</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Started by a team of design enthusiasts and engineers, we wanted to bridge the gap between functionality and beauty. 
            We utilize cutting-edge AI technology to help you find exactly what you need, when you need it.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: new Date(),
        deviceInfo: navigator.userAgent
      });
      setStatus('success');
      setFormData({ fullName: '', email: '', message: '' });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Get in touch</h2>
          <div className="mt-3">
            <p className="text-lg text-gray-500">
              We'd love to hear from you. Whether you have a question about our products, pricing, or just want to say hi.
            </p>
          </div>
          <div className="mt-9">
            <div className="flex">
              <div className="flex-shrink-0">
                <Phone className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-3 text-base text-gray-500">
                <p>+1 (555) 123-4567</p>
                <p className="mt-1">Mon-Fri 8am to 6pm PST</p>
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-3 text-base text-gray-500">
                <p>support@mjfashionmart.com</p>
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-3 text-base text-gray-500">
                <p>123 Innovation Dr.</p>
                <p className="mt-1">San Francisco, CA 94103</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="mt-12 sm:mt-16 md:mt-0">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl mb-4">Send us a message</h2>
          
          {status === 'success' ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Send className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Message sent!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Thanks for reaching out. We will get back to you shortly.</p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="text-sm font-medium text-green-800 hover:text-green-700 underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full name</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              
              {status === 'error' && (
                <div className="text-red-600 text-sm">Something went wrong. Please try again.</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate submission without Firebase
    setTimeout(() => {
      setSubmitted(true);
      setComment('');
      setRating(0);
      setIsSubmitting(false);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Thank You!</h2>
        <p className="mt-2 text-lg text-gray-500">We appreciate your feedback.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-primary hover:underline">Submit another review</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">We value your feedback</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow sm:rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How would you rate your experience?</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <svg className="h-8 w-8 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
          <div className="mt-1">
            <textarea
              id="comments"
              name="comments"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md p-3"
              placeholder="Tell us what you think..."
              required
            ></textarea>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Sending...
            </>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </form>
    </div>
  );
};
