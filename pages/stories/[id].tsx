import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { stories, Story } from '../../data/stories'
import StoryModal from '../../components/StoryModal'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  story?: Story | null;
};

export default function StoryPage({ story }: Props) {
  const router = useRouter()
  if (!story) {
    return <div style={{ padding: 20 }}>Story not found</div>
  }

  return (
    <>
      <Head>
        <title>{story.user.name} · Story</title>
        <meta name="description" content={`View ${story.user.name}'s story`} />
        {/* Open Graph meta tags for link preview */}
        <meta property="og:title" content={`${story.user.name} · Story`} />
        <meta property="og:description" content={`View ${story.user.name}'s story on our demo`} />
        <meta property="og:image" content={story.items[0].src} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* The modal is server-side routed (URL contains story id) but the UI itself is client */}
      <div>
        <StoryModal story={story} onClose={() => router.push('/')} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string
  const story = stories.find(s => s.id === id) || null
  // Provide story as prop for SSR (SEO)
  return {
    props: {
      story
    }
  }
}
