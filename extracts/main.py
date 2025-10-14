import re
from PyPDF2 import PdfReader

def extract_text_from_pdf(pdf_path, output_txt_path=None):
    """
    Extracts text from a PDF and optionally writes it to a text file in a single line.
    Returns the full text as a single-line string.
    """
    reader = PdfReader(pdf_path)
    text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + " "  # Replace \n with space to maintain sentence separation

    # Collapse all kinds of whitespace (including newlines, tabs) into a single space
    single_line_text = ' '.join(text.split())

    if output_txt_path:
        with open(output_txt_path, "w", encoding="utf-8") as f:
            f.write(single_line_text)

    return single_line_text



def extract_abstract(text):
    """
    Extracts the abstract section from a given text using regex.
    Returns the abstract string, or None if not found.
    """
    abstract_match = re.search(
        r'(?i)\babstract\b[:\s]*(.*?)(?=\n[A-Z][^\n]{0,80}\n|\n\d+\.\s+[A-Z][^\n]+\n)',
        text,
        re.DOTALL
    )

    if abstract_match:
        abstract = abstract_match.group(1).strip()
        print("Abstract:\n", abstract)
        return abstract
    else:
        print("Abstract not found.")
        return None


# === USAGE ===
pdf_path = "s40279-017-0762-7.pdf"
output_txt_path = "../server/src/data/one.text"

# Step 1: Extract text
text = extract_text_from_pdf(pdf_path, output_txt_path)

# Step 2: Extract abstract
abstract = extract_abstract(text)
