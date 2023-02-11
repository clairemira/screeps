# Creates the distributable directory if doesn't already exist 
mkdir -p ./dist

# Finds .js files in the ./src directory then flattens and renames them into the ./dist directory
for file in $(find ./src -type f -name "*.js")
do
    absolute=${file//.\/src\//}
    fileName=${absolute//\//.}
    cp -rf "$file" "./dist/$fileName"
done
