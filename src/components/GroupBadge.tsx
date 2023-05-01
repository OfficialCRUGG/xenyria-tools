export default function GroupBadge({ group }: { group: string }) {
  const data = (() => {
    switch (group) {
      case "admin":
        return { color: "bg-red-500", text: "Admin" };
      case "dev":
        return { color: "bg-cyan-500", text: "Dev" };
      case "bauleitung":
      case "architektmeister":
      case "architekt":
      case "architektenlehrling":
        return { color: "bg-green-500", text: "Builder" };
      case "modleitung":
      case "mod":
      case "moderatorlehrling":
        return { color: "bg-yellow-500", text: "Mod" };
      case "designer":
        return { color: "bg-cyan-600", text: "Designer" };
      case "Social-Media-Manager":
        return { color: "bg-red-400", text: "Social Media" };
      case "teammitglied":
        return { color: "bg-gray-400", text: "Team" };
      case "Helper":
        return { color: "bg-orange-400", text: "Helper" };
      case "Premium":
        return { color: "bg-cyan-400", text: "Premium" };
      default:
        return { color: "bg-gray-700", text: "Player" };
    }
  })();

  return (
    <div
      className={`w-full text-center ${data.color} rounded-lg text-xl font-semibold py-2`}
    >
      {data.text}
    </div>
  );
}
