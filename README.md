# E-Bike Renting System - User Web Client

🚴‍♂️ Readers Beware: This is a school project 🚴‍♀️

Welcome to the user web client for our e-bike renting system, part of our exhilarating school project.

## Quick Links

### App Running Live

 Get a feel for the apps features, functionality, and user interface:

- **Live Demo**: Visit [Lenticode](https://vteam-user.lenticode.com/) to see the application live.

**Important Note**: To visit all the pages, you'll need to login using your GitHub account.

### Root Repository

For a comprehensive view of all our related projects and to access the entire collection of repositories, please visit our root repository:

- **VTeam Root Repository**: [p0ntan/vteam-root](https://github.com/p0ntan/vteam-root)

This root repository serves as the central hub for our projects, providing links and information to all associated repositories.

Here you will find instructions on how to set up and run all repositories on your local machine.

---
## Custom Setup Instructions

While we recommend using our [root repository](https://github.com/p0ntan/vteam-root) for a smoother ride, you may choose to set up this repository directly, especially if you're planning to adapt the code. So, if you're feeling adventurous and want to ditch the training wheels, follow the steps below.

### REST API Configuration

The app interfaces with a REST API connected to a backend server and database.

1. If not already done, create or copy the `.env.example` file to `.env`.
2. Set `PUBLIC_REST_API_URL` to the server's URL.
3. The server URL is no secret and is provided in the `.env.example` file.
4. Server code can be found at [JuliaLind/vteam-server](https://github.com/JuliaLind/vteam-server).

### GitHub OAuth App Setup

To test the app locally, you need to create your own GitHub OAuth App for authentication (unless you remove the auth check or come up with another solution):

1. Go to your GitHub account settings, navigate to 'Developer settings' > 'OAuth Apps' and click 'New OAuth App'.
2. In the 'Application name' field, enter a name for your app.
3. Set the 'Homepage URL' to `http://localhost:5173`.
4. For 'Authorization callback URL', enter `http://localhost:5173/callback`.
5. Once created, note down the 'Client ID' and 'Client Secret'.
6. Add these credentials to your `.env` file as `PUBLIC_GITHUB_ID` and `GITHUB_SECRET`.

For a more detailed guide on setting up the GitHub OAuth App, check out [this tutorial](https://github.com/kiwijos/vteam-github-oauth-study) by yours truly.

### Local Development

Once you've created a project and installed the dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# Optionally, to open the app in a new browser tab:
npm run dev -- --open
```

### Building for Production

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Docker Deployment

To build a production version of the app and run it inside a container:

```bash
docker compose up --build
```

> The app uses the node-adapter by default. You may need to install a different [adapter](https://kit.svelte.dev/docs/adapters) for your target environment and change the app settings accordingly.
