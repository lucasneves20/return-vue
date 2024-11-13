import { ReadMarkdown } from "@/lib/marked"
import type { Ref } from "vue"

export async function parseMarkdown(pureMarkdown: Ref<string>, loading: Ref) {
  loading.value = true
  const markdown = String(await ReadMarkdown(pureMarkdown.value))
  pureMarkdown.value = markdown
  loading.value = false
}
