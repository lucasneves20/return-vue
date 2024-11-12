import DOMPurify from 'dompurify';
import { parse } from "marked";

export async function ReadMarkdown(markdown: string) {
  return DOMPurify.sanitize(await parse(markdown));
}
