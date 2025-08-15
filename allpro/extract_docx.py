import docx

def extract_text_from_docx(file_path):
    try:
        doc = docx.Document(file_path)
        text_content = []
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                text_content.append(paragraph.text)
        return '\n'.join(text_content)
    except Exception as e:
        return f"Error reading document: {str(e)}"

if __name__ == "__main__":
    content = extract_text_from_docx('business-plan-1.docx')
    print(content) 