import Link from "next/link";
import { stories } from "../data/stories";
import Head from "next/head";

export default function Home() {
  return (
    <div style={{ padding: 20, fontFamily: "Inter, system-ui, Arial" }}>
      <Head>
        <title>Stories - Demo</title>
        <meta name="description" content="Instagram-like Stories demo (SSR + Open Graph)" />
        <meta property="og:title" content="Stories demo" />
        <meta property="og:description" content="Instagram-like Stories demo built with Next.js (TypeScript)" />
        <meta property="og:image" content={stories[0].items[0].src} />
      </Head>

      <h1>Stories (Demo)</h1>
      <p>Click any story to open viewer (server-side routed for SEO).</p>

      <div style={{ display: "flex", gap: 12 }}>
        {stories.map((s) => (
          <Link
            key={s.id}
            href={`/stories/${s.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ width: 92, textAlign: "center" }}>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid #f56040",
                  padding: 2,
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={s.user.avatar}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ marginTop: 6 }}>{s.user.name.split(" ")[0]}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
