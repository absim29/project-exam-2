# Project Exam 2

An accommodation booking site called Holidaze. All API functionality is managed by an existing application. This project only covers the front-end application for the API.

There are two aspects to this brief: the customer-facing side of the website where users can book holidays at a venue, and an admin-facing side of the website where users can register and manage venues and bookings at those venues.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [User Stories](#user-stories)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Clone the repository to your local machine:

```bash
git clone https://github.com/absim29/project-exam-2.git
```

### Navigate to the project directory:

```bash
cd project-exam-2
```

### Install dependencies:

```bash
npm install
```

### Start the development server:

```bash
npm start
```

## Usage

Open your browser and go to http://localhost:3000 (or whichever port your app is configured to run). Follow the instructions on the app.

## Tech Stack

- **React**: Frontend library for building the UI.
- **Bootstrap**: For responsive design and styling.
- **Custom Hooks**: (e.g., useUpdate) for managing API interactions.
- **React-Bootstrap**: For UI components such as modal forms.
- **API**: Integrated with a backend API using fetch for data handling.
- **Form Validation**: Custom form validation logic for venue data.

## API Documentation

The API you are using for this project can be found under Holidaze in the [Noroff API documentation](https://docs.noroff.dev/docs/v2/).

## User Stories

- A user may view a list of Venues
- A user may search for a specific Venue
- A user may view a specific Venue page by id
- A user may view a calendar with available dates for a Venue
- A user with a stud.noroff.no email may register as a customer
- A registered customer may create a booking at a Venue
- A registered customer may view their upcoming bookings
- A user with a stud.noroff.no email may register as a Venue manager
- A registered Venue manager may create a Venue
- A registered Venue manager may update a Venue they manage
- A registered Venue manager may delete a Venue they manage
- A registered Venue manager may view bookings for a Venue they manage
- A registered user may login
- A registered user may update their avatar
- A registered user may logout

## Contributing

### Fork the repository.

### Create a new feature branch:

```bash
git checkout -b feature/YourFeature
```

### Commit your changes:

```bash
git commit -m 'Add new feature'
```

### Push the branch:

```bash
git push origin feature/YourFeature
```

### Open a Pull Request.

Once you have pushed your changes, go to the repository on GitHub and open a Pull Request. Make sure to provide a clear description of the changes you made and reference any relevant issues.

## License

This project is licensed under the MIT License.

### Instructions to Use

1. Create a new file named `README.md` in the root of your project directory.
2. Copy and paste the above Markdown content into the `README.md` file.
3. Save the file. You can view it in VSCode or any Markdown viewer.
