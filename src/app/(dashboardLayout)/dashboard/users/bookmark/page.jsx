'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  Bookmark,
  Trash2,
  ExternalLink,
  Copy,
  Sparkles,
  Layers,
  Calendar,
  Crown,
  Zap,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function BookmarksPage() {
  const { data: session } = authClient.useSession();

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBookmarks = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5500/api/bookmark?email=${encodeURIComponent(
          session.user.email
        )}`
      );

      if (!res.ok) throw new Error('Failed to fetch bookmarks');

      const data = await res.json();
      setBookmarks(data.bookmarks || []);
    } catch (err) {
      console.error(err);
      toast.error('Unable to load bookmarks');
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // 2. Remove Bookmark Handler with MongoDB _id / id fallback
  const handleRemoveBookmark = async (promptId) => {
    setDeletingId(promptId);

    // Optimistic UI Update checking both _id and id
    const previousBookmarks = [...bookmarks];
    setBookmarks((prev) =>
      prev.filter((item) => (item._id || item.id) !== promptId)
    );

    try {
      const res = await fetch(
        `http://localhost:5500/api/bookmark/${promptId}?email=${encodeURIComponent(
          session.user.email
        )}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) {
        throw new Error('Failed to remove bookmark');
      }

      toast.success('Prompt removed from bookmarks!', {
        style: {
          background: '#18181b',
          color: '#f4f4f5',
          border: '1px solid #27272a',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#18181b',
        },
      });
    } catch (err) {
      // Rollback on error
      setBookmarks(previousBookmarks);
      toast.error('Could not remove bookmark. Please try again.');
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-6 lg:p-10 font-sans selection:bg-purple-500/30">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Bookmark className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Saved Prompts
          </h1>
        </div>
        <p className="text-neutral-400 text-sm sm:text-base">
          Quickly access and manage all your bookmarked AI prompts in one place.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : bookmarks.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-20 px-4 rounded-3xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-md"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 shadow-2xl shadow-purple-500/10">
                <Bookmark className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-neutral-200 mb-2">
              No Bookmarked Prompts Yet
            </h2>
            <p className="text-neutral-400 text-sm max-w-sm">
              Start bookmarking your favourite prompts to access them quickly.
            </p>
          </motion.div>
        ) : (
          /* Bookmarks Grid */
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {bookmarks.map((prompt, index) => {
                // Priority fallback for unique key
                const targetId = prompt._id || prompt.id || `prompt-${index}`;

                return (
                  <PromptCard
                    key={targetId}
                    prompt={prompt}
                    isDeleting={deletingId === targetId}
                    onRemove={handleRemoveBookmark}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}

// --- Individual Card Component ---
function PromptCard({ prompt, isDeleting, onRemove }) {
  // Extract target ID safely
  const promptId = prompt._id || prompt.id;

  const {
    title,
    description,
    thumbnail,
    category,
    aiTool,
    creatorName,
    difficulty,
    isPremium,
    copyCount,
    bookmarkedAt,
  } = prompt;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/5 transition-all"
    >
      <div>
        {/* Card Thumbnail Section */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
          <Image
            src={thumbnail || '/api/placeholder/400/225'}
            alt={title || 'Prompt thumbnail'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30" />

          {/* Badges Top Bar */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-neutral-950/80 text-neutral-300 border border-neutral-800 backdrop-blur-md flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-purple-400" />
              {aiTool || 'AI'}
            </span>

            {isPremium && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Premium
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-purple-400 font-medium mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{category || 'General'}</span>
            <span className="text-neutral-600">•</span>
            <DifficultyBadge level={difficulty} />
          </div>

          <h3 className="text-lg font-semibold text-neutral-100 line-clamp-1 group-hover:text-purple-300 transition-colors">
            {title}
          </h3>

          <p className="text-neutral-400 text-sm mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex items-center justify-between py-3 my-3 border-y border-neutral-800/60 text-xs text-neutral-400">
          <span className="truncate">By {creatorName || 'Anonymous'}</span>

          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1">
              <Copy className="w-3.5 h-3.5 text-neutral-500" />
              {copyCount ?? 0}
            </span>
            {bookmarkedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                {new Date(bookmarkedAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href={`/prompt/${promptId}`}
            className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View
          </Link>

          <button
            onClick={() => onRemove(promptId)}
            disabled={isDeleting}
            className="w-full py-2 px-3 rounded-xl bg-neutral-800/80 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-400 border border-neutral-700/50 hover:border-rose-500/30 text-xs font-medium flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {isDeleting ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// --- Difficulty Badge Helper ---
function DifficultyBadge({ level = 'Beginner' }) {
  const styles = {
    Beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Intermediate: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    Advanced: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-medium rounded border ${
        styles[level] || styles.Beginner
      }`}
    >
      {level}
    </span>
  );
}

// --- Loading Skeleton ---
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/60 p-4 animate-pulse flex flex-col justify-between h-[380px]">
      <div>
        <div className="w-full h-40 bg-neutral-800/60 rounded-xl mb-4" />
        <div className="w-24 h-4 bg-neutral-800/60 rounded mb-3" />
        <div className="w-3/4 h-5 bg-neutral-800/60 rounded mb-2" />
        <div className="w-full h-8 bg-neutral-800/40 rounded" />
      </div>
      <div className="pt-4 border-t border-neutral-800/40 flex gap-2">
        <div className="w-1/2 h-9 bg-neutral-800/60 rounded-xl" />
        <div className="w-1/2 h-9 bg-neutral-800/60 rounded-xl" />
      </div>
    </div>
  );
}