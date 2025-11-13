# Next.js Instagram-like Stories (TypeScript)

This is a minimal Next.js (TypeScript) project demonstrating an Instagram-like Stories feature:
- Tap left/right to navigate stories
- Progress bars show loading/progress and active/inactive states
- Session Storage tracks viewers per story during the browser session
- Server-side rendering via getServerSideProps for SEO and Open Graph meta tags
- Hardcoded data in `data/stories.ts`

How to run:
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

Files of interest:
- `pages/index.tsx` — list of story thumbnails
- `pages/stories/[id].tsx` — story viewer (SSR) with Open Graph meta tags
- `components/StoryModal.tsx` — core UI and navigation logic
- `data/stories.ts` — hardcoded story dataset and schema examples

This project is packaged for quick inspection and demo. Images are external URLs (Unsplash/picsum).
"# instagram-stories" 
