export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  content: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlStr = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  yamlStr.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      data[key] = val;
    }
  });

  return { data, content };
}

const modules = import.meta.glob('/posts/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const path in modules) {
    const raw = modules[path] as string;
    const { data, content } = parseFrontmatter(raw);
    const fileSlug = path.replace('/posts/', '').replace('.md', '');

    posts.push({
      slug: data.slug || fileSlug,
      title: data.title || 'Sans titre',
      date: data.date || '',
      excerpt: data.excerpt || '',
      image: data.image || undefined,
      content,
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
