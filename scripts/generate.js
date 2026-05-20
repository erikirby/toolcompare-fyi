const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));
const outputDir = path.join(__dirname, '..', 'dist');

const SITE_NAME = 'ToolCompare.fyi';
const SITE_DESC = 'Honest comparisons of the best tools for freelancers and small teams';
const SITE_URL = 'https://toolcompare.fyi';

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getRequiredCategories() {
  const cats = new Set();
  products.forEach(p => p.category.forEach(c => cats.add(c)));
  return [...cats].sort();
}

function getCategoryForSlug(slug) {
  const map = {
    'project-management': { name: 'Project Management', desc: 'The best project management tools to keep your team organized and on track.' },
    'note-taking': { name: 'Note-Taking & Knowledge Management', desc: 'Capture ideas, build knowledge, and never lose a note again.' },
    'productivity': { name: 'Productivity Tools', desc: 'Get more done with the right productivity tools for your workflow.' },
    'communication': { name: 'Team Communication', desc: 'Keep your team connected with the best communication platforms.' },
    'time-tracking': { name: 'Time Tracking', desc: 'Track your time accurately with these proven time tracking tools.' },
    'development': { name: 'Developer Tools', desc: 'Essential tools for modern software development.' },
    'design': { name: 'Design Tools', desc: 'Create beautiful designs with tools for every skill level.' },
    'automation': { name: 'Automation & Workflows', desc: 'Automate repetitive tasks and build powerful workflows.' },
    'hosting': { name: 'Hosting & Deployment', desc: 'Reliable hosting and deployment platforms for your projects.' },
    'invoicing': { name: 'Invoicing & Payments', desc: 'Get paid faster with invoicing and payment tools.' },
    'knowledge-management': { name: 'Knowledge Management', desc: 'Build and organize your team\'s collective knowledge.' },
    'task-management': { name: 'Task Management', desc: 'Stay on top of your tasks with simple yet powerful tools.' },
    'scheduling': { name: 'Scheduling & Calendar', desc: 'Simplify scheduling with tools that save you time.' },
    'ide': { name: 'Code Editors & IDEs', desc: 'Write better code with the right editor or IDE.' },
    'ai-coding': { name: 'AI Coding Assistants', desc: 'Supercharge your development with AI-powered coding tools.' },
    'social-media': { name: 'Social Media Tools', desc: 'Create, schedule, and analyze your social media content.' },
    'open-source': { name: 'Open Source Tools', desc: 'Powerful open-source alternatives for your tech stack.' },
    'no-code': { name: 'No-Code Platforms', desc: 'Build applications without writing code.' },
    'collaboration': { name: 'Collaboration Suites', desc: 'All-in-one platforms for team collaboration.' },
    'community': { name: 'Community Platforms', desc: 'Build and engage your community.' },
    'publishing': { name: 'Publishing Platforms', desc: 'Share your ideas with the world.' },
    'meeting': { name: 'Meeting Tools', desc: 'Better meetings with AI-powered tools.' },
    'screencasting': { name: 'Screen Recording', desc: 'Create professional screen recordings.' },
    'launcher': { name: 'Productivity Launchers', desc: 'Control your computer faster.' },
    'browser': { name: 'Browsers', desc: 'Browse smarter, not harder.' },
    'reading': { name: 'Reading & Research', desc: 'Save and organize what you read.' },
    'graphic-design': { name: 'Graphic Design', desc: 'Design graphics without the learning curve.' },
    'ui-ux': { name: 'UI/UX Design', desc: 'Professional design tools for interfaces and prototypes.' },
    'content-creation': { name: 'Content Creation', desc: 'Create compelling content across platforms.' },
    'async': { name: 'Async Communication', desc: 'Communicate effectively across time zones.' },
    'backup': { name: 'Database & Backend', desc: 'Reliable database and backend solutions.' },
    'integration': { name: 'Integration Platforms', desc: 'Connect your tools and automate workflows.' },
    'ai-notes': { name: 'AI Meeting Notes', desc: 'Never take meeting notes again.' },
    'fintech': { name: 'Payments & Fintech', desc: 'Payment infrastructure for your business.' },
    'team-chat': { name: 'Team Chat', desc: 'Real-time messaging for productive teams.' },
    'wiki': { name: 'Team Wikis', desc: 'Collaborative wikis and documentation for teams.' },
    'analytics': { name: 'Analytics', desc: 'Understand your traffic and user behavior with analytics tools.' },
    'email-marketing': { name: 'Email Marketing', desc: 'Build and nurture your audience with email marketing platforms.' },
    'file-sharing': { name: 'File Sharing', desc: 'Share files securely with clients and teams.' },
    'forms': { name: 'Forms & Surveys', desc: 'Create beautiful forms and surveys that people actually fill out.' },
    'video': { name: 'Video Editing', desc: 'Edit professional videos from quick social clips to full productions.' },
  };
  return map[slug] || { name: slug.replace(/-/g, ' '), desc: '' };
}

function htmlWrap(title, content, description = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — ${SITE_NAME}</title>
  <meta name="description" content="${description || title}">
  <link rel="canonical" href="${SITE_URL}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #0f172a;
      background: #f8fafc;
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .container { max-width: 880px; margin: 0 auto; padding: 0 24px; }
    nav {
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid #e8eaed;
      position: sticky; top: 0; z-index: 50;
      height: 56px;
    }
    nav .container {
      display: flex; align-items: center; justify-content: space-between;
      height: 100%;
    }
    nav a { color: #475569; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.15s; }
    nav a:hover { color: #6366f1; }
    nav .logo { font-weight: 700; font-size: 17px; color: #0f172a; letter-spacing: -0.3px; }
    nav .nav-links { display: flex; gap: 24px; }
    h1 { font-size: 2rem; font-weight: 700; letter-spacing: -0.5px; line-height: 1.3; margin: 40px 0 8px; }
    h2 { font-size: 1.375rem; font-weight: 600; letter-spacing: -0.3px; margin: 40px 0 8px; }
    h3 { font-size: 1.125rem; font-weight: 600; margin: 24px 0 6px; }
    p { margin: 12px 0; color: #475569; font-size: 15px; }
    ul { margin: 12px 0; padding-left: 24px; }
    li { margin: 6px 0; color: #475569; font-size: 14px; line-height: 1.6; }
    .hero { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #fff; padding: 72px 0; text-align: center; }
    .hero h1 { font-size: 2.5rem; margin: 0 0 12px; color: #fff; }
    .hero p { color: #94a3b8; font-size: 1.125rem; max-width: 560px; margin: 0 auto; line-height: 1.7; }
    .btn { display: inline-block; padding: 10px 22px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; transition: background 0.15s, transform 0.1s; }
    .btn:hover { background: #4f46e5; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 16px; margin: 20px 0; }
    .card { background: #fff; border: 1px solid #e8eaed; border-radius: 12px; padding: 24px; text-decoration: none; color: inherit; display: block; transition: border-color 0.15s, box-shadow 0.15s; }
    .card:hover { border-color: #c7cbd6; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .card .price { display: inline-block; background: #f1f5f9; padding: 2px 10px; border-radius: 6px; font-size: 12px; color: #475569; font-weight: 500; margin-top: 6px; }
    .card .rating { color: #f59e0b; font-size: 13px; letter-spacing: 1px; }
    .card h3 { margin: 6px 0 2px; font-size: 1.0625rem; }
    .pro-con-list { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .pros, .cons { padding: 20px; border-radius: 12px; border: 1px solid #e8eaed; }
    .pros { background: #f0fdf4; border-color: #bbf7d0; }
    .cons { background: #fef2f2; border-color: #fecaca; }
    .pros h3, .cons h3 { margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .pros li, .cons li { font-size: 14px; }
    .affiliate-notice { background: #fffbeb; border: 1px solid #fde68a; padding: 14px 18px; border-radius: 10px; font-size: 13px; color: #92400e; margin: 32px 0; line-height: 1.6; }
    .breadcrumb { font-size: 13px; color: #94a3b8; margin: 20px 0; display: flex; gap: 6px; align-items: center; }
    .breadcrumb a { color: #6366f1; text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .meta-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: #fff; border-radius: 10px; overflow: hidden; border: 1px solid #e8eaed; }
    .meta-table td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .meta-table tr:last-child td { border-bottom: none; }
    .meta-table td:first-child { font-weight: 600; color: #64748b; width: 130px; background: #f8fafc; }
    footer { background: #0f172a; color: #64748b; padding: 48px 0; margin-top: 80px; text-align: center; font-size: 13px; }
    footer a { color: #94a3b8; text-decoration: none; }
    footer a:hover { color: #fff; }
    .tag { display: inline-block; padding: 3px 12px; background: #eef2ff; color: #4f46e5; border-radius: 20px; font-size: 12px; font-weight: 500; margin: 2px; transition: background 0.15s; }
    .tag:hover { background: #e0e7ff; }
    .comparison-highlight { background: linear-gradient(135deg, #eef2ff, #f8fafc); border: 1px solid #c7d2fe; border-radius: 12px; padding: 24px; margin: 20px 0; }
    .comparison-highlight strong { color: #0f172a; }
    @media (max-width: 640px) { .pro-con-list { grid-template-columns: 1fr; } h1 { font-size: 1.5rem; } .hero h1 { font-size: 1.75rem; } .hero { padding: 48px 0; } .container { padding: 0 16px; } }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <a href="/" class="logo">${SITE_NAME}</a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/comparisons.html">Comparisons</a>
        <a href="/categories.html">Categories</a>
      </div>
    </div>
  </nav>
  ${content}
  <footer>
    <div class="container">
      <p>${SITE_NAME} — ${SITE_DESC}</p>
      <p style="margin-top:8px"><a href="/">Home</a> · <a href="/categories.html">Categories</a> · <a href="/comparisons.html">Comparisons</a></p>
      <p style="margin-top:16px">Some links on this site are affiliate links. We may earn a commission at no extra cost to you.</p>
    </div>
  </footer>
</body>
</html>`;
}

function buildHome() {
  const categories = getRequiredCategories();
  let catCards = categories.map(cat => {
    const info = getCategoryForSlug(cat);
    const count = products.filter(p => p.category.includes(cat)).length;
    return `<a href="/category/${cat}.html" class="card"><h3>${info.name}</h3><p style="font-size:13px;color:#666">${count} tools compared</p></a>`;
  }).join('');

  const popular = products.slice(0, 6);
  let popCards = popular.map(p => {
    return `<a href="/tool/${p.id}" class="card"><div class="rating">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 >= 0.5 ? '½' : ''}</div><h3>${p.name}</h3><div class="price">${p.pricing}</div><p style="font-size:13px;color:#666;margin-top:8px">${p.description.substring(0, 100)}...</p></a>`;
  }).join('');

  return htmlWrap('Best Tools for Freelancers & Small Teams', `
    <div class="hero">
      <div class="container">
        <h1>${SITE_DESC}</h1>
        <p>Side-by-side comparisons of the best SaaS tools. We test, compare, and recommend so you don't waste time or money.</p>
      </div>
    </div>
    <div class="container">
      <h2>Popular Tool Reviews</h2>
      <div class="card-grid">${popCards}</div>
      <h2>Browse by Category</h2>
      <div class="card-grid">${catCards}</div>
      <div class="affiliate-notice">Some links on this site are affiliate links. If you purchase through these links, we earn a commission at no extra cost to you. We only recommend tools we genuinely believe provide value.</div>
    </div>
  `, SITE_DESC);
}

function buildToolReview(product) {
  const prosList = (product.pros || []).map(p => `<li>${p}</li>`).join('');
  const consList = (product.cons || []).map(p => `<li>${p}</li>`).join('');
  const features = (product.keyFeatures || []).map(f => `<li>${f}</li>`).join('');
  const useCases = (product.useCases || []).map(uc => `<li>${uc}</li>`).join('');
  const cats = (product.category || []).map(c => getCategoryForSlug(c)).map(c => `<a href="/category/${slugify(c.name)}.html" class="tag">${c.name}</a>`).join('');
  const cmps = products.filter(p => p.id !== product.id && p.category.some(c => product.category.includes(c))).slice(0, 5);
  const cmpLinks = cmps.map(c => `<a href="/tool/${c.id}.html" class="tag">${c.name}</a>`).join('');

  const affBtn = product.hasAffiliate && product.affiliateUrl
    ? `<a href="${product.affiliateUrl}" class="btn" rel="nofollow sponsored">Visit ${product.name} →</a>`
    : '';

  return htmlWrap(`${product.name} Review: Pricing, Features, Pros & Cons`, `
    <div class="container">
      <div class="breadcrumb"><a href="/">Home</a> / <a href="/categories.html">Categories</a> / ${cats}</div>
      <h1>${product.name} Review</h1>
      <p style="font-size:18px;color:#555">${product.description}</p>
      <div style="margin: 16px 0">${affBtn}</div>
      <table class="meta-table">
        <tr><td>Pricing</td><td>${product.pricing}</td></tr>
        <tr><td>Rating</td><td>${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''} ${product.rating}/5</td></tr>
        <tr><td>Best for</td><td>${(product.bestFor || []).map(b => b.replace(/-/g, ' ')).join(', ')}</td></tr>
      </table>
      <h2>Pros & Cons</h2>
      <div class="pro-con-list">
        <div class="pros"><h3>👍 Pros</h3><ul>${prosList || '<li>No pros listed</li>'}</ul></div>
        <div class="cons"><h3>👎 Cons</h3><ul>${consList || '<li>No cons listed</li>'}</ul></div>
      </div>
      <h2>Key Features</h2>
      <ul>${features}</ul>
      <h2>Best Use Cases</h2>
      <ul>${useCases}</ul>
      ${cmpLinks ? `<h2>Compare with Alternatives</h2><p>See how ${product.name} stacks up against: ${cmpLinks}</p>` : ''}
      <div class="affiliate-notice">We may earn a commission if you purchase through links on this page. Our reviews are independent and based on real use.</div>
    </div>
  `, `${product.name} review — pricing from ${product.pricing}, features, pros and cons. Best for ${(product.bestFor || []).join(', ')}.`);
}

function buildComparisonPage(productA, productB) {
  const a = products.find(p => p.id === productA);
  const b = products.find(p => p.id === productB);
  if (!a || !b) return '';
  const title = `${a.name} vs ${b.name}: Which Is Better?`;

  const renderSide = (p) => {
    const prosList = (p.pros || []).map(x => `<li>${x}</li>`).join('');
    const consList = (p.cons || []).map(x => `<li>${x}</li>`).join('');
    const features = (p.keyFeatures || []).map(f => `<li>${f}</li>`).join('');
    return `<div style="flex:1"><h3>${p.name}</h3><table class="meta-table"><tr><td>Pricing</td><td>${p.pricing}</td></tr><tr><td>Rating</td><td>${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 >= 0.5 ? '½' : ''} ${p.rating}/5</td></tr></table><h4>Key Features</h4><ul>${features}</ul><h4>Pros</h4><ul>${prosList}</ul><h4>Cons</h4><ul>${consList}</ul>${p.hasAffiliate && p.affiliateUrl ? `<a href="${p.affiliateUrl}" class="btn" style="margin-top:12px" rel="nofollow sponsored">Try ${p.name} →</a>` : ''}</div>`;
  };

  return htmlWrap(title, `
    <div class="container">
      <div class="breadcrumb"><a href="/">Home</a> / <a href="/comparisons.html">Comparisons</a></div>
      <h1>${title}</h1>
      <p style="font-size:18px;color:#555">Choosing between ${a.name} and ${b.name}? Here's a side-by-side comparison to help you decide.</p>
      <div class="comparison-highlight"><strong>Quick verdict:</strong> Choose ${a.name} if you need ${(a.bestFor || ['flexibility']).slice(0,2).join(' or ')}. Choose ${b.name} if you prioritize ${(b.bestFor || ['simplicity']).slice(0,2).join(' or ')}.</div>
      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        ${renderSide(a)}
        ${renderSide(b)}
      </div>
      <h2>Which Should You Choose?</h2>
      <p>Both ${a.name} and ${b.name} are excellent tools in their category. The right choice depends on your specific needs:</p>
      <ul>
        <li><strong>Choose ${a.name} if:</strong> ${a.description}</li>
        <li><strong>Choose ${b.name} if:</strong> ${b.description}</li>
      </ul>
      <div class="affiliate-notice">We may earn a commission if you purchase through links. All opinions are our own.</div>
    </div>
  `, title);
}

function buildCategoryPage(catSlug) {
  const info = getCategoryForSlug(catSlug);
  const matching = products.filter(p => p.category.includes(catSlug)).sort((a, b) => b.rating - a.rating);
  const cards = matching.map(p => {
    return `<a href="/tool/${p.id}.html" class="card"><div class="rating">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 >= 0.5 ? '½' : ''}</div><h3>${p.name}</h3><div class="price">${p.pricing}</div><p style="font-size:13px;color:#666;margin-top:8px">${p.description.substring(0, 100)}...</p></a>`;
  }).join('');
  return htmlWrap(`Best ${info.name} Tools Compared`, `
    <div class="container">
      <div class="breadcrumb"><a href="/">Home</a> / <a href="/categories.html">Categories</a></div>
      <h1>Best ${info.name} Tools</h1>
      <p>${info.desc} We've reviewed and compared the top options to help you choose.</p>
      <div class="card-grid">${cards}</div>
    </div>
  `, `Compare the best ${info.name.toLowerCase()} tools for freelancers and small teams. Side-by-side reviews with honest pros and cons.`);
}

function buildCategoriesPage() {
  const cats = getRequiredCategories();
  const items = cats.map(c => {
    const info = getCategoryForSlug(c);
    const count = products.filter(p => p.category.includes(c)).length;
    return `<a href="/category/${c}.html" class="card"><h3>${info.name}</h3><p style="font-size:13px;color:#666">${count} tools · ${info.desc.substring(0, 80)}</p></a>`;
  }).join('');
  return htmlWrap('Categories — ' + SITE_NAME, `
    <div class="container">
      <div class="breadcrumb"><a href="/">Home</a></div>
      <h1>Browse by Category</h1>
      <p>Find the best tools for every need. Each category includes reviews, comparisons, and buying guides.</p>
      <div class="card-grid">${items}</div>
    </div>
  `);
}

function buildComparisonsPage() {
  const pairs = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      const a = products[i];
      const b = products[j];
      const shared = a.category.filter(c => b.category.includes(c));
      if (shared.length > 0) {
        pairs.push({ a: a.id, b: b.id, score: a.rating + b.rating });
      }
    }
  }
  pairs.sort((x, y) => y.score - x.score);
  const topPairs = pairs.slice(0, 20);

  const items = topPairs.map(p => {
    const a = products.find(x => x.id === p.a);
    const b = products.find(x => x.id === p.b);
    return `<a href="/compare/${p.a}-vs-${p.b}.html" class="card"><h3>${a.name} vs ${b.name}</h3><p style="font-size:13px;color:#666">Compare pricing, features, pros and cons</p></a>`;
  }).join('');

  return htmlWrap('Tool Comparisons — ' + SITE_NAME, `
    <div class="container">
      <div class="breadcrumb"><a href="/">Home</a></div>
      <h1>Side-by-Side Tool Comparisons</h1>
      <p>Not sure which tool to choose? These direct comparisons break down the differences so you can decide with confidence.</p>
      <div class="card-grid">${items}</div>
    </div>
  `);
}

function buildSitemap() {
  const urls = ['/'];
  getRequiredCategories().forEach(c => urls.push(`/category/${c}`));
  urls.push('/comparisons', '/categories');
  products.forEach(p => urls.push(`/tool/${p.id}`));
  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      const a = products[i];
      const b = products[j];
      if (a.category.some(c => b.category.includes(c))) {
        urls.push(`/compare/${a.id}-vs-${b.id}`);
      }
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE_URL}${u}</loc><changefreq>monthly</changefreq><priority>${u === '/' ? '1.0' : '0.7'}</priority></url>`).join('\n')}
</urlset>`;
}

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true });
}
fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(path.join(outputDir, 'index.html'), buildHome());
console.log('✓ Home page');

const catDir = path.join(outputDir, 'category');
fs.mkdirSync(catDir, { recursive: true });
getRequiredCategories().forEach(c => {
  fs.writeFileSync(path.join(catDir, `${c}.html`), buildCategoryPage(c));
});
console.log(`✓ ${getRequiredCategories().length} category pages`);

const toolDir = path.join(outputDir, 'tool');
fs.mkdirSync(toolDir, { recursive: true });
products.forEach(p => {
  fs.writeFileSync(path.join(toolDir, `${p.id}.html`), buildToolReview(p));
});
console.log(`✓ ${products.length} tool review pages`);

const cmpDir = path.join(outputDir, 'compare');
fs.mkdirSync(cmpDir, { recursive: true });
let cmpCount = 0;
for (let i = 0; i < products.length; i++) {
  for (let j = i + 1; j < products.length; j++) {
    const a = products[i];
    const b = products[j];
    if (a.category.some(c => b.category.includes(c))) {
      const html = buildComparisonPage(a.id, b.id);
      if (html) {
        fs.writeFileSync(path.join(cmpDir, `${a.id}-vs-${b.id}.html`), html);
        cmpCount++;
      }
    }
  }
}
console.log(`✓ ${cmpCount} comparison pages`);

fs.writeFileSync(path.join(outputDir, 'comparisons.html'), buildComparisonsPage());
console.log('✓ Comparisons listing page');
fs.writeFileSync(path.join(outputDir, 'categories.html'), buildCategoriesPage());
console.log('✓ Categories listing page');
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), buildSitemap());
console.log('✓ Sitemap');
console.log(`\nDone! ${outputDir} — Total pages: ${1 + getRequiredCategories().length + products.length + cmpCount + 2}`);
