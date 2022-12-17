#!/bin/bash

while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployFiles.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

hostname=$service.$hostname

printf "\n-------------------------------\nDeploying files for $service to $hostname with $key\n-------------------------------\n"

# Step 1
printf "\n----> Clear out the previous distribution on the target.\n"
ssh -i $key ubuntu@$hostname << ENDSSH
rm -rf public_html/${service}
mkdir -p public_html/${service}
ENDSSH

# Step 2
printf "\n----> Copy the distribution package to the target.\n"
scp -r -i $key * ubuntu@$hostname:public_html/$service

# Step 3
printf "\n----> Deploy the service on the target\n"
ssh -i $key ubuntu@$hostname << ENDSSH
if cat /etc/caddy/Caddyfile | grep -q ${hostname}; then
  printf "\n-------------------------------\nUpdating existing service\n-------------------------------\n"
else
  printf "\n-------------------------------\nInstalling new service\n-------------------------------\n"
  sudo sh -c 'printf "\n\n${hostname} {\n\troot * /usr/share/caddy/${service}\n\tfile_server\n}\n" >> Caddyfile'
  sudo service caddy restart
fi
ENDSSH