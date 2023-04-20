# Github Users

## 1. What's it for?

This project help you manage your github followers. It can help manage:

- Who're your followers
- Who you're following
- Who you're following but not your followers
- Whos're your followers but you're not following

## 2. How to Deploy yourself

Add `.env` file:

```env
GITHUB_CLIENTID="create_a_github_oauth_app_clientid"
GITHUB_SECRET="create_a_github_oauth_app_screat"
NEXTAUTH_SECRET="create_a_next_auth_secret"
NEXTAUTH_URL="https://your.website.domain.com/"
```

Build project:

```bash
npm run build
```

Start project:

```bash
npm start
```

> Good to know:
>
> You need to create a github oauth app for managing which includes github clientid and secret. You can find information [here](https://docs.github.com/apps/building-oauth-apps/creating-an-oauth-app) about how to create a github oauth app.
>
> Next auth secret and url are for deploying. You can use any characters as secrets and url you deploy on. For example http://localhost:3000/ if you build and test locally.

## 3. Available Links

- [https://github.mraddict.vercel.app](https://github.mraddict.vercel.app)
