export type Tone = 'accent' | 'success' | 'warning' | 'error' | 'primary' | 'muted';

export const toneBg: Record<Tone, string> = {
  accent: 'bg-accent/15 text-accent',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  error: 'bg-error/15 text-error',
  primary: 'bg-primary/15 text-primary',
  muted: 'bg-muted/15 text-muted',
};

export const toneBgSolid: Record<Tone, string> = {
  accent: 'bg-accent text-white',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  error: 'bg-error text-white',
  primary: 'bg-primary text-white',
  muted: 'bg-muted text-white',
};

export const toneBorder: Record<Tone, string> = {
  accent: 'border-accent',
  success: 'border-success',
  warning: 'border-warning',
  error: 'border-error',
  primary: 'border-primary',
  muted: 'border-muted',
};

export const Badge = ({
  tone = 'muted',
  children,
  className = '',
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] ${toneBg[tone]} ${className}`}
  >
    {children}
  </span>
);

export const Button = ({
  tone = 'accent',
  variant = 'solid',
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: Tone;
  variant?: 'solid' | 'outline';
}) => {
  const base =
    'inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition disabled:opacity-50';
  const styles =
    variant === 'solid'
      ? `${toneBgSolid[tone]} hover:opacity-90 shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]`
      : `border border-line bg-white text-heading hover:bg-${tone}/10 hover:${toneBorder[tone]}`;
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const VEHICLE_CATEGORY_LABEL: Record<string, string> = {
  entry: 'City Car',
  midrange: 'MPV',
  premium: 'SUV & Premium',
  luxury: 'Luxury',
  group: 'Group',
};

export const VEHICLE_CATEGORY_TONE: Record<string, Tone> = {
  entry: 'success',
  midrange: 'accent',
  premium: 'primary',
  luxury: 'warning',
  group: 'error',
};

export const ACTIVE_TONE: Tone = 'success';
export const INACTIVE_TONE: Tone = 'muted';