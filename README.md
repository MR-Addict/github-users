# Github Users

## 1. What's it for?

This project help you manage your github followers. It can help find:

- Who're your followers
- Who you're following
- Who you're following but not your followers
- Whos're your followers but you're not following

## 2. How to Deploy yourself

Add `.env` file:

```env
LOGIN_USERNAME="login_username"
LOGIN_PASSWORD="login_password"
GITHUB_TOKEN="create_a_github_token"
NEXTAUTH_SECRET="create_a_nextauth_secret"
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
> You need to add username and password for protection as well as your github token for managing.
>
> next auth secret and net auth url are for deploying, you can use any characters as secrets and url you will deploy on, such as http://localhost:3000/

## 3. Available Links

- [https://github.mraddict.vercel.app](https://github.mraddict.vercel.app)
