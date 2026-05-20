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
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a2e; background: #fafafa; line-height: 1.6; }
    .container { max-width: 960px; margin: 0 auto; padding: 0 20px; }
    nav { background: #1a1a2e; padding: 16px 0; position: sticky; top: 0; z-index: 50; }
    nav .container { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
    nav a { color: #e0e0e0; text-decoration: none; font-size: 14px; }
    nav a:hover { color: #fff; }
    nav .logo { font-weight: 700; font-size: 18px; color: #fff; }
    nav .nav-links { display: flex; gap: 20px; flex-wrap: wrap; }
    h1 { font-size: 2em; margin: 40px 0 12px; }
    h2 { font-size: 1.5em; margin: 36px 0 10px; }
    h3 { font-size: 1.2em; margin: 24px 0 8px; }
    p { margin: 12px 0; color: #444; }
    ul { margin: 12px 0; padding-left: 24px; }
    li { margin: 6px 0; color: #444; }
    .hero { background: linear-gradient(135deg, #1a1a2e, #16213e); color: #fff; padding: 60px 0; text-align: center; }
    .hero h1 { font-size: 2.4em; margin: 0 0 12px; }
    .hero p { color: #b0b8d1; font-size: 1.15em; max-width: 600px; margin: 0 auto; }
    .btn { display: inline-block; padding: 10px 24px; background: #4361ee; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; }
    .btn:hover { background: #3651de; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin: 24px 0; }
    .card { background: #fff; border: 1px solid #e0e0e0; border-radius: 10px; padding: 24px; text-decoration: none; color: inherit; display: block; transition: box-shadow 0.2s; }
    .card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .card .price { color: #666; font-size: 13px; }
    .card .rating { color: #f59e0b; font-size: 14px; }
    .card h3 { margin: 4px 0; }
    .pro-con-list { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0; }
    .pros, .cons { padding: 16px; border-radius: 8px; }
    .pros { background: #ecfdf5; }
    .cons { background: #fef2f2; }
    .pros h3, .cons h3 { margin: 0 0 8px; font-size: 14px; }
    .pros li, .cons li { font-size: 14px; }
    .affiliate-notice { background: #fffbeb; border: 1px solid #fde68a; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #92400e; margin: 24px 0; }
    .breadcrumb { font-size: 13px; color: #666; margin: 16px 0; }
    .breadcrumb a { color: #4361ee; text-decoration: none; }
    .meta-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    .meta-table td { padding: 8px 12px; border-bottom: 1px solid #eee; font-size: 14px; }
    .meta-table td:first-child { font-weight: 600; color: #333; width: 140px; }
    footer { background: #1a1a2e; color: #888; padding: 40px 0; margin-top: 60px; text-align: center; font-size: 13px; }
    footer a { color: #b0b8d1; text-decoration: none; }
    .tag { display: inline-block; padding: 2px 10px; background: #eef2ff; color: #4361ee; border-radius: 12px; font-size: 12px; margin: 2px; }
    .comparison-highlight { background: #f8fafc; border: 2px solid #4361ee; border-radius: 10px; padding: 20px; margin: 16px 0; }
    .comparison-highlight h3 { margin: 0; }
    @media (max-width: 640px) { .pro-con-list { grid-template-columns: 1fr; } h1 { font-size: 1.5em; } }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <a href="/" class="logo">${SITE_NAME}</a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/comparisons">Comparisons</a>
        <a href="/categories">Categories</a>
      </div>
    </div>
  </nav>
  ${content}
  <footer>
    <div class="container">
      <p>${SITE_NAME} — ${SITE_DESC}</p>
      <p style="margin-top:8px"><a href="/">Home</a> · <a href="/categories">Categories</a> · <a href="/comparisons">Comparisons</a></p>
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
    return `<a href="/category/${cat}" class="card"><h3>${info.name}</h3><p style="font-size:13px;color:#666">${count} tools compared</p></a>`;
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
  const cats = (product.category || []).map(c => getCategoryForSlug(c)).map(c => `<a href="/category/${slugify(c.name)}" class="tag">${c.name}</a>`).join('');
  const cmps = products.filter(p => p.id !== product.id && p.category.some(c => product.category.includes(c))).slice(0, 5);
  const cmpLinks = cmps.map(c => `<a href="/tool/${c.id}" class="tag">${c.name}</a>`).join('');

  const affBtn = product.hasAffiliate && product.affiliateUrl
    ? `<a href="${product.affiliateUrl}" class="btn" rel="nofollow sponsored">Visit ${product.name} →</a>`
    : '';

  return htmlWrap(`${product.name} Review: Pricing, Features, Pros & Cons`, `
    <div class="container">
      <div class="breadcrumb"><a href="/">Home</a> / <a href="/categories">Categories</a> / ${cats}</div>
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
      <div class="breadcrumb"><a href="/">Home</a> / <a href="/comparisons">Comparisons</a></div>
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
    return `<a href="/tool/${p.id}" class="card"><div class="rating">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 >= 0.5 ? '½' : ''}</div><h3>${p.name}</h3><div class="price">${p.pricing}</div><p style="font-size:13px;color:#666;margin-top:8px">${p.description.substring(0, 100)}...</p></a>`;
  }).join('');
  return htmlWrap(`Best ${info.name} Tools Compared`, `
    <div class="container">
      <div class="breadcrumb"><a href="/">Home</a> / <a href="/categories">Categories</a></div>
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
    return `<a href="/category/${c}" class="card"><h3>${info.name}</h3><p style="font-size:13px;color:#666">${count} tools · ${info.desc.substring(0, 80)}</p></a>`;
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
    return `<a href="/compare/${p.a}-vs-${p.b}" class="card"><h3>${a.name} vs ${b.name}</h3><p style="font-size:13px;color:#666">Compare pricing, features, pros and cons</p></a>`;
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
