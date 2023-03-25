# userbot-track

Uses discord user (discord.js-selfbot-v13)[https://github.com/aiko-chan-ai/discord.js-selfbot-v13] to log into users account.

`TOKEN` in the .env stands for discord login token, taken from the browser. Instructions how to get it should be in the self-bot repo.
You'll also need
```
SUPABASE_BASE_LINK
SUPABASE_ADMIN_HASH
```

which are self explanatory

Using Tsx for dev to run typescript
https://www.npmjs.com/package/tsx


Since it's an userbot, things like render or railway aren't too keen to host it. 
So i ended up having to get a VPS and run the code in there. 
Build it with `yarn build` and then r-sync the output into your VPS.
Then on the VPS i use (pm2)[https://pm2.keymetrics.io/] to handle its process
