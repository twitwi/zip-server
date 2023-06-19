

~~~bash

pnpm install

rm -rf dist/
mkdir dist
pnpm build
rm -f dist/*.zip

@send-to-dl-dir-with-delete dist zipserve



A=......
echo "https://........./zipserve/#${A/https:/cors:}"

~~~
