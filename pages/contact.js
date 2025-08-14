import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    alert('Message sent!')
  }

  return (
    <div className="card" style={{maxWidth:600, margin:'20px auto'}}>
      <h1>Contact Us</h1>
      <form onSubmit={submit} className="space-y-2">
        <input className="input" type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <textarea className="input" placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} required />
        <input className="input" type="file" onChange={e=>setFile(e.target.files[0])} />
        <button className="btn">Send</button>
      </form>
    </div>
  )
}
