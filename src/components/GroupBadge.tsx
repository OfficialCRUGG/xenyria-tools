import { RankCategory, rankCategoryMap } from "xenyria-sdk";

export default function GroupBadge({ category }: { category: RankCategory }) {
  const data = (() => {
    switch (category) {
      case RankCategory.Administration:
        return { color: "bg-red-500", text: "Administration" };
      case RankCategory.Development:
        return { color: "bg-cyan-500", text: "Development" };
      case RankCategory.Building:
        return { color: "bg-green-500", text: "Building" };
      case RankCategory.Moderation:
        return { color: "bg-yellow-500", text: "Moderation" };
      case RankCategory.Design:
        return { color: "bg-cyan-600", text: "Design" };
      case RankCategory.SocialMedia:
        return { color: "bg-red-400", text: "Social Media" };
      case RankCategory.Staff:
        return { color: "bg-orange-500", text: "Staff" };
      case RankCategory.Player:
        return { color: "bg-gray-700", text: "Player" };
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
