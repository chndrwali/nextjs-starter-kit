import { toast } from "sonner";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastContent = ({
  t,
  type,
  message,
}: {
  t: string | number;
  type: "success" | "error" | "warning" | "info";
  message: string;
}) => {
  const styles = {
    success:
      "border-green-500/50 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)] text-green-500",
    error:
      "border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)] text-red-500",
    warning:
      "border-yellow-500/50 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.3)] text-yellow-500",
    info: "border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)] text-cyan-500",
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  return (
    <div
      className={cn(
        "relative flex min-w-[300px] items-center gap-3 overflow-hidden rounded-lg border p-4 backdrop-blur-xl transition-all duration-300 md:min-w-[350px]",
        // Base background for all (dark glass)
        "bg-background/80",
        styles[type],
      )}
    >
      {/* Icon */}
      <div className="shrink-0">{icons[type]}</div>

      {/* Message */}
      <div className="flex-1 text-sm font-medium text-foreground">
        {message}
      </div>

      {/* Close Button */}
      <button
        onClick={() => toast.dismiss(t)}
        className="group relative ml-auto flex h-6 w-6 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Glow Effect / Scanline (optional, kept simple for now) */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
    </div>
  );
};

type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

interface ToastOptions {
  position?: Position;
}

export const appToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.custom(
      (t) => <ToastContent t={t} type="success" message={message} />,
      { position: options?.position || "top-center" },
    ),
  error: (message: string, options?: ToastOptions) =>
    toast.custom((t) => <ToastContent t={t} type="error" message={message} />, {
      position: options?.position || "top-center",
    }),
  warning: (message: string, options?: ToastOptions) =>
    toast.custom(
      (t) => <ToastContent t={t} type="warning" message={message} />,
      { position: options?.position || "top-center" },
    ),
  info: (message: string, options?: ToastOptions) =>
    toast.custom((t) => <ToastContent t={t} type="info" message={message} />, {
      position: options?.position || "top-center",
    }),
};
