"use client";
import React from 'react'
import { PlaygroundEditor } from './playground-editor'
import type { TemplateFile } from '@/features/playground/libs/path-to-json'

interface PlaygroundEditorClientProps {
  activeFile?: TemplateFile
  content?: string
}

const PlaygroundEditorClient: React.FC<PlaygroundEditorClientProps> = ({
  activeFile,
  content = "",
}) => {
  return (
    <div className="h-screen">
      <PlaygroundEditor 
        activeFile={activeFile}
        content={content}
        onContentChange={() => {}}
        suggestion={null}
        suggestionLoading={false}
        suggestionPosition={null}
        onAcceptSuggestion={() => {}}
        onRejectSuggestion={() => {}}
        onTriggerSuggestion={async () => {}}
      />
    </div>
  )
}

export default PlaygroundEditorClient
