import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, filename, content: base64Content } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  // Check if file already exists (need SHA to overwrite)
  let sha: string | undefined;
  const checkRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/public/assets/blog/${filename}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (checkRes.ok) {
    const checkData = await checkRes.json();
    sha = checkData.sha;
  }

  const body: Record<string, string> = {
    message: `Image blog : ${filename}`,
    content: base64Content,
    branch,
  };
  if (sha) body.sha = sha;

  const ghRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/public/assets/blog/${filename}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!ghRes.ok) {
    const data = await ghRes.json();
    return res.status(ghRes.status).json({ error: data.message || `Erreur ${ghRes.status}` });
  }

  return res.status(200).json({ ok: true, url: `/assets/blog/${filename}` });
}
