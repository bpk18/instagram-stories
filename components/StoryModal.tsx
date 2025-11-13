import React, { useEffect, useRef, useState } from 'react';
import { Story } from '../data/stories';
import ProgressBar from './ProgressBar';

type Props = {
  story: Story;
  initialIndex?: number;
  onClose?: () => void;
  sessionUserId?: string;
};

export default function StoryModal({ story, initialIndex = 0, onClose, sessionUserId = 'me' }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [progresses, setProgresses] = useState<number[]>(
    story.items.map((it, i) => (i < initialIndex ? 100 : 0))
  );
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // mark viewed in session storage
  useEffect(() => {
    try {
      const key = `views_${story.id}`;
      const raw = sessionStorage.getItem(key);
      let arr = raw ? JSON.parse(raw) : [];
      if (!arr.includes(sessionUserId)) {
        arr.push(sessionUserId);
        sessionStorage.setItem(key, JSON.stringify(arr));
      }
    } catch (e) { /* ignore */ }
  }, [story.id, sessionUserId]);

  useEffect(() => {
    startProgress();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function startProgress() {
    const duration = story.items[index].duration || 5;
    const start = Date.now();
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgresses(prev => {
        const copy = [...prev];
        copy[index] = pct;
        return copy;
      });
      if (pct >= 100) {
        window.clearInterval(timerRef.current!);
        timerRef.current = null;
        if (index < story.items.length - 1) {
          setIndex(i => i + 1);
        } else {
          onClose && onClose();
        }
      }
    }, 100);
  }

  function goNext() {
    if (index < story.items.length - 1) {
      setIndex(i => i + 1);
    } else {
      onClose && onClose();
    }
  }
  function goPrev() {
    if (index > 0) {
      setIndex(i => i - 1);
    }
  }

  function handleTap(e: React.MouseEvent) {
    const w = containerRef.current?.clientWidth || window.innerWidth;
    const x = e.clientX;
    if (x < w / 2) goPrev(); else goNext();
  }

  // get viewers from session storage and initial story viewers
  function getViewers() {
    try {
      const key = `views_${story.id}`;
      const raw = sessionStorage.getItem(key);
      const sess = raw ? JSON.parse(raw) : [];
      const merged = Array.from(new Set([...(story.viewers || []), ...sess]));
      return merged;
    } catch (e) {
      return story.viewers || [];
    }
  }

  const viewers = getViewers();

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        height: '90%',
        background: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* top header with progress bars */}
        <div style={{ padding: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', flex: 1 }}>
            {story.items.map((it, i) => (
              <ProgressBar key={it.id} progress={progresses[i] || 0} active={i === index} />
            ))}
          </div>
          <button onClick={() => onClose && onClose()} style={{
            background: 'transparent', border: 'none', color: 'white', marginLeft: 8, fontSize: 18
          }}>✕</button>
        </div>

        {/* content */}
        <div ref={containerRef} onClick={handleTap} style={{ flex: 1, position: 'relative', cursor: 'pointer' }}>
          <img
            src={story.items[index].src}
            alt={`story-${index}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* footer: user and viewers */}
        <div style={{ padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={story.user.avatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
            <div>
              <div style={{ fontWeight: 600 }}>{story.user.name}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{new Date(story.items[index].timestamp).toLocaleString()}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{viewers.length} views</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              {viewers.slice(0,4).map(v => (
                <img key={v} src={`https://i.pravatar.cc/40?u=${v}`} style={{ width: 32, height: 32, borderRadius: '50%' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
