import DOMPurify from 'dompurify';
import { parse } from "marked";

export async function ReadMarkdown(pathString: string) {
  const response = await fetch(pathString)
  const htmlString = await response.text()

  return DOMPurify.sanitize(await parse(htmlString));
}
