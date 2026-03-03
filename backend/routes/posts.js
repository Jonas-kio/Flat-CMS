const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

const POSTS_DIR = path.join(__dirname, '../content/posts');

// Helper: read all posts
function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    return { ...data, content, slug: file.replace('.md', '') };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

// GET all published posts (public)
router.get('/', (req, res) => {
  const now = new Date();
  const posts = getAllPosts().filter(p =>
    p.status === 'published' && new Date(p.date) <= now
  );
  res.json(posts.map(p => ({ ...p, htmlContent: marked(p.content || '') })));
});

// GET all posts (admin)
router.get('/admin', (req, res) => {
  res.json(getAllPosts().map(p => ({ ...p, htmlContent: marked(p.content || '') })));
});

// GET single post
router.get('/:slug', (req, res) => {
  const filePath = path.join(POSTS_DIR, `${req.params.slug}.md`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'No encontrado' });
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  res.json({ ...data, content, slug: req.params.slug, htmlContent: marked(content) });
});

// POST create
router.post('/', (req, res) => {
  const { title, content, status, date, image, excerpt, category } = req.body;
  if (!title) return res.status(400).json({ error: 'Título requerido' });

  const slug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 6);
  const frontmatter = {
    title,
    date: date || new Date().toISOString(),
    status: status || 'draft',
    image: image || '',
    excerpt: excerpt || '',
    category: category || 'General',
    id: uuidv4()
  };

  const fileContent = matter.stringify(content || '', frontmatter);
  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), fileContent);
  res.json({ slug, ...frontmatter });
});

// PUT update
router.put('/:slug', (req, res) => {
  const filePath = path.join(POSTS_DIR, `${req.params.slug}.md`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'No encontrado' });

  const { title, content, status, date, image, excerpt, category } = req.body;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);

  const updated = {
    ...data,
    title: title || data.title,
    date: date || data.date,
    status: status || data.status,
    image: image !== undefined ? image : data.image,
    excerpt: excerpt !== undefined ? excerpt : data.excerpt,
    category: category || data.category,
    updatedAt: new Date().toISOString()
  };

  const fileContent = matter.stringify(content !== undefined ? content : matter(raw).content, updated);
  fs.writeFileSync(filePath, fileContent);
  res.json({ slug: req.params.slug, ...updated });
});

// DELETE
router.delete('/:slug', (req, res) => {
  const filePath = path.join(POSTS_DIR, `${req.params.slug}.md`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'No encontrado' });
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

module.exports = router;
