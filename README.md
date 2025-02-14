# rc
**R**emote **C**ontrol, a simple computer management tool. Requires access to a ssh reverse proxy service like [fwd](https://rockz-one.github.io/fwd-docs/), or [one you set up yourself]()

### Features
- [x] Easy sudoless client install and setup
- [x] ssh-accessile cmd line with native user as $USER
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

# References
- [Vercel pkg](https://github.com/vercel/pkg) package up an exectuable