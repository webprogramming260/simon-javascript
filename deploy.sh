mkdir -p ../webprogramming260.github.io/simon-javascript
cp *.{html,css,js} ../webprogramming260.github.io/simon-javascript
cp -r assets ../webprogramming260.github.io/simon-javascript
cd ../webprogramming260.github.io
git add .
git commit -am "updating simon-javascript project"
git push
