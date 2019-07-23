Layers:
Foundations (raw room placement & construction, including painting the walls!)
Objects/Decorations (virtual placement space within the rooms)

Foundations layer:
Constraints:
- Rooms are rectangular
- Walls are tacked onto the end
- On grid 20x20
UI:
- Build menu, room build/destroy (whole rooms and everything inside at once) tool
- Later: Texture/material/colour
Data structure:
- Map structure from room ID to all its inners
- 2D array for current room placements
- 2D array for current highlight
Algorithms
- Check if array overlay is valid (highlight compared to already placed) - bitwise?
- Raycast system - some kind of proxy - Raycast to world grid to virtual grid
Notes:
- possibly don't handle walls at this level, do it one layer up on the object layer?
- Outline calculation for wall rendering and internal grid generation? Or some other method.

Object layer:
Structures:
- Map from object to positions
Algorithms:
- Algo to check if space free