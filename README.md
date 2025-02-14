# rc
**R**emote **C**ontrol, a simple computer management tool. Requires access to an ssh reverse proxy service like [fwd](https://rockz-one.github.io/fwd-docs/), or one you set up yourself like [haproxy](https://github.com/haproxy/haproxy) or [frp](https://github.com/fatedier/frp) (never tried either though)

CLIENT --- fwd --> SERVER <-- https -- UI

1. UI requests username & pass to SERVER, server gives secret authcode
2. client needs authcode to accept ssh connection and api requests (so the browser is actually interacting directly with the client, the server just provides the secret authcode, serves the UI, and offers insight into the overall connections)
3. auth header is required for all dashboard interactions (websockets and api requests)
4. server has unique key that 

### Features
- [x] Easy sudoless client install and setup
- [x] ssh as native user on machine
- [ ] Unique domain per client assigned by server
- [ ] Streamlined UI
    - [ ] See all up status and details of all clients
    - [ ] See extended stats about clients like uptime and cpu usage
    - [ ] In browser command line to any machine
    - [ ] Issue single commands to many machines at once
    - [ ] Switch on and off ssh
    - [ ] Issue clean-up to remove client from a machine immediatly or by next boot
    - [ ] Notifications for when a client comes online

# Builds
- node v20.9 dind't work for any packaging tool (sea, ncc, pkg, nexe). Had to switch to node 18. used `npm install -g n`, `n 18.0`, read it works well mostly on mac
- Had to downgrade to `"node-pty": "0.10.1"` to avoid 
```bash
Error: posix_spawnp failed.
```

# Inpiration
- Use [webssh2](https://github.com/billchurch/webssh2/) is inpiration to wrap an ssh client with websockets. We'll forward the client using a reverse proxy so we'll get the http stuff too. Basically we're making ssh over https. Wait... why dont we just wrap the shell directly in websockets? yeah lets just do that, [socket.js](https://github.com/billchurch/webssh2/blob/9c0ba04b31e92b7ed20e5c3509b5cbcc5447f565/app/server/socket.js#L105) contains the wrapper logic

# References
- [Vercel pkg](https://github.com/vercel/pkg) package up an exectuable