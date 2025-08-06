# Hetzner VPS Practice

## Learnings

1. Creating simple express server
2. Creating Dockerfile to build app container
3. Creating docker-compose.yml to build app and nginx reverse proxy
4. Setting up nginx proxy settings and pointing to file in compose file
5. Installing Docker and docker compose on VPS
6. Cloning git repository and running using docker compose
7. Creating an A Record to point vps.rajsdhillon.com to my VPS hosted on Hetzner
8. Created specific nginx server block, including server name to allow multiple servers in future, and not redirect everything to the app
9. Removed VPS wide nginx, opting to instead serve https certificate at the container level
