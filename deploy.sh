rm -rf ../webprogramming260.github.io/simon-javascript
mkdir -p ../webprogramming260.github.io/simon-javascript
cp *.{html,css,js,ico} ../webprogramming260.github.io/simon-javascript
cp -r assets ../webprogramming260.github.io/simon-javascript
cd ../webprogramming260.github.io
git add .
git commit -am "deploying simon-javascript project"
git push
