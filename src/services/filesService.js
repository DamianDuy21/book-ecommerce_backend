const path = require("path")
const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname, `../public/images/avatar`)
    //get the .jpg
    let extName = path.extname(fileObject.name)

    //get the origin name without .jpg
    let baseName = path.basename(fileObject.name, extName)

    let finalName = `${baseName}-${Date.now()}${extName}`
    let finalPath = `${uploadPath}/${finalName}`

    try {
        await fileObject.mv(finalPath)
        return {
            status: "success",
            path: finalName,
            error: null
        }
    } catch (err) {
        return {
            status: "fail",
            error: JSON.stringify(err)
        }
    }
}
const uploadMultipleFile = async (fileArray) => {
    try {

        let uploadPath = path.resolve(__dirname, `../public/images/avatar`)
        let resultArr = []
        let countSuccess = 0
        for (let i = 0; i < fileArray.length; i++) {
            let fileObject = fileArray[i]
            let extName = path.extname(fileObject.name)

            //get the origin name without .jpg
            let baseName = path.basename(fileObject.name, extName)

            let finalName = `${baseName}-${Date.now()}${extName}`
            let finalPath = `${uploadPath}/${finalName}`

            try {
                await fileObject.mv(finalPath)
                resultArr.push({
                    status: "success",
                    path: finalName,
                    fileName: fileObject.name,
                    error: null
                })
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status: "fail",
                    error: JSON.stringify(err)

                })
            }

        }
        return {
            countSuccess: countSuccess,
            detail: resultArr
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports =
{
    uploadSingleFile,
    uploadMultipleFile
}