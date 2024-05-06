import SyntaxHighlighter from "react-syntax-highlighter"
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose the style you prefer

const theme = vscDarkPlus

const installNginx = `apt install nginx -y
systemctl enable nginx
systemctl start nginx
`;

const ConfigureNginx = `cd /etc/nginx/conf.d/
vi backend.conf
`;

const NginXConfig = `server {
  server_name www.example.com;
  return 301 $scheme://example.com$request_uri;
}


server {
  listen 80;
  listen [::]:80;

  server_name example.com;

  location / {
    proxy_pass http://localhost:4000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
  }
}
`;



const setupFirewall = `ufw default deny incoming
ufw default allow outgoing
ufw allow 'Nginx Full'
ufw allow 'OpenSSH'
ufw enable
`;

const setupUserForGithub = `adduser github
# remove password
passwd -d github
# become github user and generate ssh key
su github
ssh-keygen -t ed25519 # Note: did not added password
# add public key to authorized keys
cat id_ed25519.pub >> ~/.ssh/authorized_keys
`;

const setupUserForSystem = `adduser --system --no-create-home --shell /usr/sbin/nologin server
groupadd server
chown -R server:server /opt/backend
usermod -aG server github 
chmod -R g+w /opt/backend
chmod g+s /opt/backend
`;


const systemctlService = `vi /etc/systemd/system/backend-server.service`;
const systemctlConf = `[Unit]
Description=backend-server

[Service]
Restart=always
RestartSec=3
Environment=PORT=4000
ExecStart=/opt/backend/backend

StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=backend-server
`;

const reloadSystemctl = `systemctl daemon-reload
systemctl enable backend-server
systemctl start backend-server
`;

const allowToRestart = `sudo visudos
github ALL=(ALL) NOPASSWD: /bin/systemctl restart backend-server
`;


const installPostgres = `sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg
sudo apt update
sudo apt install postgresql-16 postgresql-contrib-16
sudo systemctl start postgresql
sudo systemctl enable postgresql

create database backend-db;
ALTER USER postgres PASSWORD 'postgres';
`;


const installGOMigrate = `curl -LO https://github.com/golang-migrate/migrate/releases/download/v4.17.1/migrate.linux-amd64.deb
dpkg -i migrate.linux-amd64.deb
`;



const deployGOBackend = `name: Deploy to server
run-name: \${{ github.actor }} is deploying to server 🚀

on: 
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Go
        uses: actions/setup-go@v3
        with:
          go-version: stable
        
      - name: Install dependencies
        run: |
          go get
      - name: Build
        run: go build -v -o bin/backend 

      - name: Install SSH Key
        uses: shimataro/ssh-key-action@v2
        with:
          key: \${{ secrets.SSH_PRIVATE_KEY }} 
          known_hosts: 'just-a-placeholder-so-we-dont-get-errors'

      - name: Adding Known Hosts
        run: ssh-keyscan -H \${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Copy source with rsync
        run: rsync -avz ./bin/backend \${{ secrets.SSH_USER }}@\${{ secrets.SSH_HOST }}:/opt/backend/

      - name: Copy ui with rsync
        run: rsync -avz ./ui \${{ secrets.SSH_USER }}@\${{ secrets.SSH_HOST }}:/opt/backend/
      
      - name: Restart systemctl
        run: ssh \${{ secrets.SSH_USER }}@\${{ secrets.SSH_HOST }} "sudo systemctl restart backend-server"
`;


const runMigrations = `name: Run migrations

on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Install SSH Key
        uses: shimataro/ssh-key-action@v2
        with:
          key: \${{ secrets.SSH_PRIVATE_KEY }} 
          known_hosts: 'just-a-placeholder-so-we-dont-get-errors'

      - name: Adding Known Hosts
        run: ssh-keyscan -H \${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Copy migrations with rsync
        run: rsync -avz ./migrations \${{ secrets.SSH_USER }}@\${{ secrets.SSH_HOST }}:/opt/backend/
    
      - name: Run migrations on remote server
        run: ssh \${{ secrets.SSH_USER }}@\${{ secrets.SSH_HOST }} "migrate -path /opt/backend/migrations -database "postgres://\${{ secrets.DB_USER }}:\${{ secrets.DB_PASSWORD }}@localhost:5432/backend-db?sslmode=disable" up"`;


export const PoorManCICD = () => {

  return (
    <div className="text-neutral-300 flex flex-col items-center bg-gray-950">
      <h1>Poor Man's CI/CD</h1>

      <div className="p-5 mt-20 w-full max-w-[824px]">
        <p className="text-sm font-light">
          When starting yet another side project. Quite often first thing thats needs to be solved is where to host it.
          And when it comes to hosting we often ask "How do I deploy".
        </p>

        <p className="mt-10 text-sm font-light">
          Im going to show how one can deply in this case GO on VPS using GitHub actions. 
        </p>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Things we use</h1>
        <ul className='px-6 mt-3'>
          <li className='text-sm list-disc'>VPS (I like hetzner)</li>
          <li className='text-sm list-disc'>Go</li>
          <li className='text-sm list-disc'>Postgres 16</li>
          <li className='text-sm list-disc'>github actions</li>
          <li className='text-sm list-disc'>ubuntu</li>
        </ul>
      </div>

      <div className="p-5 mt-20 w-full max-w-[824px]">
        <h1 className="text-3xl font-bold">Setup VPS</h1>
      </div>

      <div className="p-5 mt-5 w-full max-w-[824px]">
        <p className="text-sm font-light">
            In here I assume you have access to your server (VPS)
        </p>
      </div>


      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Install nginx</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {installNginx}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Configure nginx to serve go backend</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {ConfigureNginx}
        </SyntaxHighlighter>
      </div>
      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {NginXConfig}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Setup firewall</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {setupFirewall}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Setup user for github</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {setupUserForGithub}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Setup user for running server</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {setupUserForSystem}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Setup systemctl service</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {systemctlService}
        </SyntaxHighlighter>
      </div>
      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {systemctlConf}s
        </SyntaxHighlighter>
      </div>
      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {reloadSystemctl}
        </SyntaxHighlighter>
      </div>


      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Allow github user to restart backend-server</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {allowToRestart}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Install Postgres 16</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {installPostgres}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Install Golang-migrate 16</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {installGOMigrate}
        </SyntaxHighlighter>
      </div>

      <div className="p-5 mt-20 w-full max-w-[824px]">
        <h1 className="text-3xl font-bold">Setup Github</h1>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Add secrets</h1>
        <ul className='px-6 mt-3'>
          <li className='text-sm list-disc'>DB_PASSWORD = postgres</li>
          <li className='text-sm list-disc'>DB_USER = postgres</li>
          <li className='text-sm list-disc'>SSH_HOST = {'<your server ip>'}</li>
          <li className='text-sm list-disc'>SSH_PRIVATE_KEY = {'<copy the private key from user github>'}</li>
          <li className='text-sm list-disc'>SSH_USER = github</li>
        </ul>
      </div>


      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Deploy go backend action</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {deployGOBackend}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Run migrations action</h1>
      </div>

      <div className="px-5 w-full max-w-[824px] mb-20">
        <SyntaxHighlighter className="rounded-xl" language="shell" style={theme}>
          {runMigrations}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}