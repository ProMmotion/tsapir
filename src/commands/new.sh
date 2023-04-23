origin=$(dirname -- $0)
name=$1
cwd=$(pwd)

echo Starting to create $name app !

if [[ ! -d "./$name" ]]
then
    mkdir "./$name"
fi

tar -xzf "$origin/../base-project.tar.gz" -C "./$name" --force-local

if [[ -f "./$name/package.json" ]]
then
    tsapirV=$(npm view tsapir version)

    sed -i "s/##project_name##/$name/" "./$name/package.json"
    sed -i "s/##tsapir_version##/$tsapirV/" "./$name/package.json"

    echo $name successfuly created !

    cd $name && npm i

    echo Successfuly installed npm packages

    git init
fi