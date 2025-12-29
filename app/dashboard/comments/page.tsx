export default function CommentsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-8">评论审核 <span className="text-[var(--text-muted)] text-xl">// COMMENTS</span></h1>
      <div className="bg-[var(--bg-panel)] border border-[rgba(255,255,255,0.05)] p-8 text-center text-[var(--text-muted)]">
        No pending comments.
      </div>
    </div>
  );
}
