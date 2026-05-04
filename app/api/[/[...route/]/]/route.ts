import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  });
});

// Quran Search API
app.get('/search', async (c) => {
  const query = c.req.query('q');
  return c.json({
    results: [],
    query
  });
});

export const GET = handle(app);
export const POST = handle(app);
