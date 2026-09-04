const styles = {
  AVAILABLE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  RESERVED: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  SOLD: "bg-red-500/15 text-red-400 border-red-500/30",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block px-3 py-1 text-[10px] tracking-widest2 uppercase font-semibold border ${
      styles[status] || styles.AVAILABLE
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
