// Keep websockets connection alive to indicate health
// Create host key if not already obtained

const os               = require('os')
const { Server }       = require('ssh2')
const { readFileSync } = require('fs')
const path             = require("path")
const fs               = require("fs")


// 1. create a public & private key where installed if not present
// 2. connect to websockets server to give constant fwd status if no connection quit
// 3. launch ssh server capable of terminal
// 4. connect to fwd server to forward ssh connection to the internet -> consider toggling open/closed to the internet, possibly even the whole server

const pty = require('node-pty') 

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// SSH Server Configuration
const sshServer = new Server({
    hostKeys: [readFileSync("key")], // Generate a host key if you don't have one
  },
  (client) => {
    console.log("Client connected!");

    client.on("authentication", (ctx) => {
        ctx.accept()
    })

    client.on("session", (accept, reject) => {
      const session = accept();
      session.once('shell', async (acceptTerminal, rejectTerminal, shellinfo) => {
        const stream = acceptTerminal()
        const ptyProcess = pty.spawn(shell, [], {
            name: 'xterm-color',
            cols: 80,
            rows: 30,
            cwd: process.env.HOME,
            env: process.env,
        });
    
        if (stream){
            console.log('shell worked')

            // Send data from the shell to the client
            ptyProcess.on("data", (data) => {
                stream.write(data);
            });

            ptyProcess.on("exit", (data) => {
                console.log('exiting')
                stream.end()
            });

            // Send input from the client to the shell
            stream.on("data", (data) => {
                ptyProcess.write(data);
            });

            // Handle terminal resize
            stream.on("window-change", (info) => {
                console.log("resize", info)
                ptyProcess.resize(info.cols, info.rows);
            });

            // Handle session close
            stream.on("close", () => {
                ptyProcess.kill();
                stream.end()
            });
        }
      })
      session.once("pty", (accept, reject, info) => {
        // let ptyhandler = accept()
        // console.log('pty worked')
        // console.log(info)
        // ptyhandler.on("window-change", (info) => {
        //   console.log("resize", info)
        // });
        // console.log('pty attempted')
        // const ptyProcess = pty.spawn("bash", [], {
        //   name: info.term,
        //   cols: info.cols,
        //   rows: info.rows,
        //   cwd: process.env.HOME,
        //   env: process.env,
        // });

        // const stream = accept();
        // if (stream){
        //     console.log('pty worked')

        //     // Send data from the shell to the client
        //     ptyProcess.on("data", (data) => {
        //         stream.write(data);
        //     });

        //     // Send input from the client to the shell
        //     stream.on("data", (data) => {
        //         ptyProcess.write(data);
        //     });

        //     // Handle terminal resize
        //     stream.on("window-change", (info) => {
        //         ptyProcess.resize(info.cols, info.rows);
        //     });

        //     // Handle session close
        //     stream.on("close", () => {
        //         ptyProcess.kill();
        //     });
        // }
      });
    });

    client.on("end", () => {
      console.log("Client disconnected.");
    });
  }
);

// Start the SSH server
sshServer.listen(4242, () => {
  console.log("SSH server listening on port 4242");
});
