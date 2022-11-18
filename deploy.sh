while getopts k:h:a: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        a) assignment=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$assignment" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deploy.sh -k <pem key file> -h <hostname> -a <assignment>\n\n"
    exit 1
fi

printf "\n-------------------------------\nDeploying $assignment to $hostname with $key\n-------------------------------\n"

# Clear out the previous distribution on the target.
ssh -i $key ubuntu@$hostname << ENDSSH
rm -rf public_html/${assignment}
mkdir -p public_html/${assignment}
ENDSSH

# Copy the distribution package to the target.
scp -r -i $key * ubuntu@$hostname:public_html/$assignment
