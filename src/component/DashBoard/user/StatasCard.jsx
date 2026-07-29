// STAT CARD COMPONENT
function StatasCard({ label, value, icon: Icon, iconColor, borderColor }) {
  return (
    <div
      className={`p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl ${borderColor} transition-all duration-300 shadow-xl flex items-center justify-between`}
    >
      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="text-2xl font-black text-white mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}