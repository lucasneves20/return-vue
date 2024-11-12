import { ReadMarkdown } from "@/lib/marked"
import type { Ref } from "vue"

export async function parseMarkdown(pureMarkdown: Ref<any>, loading: Ref) {
  loading.value = true
  const markdown = String(await ReadMarkdown(pureMarkdown.value as any))
  pureMarkdown.value = markdown
  loading.value = false
}
