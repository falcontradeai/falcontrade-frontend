import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/components/api';

export default function NewOffer() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', price: '', unit: '', country: '', city: '' });
  const [details, setDetails] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/listings', { type: 'OFFER', ...form, details });
    router.push('/market');
  };

  return (
    <div className="container">
      <h1>New Offer</h1>
      <form onSubmit={submit}>
        <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input className="input" placeholder="Unit" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} />
        <div className="flex">
          <input className="input" placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
          <input className="input" placeholder="City/Port" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
        </div>
        <textarea
          className="textarea"
          rows={6}
          placeholder='Details JSON (e.g., {"grade":"A","spec":"..."})'
          onChange={e => {
            try {
              setDetails(JSON.parse(e.target.value || '{}'));
            } catch {}
          }}
        />
        <button className="btn">Create Offer</button>
      </form>
    </div>
  );
}
