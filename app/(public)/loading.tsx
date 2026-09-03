export default function PublicLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-accent border-t-transparent" />
        <p className="text-muted text-sm">Memuat halaman...</p>
      </div>
    </div>
  );
}