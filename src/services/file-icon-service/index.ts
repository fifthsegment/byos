export const fileToIcon = (fileExt: string): string => {
  switch (fileExt) {
    case 'png':
    case 'jpeg':
    case 'jpg':
      return 'image'

    default:
      return 'file'
  }
}
