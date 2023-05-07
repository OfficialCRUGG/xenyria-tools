export function gameModeName(id: number) {
  switch (id) {
    case 1:
      return "Weapon Test";
    case 6:
      return "Paintzones";
    case 2:
      return "Turf War";
    case 10:
      return "Invasion";
    case 4:
      return "Tower Control";
    case 0:
      return "Tutorial";
    case 5:
      return "Eight Ball";
    case 9:
      return "Clam Attack";
    case 3:
      return "Rainmaker";
    case 8:
      return "Conquest";
    case 7:
      return "Deathmatch";
    default:
      return "Unknown";
  }
}
