"use client"

import type { TemplateFolder } from "@/features/playground/libs/path-to-json"
import type { OpenFile } from "@/features/playground/types"

const noop = async () => {}
const noopSetBoolean: (value: boolean) => void = () => {}

export function usePlayground() {
  const templateData: TemplateFolder = {
    folderName: "Root",
    items: [],
  }

  return {
    playgroundData: null as { name?: string } | null,
    activeFileId: null as string | null,
    openFiles: [] as OpenFile[],
    handleSave: noop,
    handleSaveAll: noop,
    isAISuggestionsEnabled: false,
    setIsAISuggestionsEnabled: noopSetBoolean,
    setIsPreviewVisible: noopSetBoolean,
    setIsTerminalVisible: noopSetBoolean,
    isPreviewVisible: true,
    isTerminalVisible: false,
    error: null as string | null,
    loadingStep: 3,
    templateData,
    fetchPlaygroundData: noop,
  }
}
