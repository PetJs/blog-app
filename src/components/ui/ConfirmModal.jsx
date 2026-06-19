const ConfirmModal = ({ title, message, confirmLabel = "CONFIRM", onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-[var(--on-primary)] border border-[var(--primary)] w-full max-w-sm mx-4">
        {/* Header */}
        <div className="border-b border-[var(--primary)] px-6 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--on-surface-variant)]">
            SYSTEM_PROMPT
          </p>
          <h3 className="text-lg font-black uppercase tracking-tight mt-1">{title}</h3>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="border-t border-[var(--primary)] flex">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-xs font-bold uppercase tracking-widest border-0 border-r border-[var(--primary)] bg-transparent hover:bg-[var(--surface-container)]"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 text-xs font-bold uppercase tracking-widest border-0 bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-80"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
