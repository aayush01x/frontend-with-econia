# github submodule repo address without https:// prefix
# github access token is necessary
# add it to Environment Variables on Vercel
if [ "$GITHUB_ACCESS_TOKEN" == "" ]; then
  echo "Error: GITHUB_ACCESS_TOKEN is empty"
  exit 1
fi

# stop execution on error - don't let it build if something goes wrong
set -e

# get submodule commit
output=`git submodule status --recursive` # get submodule info
# no_prefix=${output#*-} # get rid of the prefix
# COMMIT=${no_prefix% *} # get rid of the suffix

# set up an empty temporary work directory
rm -rf tmp || true # remove the tmp folder if exists