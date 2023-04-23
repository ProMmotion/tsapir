arg=$1

if [[ -n $arg && "$arg" != "p" && "$arg" != "mi" && "$arg" != "ma" ]]
then
    echo "Error: Given parameter not recognized"
    exit 0
fi

if [[ -d 'lib' ]]
then
    rm -rf lib
fi
npm run build
tar czf ./lib/base-project.tar.gz -C ./lib/base-project .
rm -rf lib/base-project

cp -r ./src/commands/*.sh ./lib/commands/

filename='package.json'
while read line; do
    if [[ $line == \"version\":* ]]
    then
        old=$(echo $line | cut -d ':' -f 2 | tr ',' ' ' | xargs)
        echo "Current version: $old"
        num=(${old//./ })
        if [[ "$arg" == "p" ]]
        then
            num[2]=$((${num[2]}+1))
        elif [[ "$arg" == "mi" ]]
        then
            num[2]=0
            num[1]=$((${num[1]}+1))
        else
            num[2]=0
            num[1]=0
            num[0]=$((${num[0]}+1))
        fi
        new="${num[0]}.${num[1]}.${num[2]}"
        break
    fi

done < $filename

if [[ -z $old || "$old" == "" ]]
then
    echo "Error: Couldn't get version"
    exit 0
fi
if [[ -z $new || "$new" == "" ]]
then
    echo "Error: Couldn't generate version"
    exit 0
fi

echo "New version: $new"
sed -i "s/$old/$new/gi" $filename
npm publish