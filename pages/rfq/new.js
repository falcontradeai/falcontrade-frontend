import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/components/api';
import Button from '@/components/Button';

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
    <div>
      <h1 className="text-xl font-bold">New RFQ</h1>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <input className="w-full p-2 border border-border rounded-lg bg-background" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="w-full p-2 border border-border rounded-lg bg-background" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <input className="w-full p-2 border border-border rounded-lg bg-background" placeholder="Unit" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="w-full p-2 border border-border rounded-lg bg-background" placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
          <input className="w-full p-2 border border-border rounded-lg bg-background" placeholder="City/Port" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
        </div>
        <textarea
          className="w-full p-2 border border-border rounded-lg bg-background"
          rows={6}
          placeholder='Details JSON (e.g., {"grade":"A","moisture":"12%"})'
          onChange={e => {
            try {
              setDetails(JSON.parse(e.target.value || '{}'));
            } catch {}
          }}
        />
        <Button type="submit">Create RFQ</Button>
      </form>
    </div>
  );
}
