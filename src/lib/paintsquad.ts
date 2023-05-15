export function gameModeName(id: number) {
  switch (id) {
    case -1:
      return null;
    case 4:
      return "Paintzones";
    case 0:
      return "Turf War";
    case 8:
      return "Invasion";
    case 2:
      return "Tower Control";
    case 3:
      return "Eight Ball";
    case 7:
      return "Clam Attack";
    case 1:
      return "Rainmaker";
    case 6:
      return "Conquest";
    case 5:
      return "Deathmatch";
    default:
      return "Unknown";
  }
}
