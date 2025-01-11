
# LeetCode Friends

This chrome extension allows users to add and displays recent activity of your LeetCode friends.
It works based on the LeetCode GraphQL API to retrieve recent activities of friends.

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


## GUI

![image](./assets/AddFriendsPage.png)

![image](./assets/ViewActivitiesPage.png)


## Acknowledgements

- [LeetCode](https://leetcode.com/) for providing the problem-solving platform.
- [GraphQL](https://graphql.org/) for providing a flexible query language for APIs.
- [Node.js](https://nodejs.org/) for server-side JavaScript execution.
