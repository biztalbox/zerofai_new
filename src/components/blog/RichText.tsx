import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import "@/styles/payload-richtext.css";

type Props = {
  data: SerializedEditorState;
  className?: string;
};

export function RichText({ data, className }: Props) {
  return (
    <div className={["payload-richtext", className].filter(Boolean).join(" ")}>
      <RichTextConverter data={data} />
    </div>
  );
}
