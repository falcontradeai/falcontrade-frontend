import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/components/api';

export default function NewRFQ() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', quantity: '', unit: '', country: '', city: '' });
  const [details, setDetails] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/listings', { type: 'RFQ', ...form, details });
    router.push('/market');
  };

  return (
    <div className="container">
      <h1>New RFQ</h1>
      <form onSubmit={submit}>
        <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <input className="input" placeholder="Unit" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} />
        <div className="flex">
          <input className="input" placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
          <input className="input" placeholder="City/Port" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
        </div>
        <textarea
          className="textarea"
          rows={6}
          placeholder='Details JSON (e.g., {"grade":"A","moisture":"12%"})'
          onChange={e => {
            try {
              setDetails(JSON.parse(e.target.value || '{}'));
            } catch {}
          }}
        />
        <button className="btn">Create RFQ</button>
      </form>
    </div>
  );
}
