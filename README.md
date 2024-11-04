# Bouldering Assistant for the Visually Impaired

A digital assistant designed to support blind and visually impaired individuals in bouldering. This tool provides real-time, audio-based guidance on body positioning, helping users navigate climbing walls with greater accuracy and safety.

## Features

- **Stickman Overlay**: Use a stickman figure to track the climber's position. Align the stickman with the climber's body in the camera feed, then confirm the position to record movement.
- **Climber's Height Input**: Input the climber's height to allow accurate calculations for distances between hand and foot placements. This helps the assistant calculate relative distances for each limb’s movement based on the climber's proportions.
- **Real-Time Audio Feedback**: After confirming each position, the assistant provides audio guidance through headphones, indicating which limb to move and the direction and distance based on the previous position.
- **Adjustable Climbing Height**: Set and adjust the climber's current height on the wall at any time during the session.
- **Session Management**: Start, end, and reset sessions easily. Each session is independent, allowing for tracking and guidance on a per-climb basis.
- **Timer Function**: A built-in timer tracks the session duration, providing feedback on time spent on each route.

## Technical Details

This application is hosted on a **Raspberry Pi** running a **Node.js Express server**, making it lightweight and portable for on-site use in climbing gyms or bouldering areas.

## How It Works

1. **Setup**: Power on the Raspberry Pi and start the server. Ensure the camera is positioned to capture the climber.
2. **Enter Climber's Height**: Input the climber’s height, which will be used for accurate distance measurements in subsequent positioning.
3. **Position the Stickman**: Align the stickman figure with the climber’s position on the camera feed. This setup will serve as a reference for tracking movements.
4. **Confirm Position and Receive Audio Feedback**: Once the stickman’s position is confirmed, the assistant provides audio cues via headphones, indicating how far and in which direction each limb should move based on previous confirmed positions.
5. **Adjust Climbing Height**: Track and adjust the climber’s height on the wall as they progress.
6. **End or Reset Session**: End the session at any time, or reset to start a new session.
