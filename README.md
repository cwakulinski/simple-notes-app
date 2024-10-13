# Simple Notes App

The application allows users to create, edit, delete, and search through their notes. The app is built using modern HTML,
CSS, and JavaScript without any external frameworks or libraries.

## Features

- **Create a new note**: Users can add new notes with a title and content.
- **Edit an existing note**: Users can modify the title and content of any previously created note.
- **Delete a note**: Users can remove a note from the list.
- **View a list of notes**: A list of all the created notes is displayed.
- **Search through notes**: Users can filter the list of notes using a search bar. Notes are filtered by matching the
  search query with the title or content.

### Non-persistent data

- Notes are not stored permanently and will not be retained after refreshing the page.

## Installation

To run the project locally, follow these steps:

1. Clone repository
```git clone https://github.com/cwakulinski/simple-notes-app.git```

2. Get into the project dir
```cd simple-notes-app```

3. Install dependencies
```yarn install```

4. Run local dev server
```yarn dev```
5. The browser should automatically open at ```http://localhost:8080/```

## Build

To build the project run ``yarn dist``. You will find built output in the ```dist``` dir

## Browser Compatibility

The app is built using modern web technologies and should work on all modern browsers that support ES6, Flexbox, and CSS Grid