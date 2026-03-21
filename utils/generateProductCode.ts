import Counter from '@/models/Counter';

export async function generateProductCode(): Promise<string> {
  const counter = await Counter.findByIdAndUpdate(
    'productCode',
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join('');

  const code = `${letters}-${String(counter.seq).padStart(3, '0')}`;
  return code;
}
