import { encode } from 'base64-arraybuffer'
import axios from 'axios'

/**
 * Fetches a file and returns it as an encoded Array64 string
 * @param {string} url - link to the file
 */
export const getBase64 = async (url: string) => {
  const getItem = await axios.get(url, {
    responseType: 'arraybuffer',
  })

  return encode(getItem.data)
}
