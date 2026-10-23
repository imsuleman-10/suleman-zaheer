import { NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/upload-to-github
// Accepts: { base64: string, filename: string }
// Returns: { url: string (raw GitHub CDN), path: string (/gallery/...) }
//
// Images are committed to public/gallery/ in the repo.
// They are immediately available via raw.githubusercontent.com CDN
// and served from Vercel CDN after the next auto-deploy.
// ─────────────────────────────────────────────────────────────────────────────

const GITHUB_OWNER = 'imsuleman-10';
const GITHUB_REPO  = 'suleman-zaheer';
const GITHUB_BRANCH = 'main';

export async function POST(request) {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN environment variable is not configured.' },
        { status: 500 }
      );
    }

    const { base64, filename } = await request.json();

    if (!base64 || !filename) {
      return NextResponse.json(
        { error: 'base64 and filename are required.' },
        { status: 400 }
      );
    }

    // Sanitize filename — SEO-friendly slug
    const sanitized = filename
      .toLowerCase()
      .replace(/[^a-z0-9.\-_]/g, '-')
      .replace(/-+/g, '-');

    const filePath = `public/gallery/${sanitized}`;
    const apiUrl   = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
    const headers  = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    };

    // ── Check if file already exists (get sha for update) ────────────────────
    let sha;
    try {
      const checkRes = await fetch(apiUrl, { headers });
      if (checkRes.ok) {
        const existing = await checkRes.json();
        sha = existing.sha;
      }
    } catch {
      // File doesn't exist yet — that's fine
    }

    // ── Commit file to GitHub ─────────────────────────────────────────────────
    const commitBody = {
      message: `feat(gallery): add SEO photo for Suleman Zaheer — ${sanitized}`,
      content: base64,  // Must be raw base64 without data:image/... prefix
      branch: GITHUB_BRANCH,
      ...(sha && { sha }),
    };

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(commitBody),
    });

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: errData.message || `GitHub API error: ${putRes.status}` },
        { status: putRes.status }
      );
    }

    // ── Return CDN URLs ───────────────────────────────────────────────────────
    // raw.githubusercontent.com is served via Fastly CDN — available immediately
    const rawUrl     = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/public/gallery/${sanitized}`;
    const vercelPath = `/gallery/${sanitized}`;

    return NextResponse.json({ url: rawUrl, path: vercelPath }, { status: 201 });

  } catch (err) {
    console.error('[upload-to-github] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
