if [ $1 = "dev" ]; then
  s3_url="s3://dev.admin.capiorder.com"
  dist_id="E1190R7BWDCTY8"
elif [ $1 = "staging" ];then
  s3_url="s3://stg.admin.capiorder.com"
  dist_id="E2RW8CVHLL97ZA"
elif [ $1 = "prod" ];then
  s3_url="s3://admin.capiorder.com"
  dist_id="E1M0V5LHEP6CSS"
else
  echo "💢 Wrong environment!\n\n"
  exit 1
fi

echo "--- 🧰 Install ---"
yarn

echo "\n\n--- 🛠️ Build ---"
rm -rf build
env-cmd -e $1 yarn build

echo "\n\n--- 👷 Deploy ---"
echo $s3_url

aws s3 sync build/ $s3_url
aws cloudfront create-invalidation --distribution-id $dist_id --paths "/*" --no-cli-pager
