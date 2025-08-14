import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    alert('Message sent!')
  }

  const inputCls = 'w-full p-2 border border-border rounded-lg bg-background'

  return (
    <Card style={{maxWidth:600, margin:'20px auto'}}>
      <h1>Contact Us</h1>
      <form onSubmit={submit} className="space-y-2">
        <input className={inputCls} type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className={inputCls} type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <textarea className={inputCls} placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} required />
        <input className={inputCls} type="file" onChange={e=>setFile(e.target.files[0])} />
        <Button type="submit">Send</Button>
      </form>
    </Card>
  )
}
