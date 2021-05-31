import sharp from "sharp"
import path from "path"
import fs from "fs"

export default function () {

    let quality

    if (process.argv.length < 3) {
        console.log("Using default quality: 70")
        quality = 70
    }
    else {
        quality = +process.argv[2]
    }


    const maxDimension = 2560

    const files = fs.readdirSync(".").filter(file => fs.statSync(file).isFile())

    files.forEach(file => {
        console.log(`Converting ${file}`)
        sharp(file)
            .resize(maxDimension, maxDimension, { fit: "inside", withoutEnlargement: true })
            .webp({ quality })
            .toFile(path.basename(file, path.extname(file)) + ".webp")
    })
}