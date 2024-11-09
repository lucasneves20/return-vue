import { ReadMarkdown } from "@/lib/marked"
import type { Ref } from "vue"

export async function getMarkdown(markdown: Ref, loading: Ref) {
  loading.value = true
  markdown.value = String(await ReadMarkdown('/markdowns/test.md'))
  loading.value = false

  console.log(markdown.value)
}
