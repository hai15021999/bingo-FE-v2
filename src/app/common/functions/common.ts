import { Observable } from "rxjs";

export function djb2Hash(value: string = "") {
    let hash = 5381; // Initial hash value
    for (let i = 0; i < value.length; i++) {
        hash = (hash * 33) ^ value.charCodeAt(i); // Multiply by 33 and XOR with the next character's ASCII value
    }
    return hash >>> 0; // Ensure hash is a 32-bit unsigned integer
}

/**
 * Convert html string to plain text
 * Remove all value of image and link tag
 * @param {string} html html string
 * @returns {string} plain text
 */
export function htmlToPlainText(html: string) {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    const text = dom.body.textContent || "";
    return text;

    // use regex to remove all value of image and link tag
    // const text = html.replace(/<img[^>]*>/g, '').replace(/<a[^>]*>/g, '');
    // return text.replace(/<[^>]*>/g, '');
}
