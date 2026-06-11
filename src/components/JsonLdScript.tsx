type JsonLdScriptProps = {
  schemaJson?: string;
};

export function JsonLdScript({ schemaJson }: JsonLdScriptProps) {
  if (!schemaJson?.trim()) return null;

  try {
    const parsed = JSON.parse(schemaJson);
    const json = JSON.stringify(parsed);
    return (
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
    );
  } catch {
    return null;
  }
}
