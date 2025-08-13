
export default function Contact() {
  return (
    <div className="container">
      <div className="card max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4">Contact us</h1>
        <form action="https://formspree.io/f/your_form_id" method="POST" className="space-y-3">
          <input className="input" name="name" placeholder="Your name" required />
          <input className="input" type="email" name="email" placeholder="Your email" required />
          <textarea className="input" name="message" rows="5" placeholder="Tell us about your needs…" required />
          <button className="btn btn-primary" type="submit">Send</button>
        </form>
        <div className="text-xs text-gray-500 mt-3">We’ll reply within 1 business day.</div>
      </div>
    </div>
  )
}
