interface Props {
  fullText: string;
  textToHighlight: string;
}

const HighlightText: React.FC<Props> = ({ fullText, textToHighlight }) => {
  const textArray = fullText.split(new RegExp(`(${textToHighlight})`, "i"));

  return (
    <>
      {textArray.map((text, i) =>
        text?.toLowerCase() === textToHighlight?.toLowerCase() ? (
          <span key={i} className="text-primary">
            {text}
          </span>
        ) : (
          text
        )
      )}
    </>
  );
};

export default HighlightText;
