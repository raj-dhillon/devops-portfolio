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
10. Mounted certs from host machine to container, redirecting non-secure traffic to https
11. Removed exposed app port, only allowing nginx to allow traffic
12. Potential improvement: Need to add post renewal hook script to reload nginx container
13. Created SSH key pair for repo github actions
14. Created github actions workflow to checkout repo, ssh into vps, pull repo, and replace running container with changes
