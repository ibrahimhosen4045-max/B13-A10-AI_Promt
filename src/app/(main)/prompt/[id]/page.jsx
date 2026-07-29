"use client";

import { useState, useEffect, useCallback, use } from "react";
import { Flag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import PromptHeader from "@/component/detailsPromt/PromptHeader";
import PromptContent from "@/component/detailsPromt/PromptContent";
import CopyButton from "@/component/detailsPromt/CopyButton";
import BookmarkButton from "@/component/detailsPromt/BookmarkButton";
import RatingSection from "@/component/detailsPromt/RatingSection";
import ReviewForm from "@/component/detailsPromt/ReviewForm";
import ReviewList from "@/component/detailsPromt/ReviewList";
import CreatorCard from "@/component/detailsPromt/CreatorCard";
import ReportModal from "@/component/detailsPromt/ReportModal";
import PremiumModal from "@/component/detailsPromt/PremiumModal";
import PromptDetailsSkeleton from "@/component/detailsPromt/PromptDetailsSkeleton";
import { authClient } from "@/lib/auth-client";



export default function PromptDetailsPage({ params }) {
  const { id } = use(params);

  const {data: session} = authClient.useSession()
  const user = session?.user

  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Modals
  const [reportOpen, setReportOpen] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);

  // Current logged in user state mockup
  const [currentUser] = useState({ isPremium: false });

  const fetchPromptDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5500/api/prompt/${id}`);
      if (!res.ok) {
        if (res.status === 404) setNotFound(true);
        throw new Error("Failed to load prompt");
      }
      const result = await res.json();
      if (result.success) {
        setPrompt(result.data);
      }

      // Increment View Count
      fetch(`http://localhost:5500/api/prompt/view/${id}`, { method: "PATCH" }).catch(() => {});
    } catch (err) {
      toast.error(err.message || "Error loading prompt details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchBookmarkStatus = async () => {
  try {
    const res = await fetch(
      `http://localhost:5500/api/bookmark/check?promptId=${id}&email=${user?.email}`
    );

    const data = await res.json();

    console.log(data)

    if (res.ok) {
      setIsBookmarked(data.bookmarked);
    }
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  if (user?.email) {
    fetchBookmarkStatus();
  }
}, [user?.email, id]);


const fetchUserRating = async () => {
  const res = await fetch(
    `http://localhost:5500/api/rating/check?promptId=${id}&email=${user.email}`
  );

  const data = await res.json();

  console.log(data)

  if (res.ok) {
    setUserRating(data.rating);
  }
};

const fetchReviews = async () => {
  try {
    const res = await fetch(
      `http://localhost:5500/api/review/${id}`
    );

    const data = await res.json();

    if (res.ok) {
      setReviews(data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchReviews();
}, [id]);

useEffect(() => {
  if (user?.email) {
    fetchUserRating();
  }
}, [user]);

  useEffect(() => {
    fetchPromptDetails();
  }, [fetchPromptDetails]);

  if (loading) return <PromptDetailsSkeleton />;

  if (notFound || !prompt) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-4">
        <h2 className="text-2xl font-black">404 - Prompt Not Found</h2>
        <p className="text-xs text-slate-400">The prompt you are looking for does not exist.</p>
        <Link
          href="/prompts"
          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-10 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-7xl mx-auto space-y-8 pt-15">
        
        {/* Back Link */}
        <Link
          href={'/allPrompt'}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace 
        </Link>

        {/* Header Hero */}
        <PromptHeader prompt={prompt} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PromptContent description={prompt.description} prompt={prompt} openPremiumModal={() => setPremiumOpen(true)} user={user}/>

            {/* Actions Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <CopyButton
                user={user}
                  prompt={prompt}
                  currentUser={currentUser}
                  onCopySuccess={() =>
                    setPrompt((p) => ({ ...p, copyCount: (p.copyCount || 0) + 1 }))
                  }
                  openPremiumModal={() => setPremiumOpen(true)}
                />
              </div>
              <BookmarkButton
              prompt={prompt}
              user={user}
              userEmail={user?.email}
                promptId={prompt._id || prompt.id}
                isBookmarkedInitial={isBookmarked}
                onBookmarkToggle={(delta) =>{
                  setIsBookmarked((prev) => !prev);
                  setPrompt((p) => ({
                    ...p,
                    bookmarkCount: Math.max(0, (p.bookmarkCount || 0) + delta),
                  }))
                }}
              />
            </div>

            {/* Rating & Review Section */}
            {
              !user?.isPremium && prompt?.isPremium ?
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-6 text-center"> Please Upgrate premium</div> :
              <div>
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-6">
              <div className="flex justify-between items-center">
                <RatingSection
                  promptId={prompt._id}
                  userEmail={user?.email}
                  userName={user?.name}
                  userRating={userRating}
                  onRatingUpdated={()=>{
                      fetchPromptDetails();
                      fetchUserRating();
                  }}
                />
                <button
                  onClick={() => setReportOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold"
                >
                  <Flag className="w-3.5 h-3.5" /> Report
                </button>
              </div>

              <ReviewForm
                promptId={prompt._id}
                userEmail={user?.email}
                userName={user?.name}
                userImage={user?.image}
                userRating={userRating}
                
                onReviewAdded={() => {
                  fetchPromptDetails();
                  fetchReviews();
                }}
              />

              <div className="space-y-3 pt-4 border-t border-slate-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Reviews ({prompt.reviews?.length || 0})
                </h4>
                <ReviewList reviews={reviews} />
              </div>
            </div>
              </div>
            }

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <CreatorCard prompt={prompt} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        promptId={prompt._id}
        userEmail={user?.email}
        userName={user?.name}
      />
      <PremiumModal
        isOpen={premiumOpen}
        onClose={() => setPremiumOpen(false)}
        promptTitle={prompt.title}
      />
    </div>
  );
}