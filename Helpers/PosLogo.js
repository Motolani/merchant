import RNFS from "react-native-fs";

export default async function PosLogo(imageUrl) {
  try {
    let storagePath = null;

    if (imageUrl) {
      // let imagePath = imageUrl.substr(imageUrl.indexOf("assets"));
      let filename = (result = /[^/]*$/.exec(imageUrl)[0]).trim();
      let filePath = `/sdcard/Download/${filename}`;

      if (await RNFS.exists(filePath)) {
        console.log("file exists");
        return filePath;
      }
      await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: filePath,
      })
        .promise.then((r) => {
          storagePath = filePath;
        })
        .catch((error) => {
          storagePath = null;
          console.log("second", error);
        });

      return storagePath;
    } else {
      return null;
    }
  } catch (error) {
    console.log("first", error);
    return null;
  }
}

