
# Check if cloning is enabled
if [ "$TRY_CLONING_TRADINGVIEW" != "1" ]; then
  echo "Skip clone chart module"
  exit 0
fi