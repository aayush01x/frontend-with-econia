
# Check if cloning is enabled
if [ "$TRY_CLONING_TRADINGVIEW" != "1" ]; then
  echo "Skip clone chart module"
  exit 0  # Exit without an error, as it's intentional to skip the clone
fi

# github submodule repo address without https:// prefix
SUBMODULE_GITHUB=github.com/tradingview/charting_library.git

# .gitmodules submodule path
SUBMODULE_PATH=public/static

# github access token is necessary
# add it to Environment Variables on Vercel
if [ "$GITHUB_ACCESS_TOKEN" == "" ]; then
  echo "Error: GITHUB_ACCESS_TOKEN is empty"
  exit 1
fi

# stop execution on error - don't let it build if something goes wrong
set -e