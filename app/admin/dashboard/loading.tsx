export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-3 border-accent border-t-transparent" />
        <p className="text-muted text-sm">Memuat...</p>
      </div>
    </div>
  );
}