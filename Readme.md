
# LeetCode Friends

This chrome extension allows users to add and displays recent activity of your LeetCode friends.
It works based on the LeetCode GraphQL API to retrieve recent activities of friends.

<details>
  <summary>✨ GUI Preview ✨</summary>

  <div style="display: flex; align-items: center; justify-content: space-between; gap: 30px;">
      <img src="./assets/ViewActivitiesPage.png" alt="Activities" width="400" height="auto" style="border-radius: 6px;">
      <img src="./assets/AddFriendsPage.png" alt="Friends" width="400" height="auto" style="border-radius: 6px;">
  </div>

</details>


<br>

- [Features](#features)
- [Installation & Setup](#installation-and-setup)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation-steps)
- [Preview](#preview)
- [Acknowledgements](#acknowledgements)

## Features

- Add and Remove friends.
- Display recent activity for each of your LeetCode friends.

> [!IMPORTANT]  
> This feature won't work if the user has made their submission history private on leetcode.
>  ![image](./assets/LeetcodeSettings.png)


## Installation and Setup

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine. If not, you can download it from [Node.js official website](https://nodejs.org/).

### Installation Steps

1. Clone the Repository:
```bash
git clone https://github.com/pandfun/LeetCode-Friends.git
```

2. Set Up the Extension on Chrome:
   <br>
   
    - Open Chrome and go to `chrome://extensions`.
    - Enable "Developer mode" (top right corner).
    - Click "Load unpacked" (top left corner).
    - Select the `LeetCode-Friends` folder.

![Installation Photo](./assets/Installation.jpg)


## Preview

<div style="display: flex; align-items: center; justify-content: space-between; gap: 30px;">
   <img src="./assets/ViewActivitiesPage.png" alt="Activities" width="400" height="auto" style="border-radius: 6px;">
   <img src="./assets/AddFriendsPage.png" alt="Friends" width="400" height="auto" style="border-radius: 6px;">
</div>


## Acknowledgements

- [LeetCode](https://leetcode.com/) for providing the problem-solving platform.
- [GraphQL](https://graphql.org/) for providing a flexible query language for APIs.
- [Node.js](https://nodejs.org/) for server-side JavaScript execution.
