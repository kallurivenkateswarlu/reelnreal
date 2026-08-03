git clone git@github.com:your-username/reelnreal.git
cd reelnreal
git checkout -b fix/content-cleanup
# make edits (or copy site-content.cleaned.json -> site-content.json)
git add site-content.json
git commit -m "Remove images, add media placeholders, add language labels"
git push origin fix/content-cleanup
