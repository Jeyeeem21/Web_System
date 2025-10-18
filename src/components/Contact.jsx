import React, { useState } from 'react';
import Button from './button';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: wire to backend/email service
    alert(`Thanks ${form.name || 'there'} — we received your message.`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="w-full py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h3>
        <p className="text-gray-600 mb-8">Have questions or want help buying a car? Send us a message and we'll get back to you.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          <div>
             {/* <Button label={'Browse Cars'} variant={'primary'} className={'px-8 py-4 text-center text-lg'} /> */}
             <Button label={'Send Message'} variant={'secondary'} className={'px-8 py-4 text-center text-lg'} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
