import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, slug, title } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  const shaRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/news/${slug}.md`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!shaRes.ok) {
    const data = await shaRes.json();
    return res.status(shaRes.status).json({ error: data.message });
  }
  const shaData = await shaRes.json();

  const ghRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/news/${slug}.md`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Suppression actualité : ${title}`, sha: shaData.sha, branch }),
    }
  );

  if (!ghRes.ok) {
    const data = await ghRes.json();
    return res.status(ghRes.status).json({ error: data.message || `Erreur ${ghRes.status}` });
  }

  return res.status(200).json({ ok: true });
}
