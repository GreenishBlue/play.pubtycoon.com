17/06/19
Goals
Setup Development Environment
CI
Domain play.pubtycoon.com (identity proxy for access auth)
Get three.js setup on some page
Start Writing
Ideas
New Design Docs
This Document
Salvage Old Work
Convert Models/Textures/Audio to web friendly formats (investigate them)
Investigate Web APIS

18/07/19
Today I want to get something onto the screen (a 2d plane)
I want to add camera controls for rotating the screen around this plane
I also want to make some initial UI
Need to look at having a stable game loop (proper deltas and stuff)
.. pretty much done

next: need to setup custom ui-root component so that it can communicate
with game
- command pattern (eventually)
- fsm
- mvc

Let's build a demo. This will involve a whole bunch of systems.
ViewController is arguably the custom element.
Inputs come from there, interact with "backend" systems and outputs are
streamed back based on that.