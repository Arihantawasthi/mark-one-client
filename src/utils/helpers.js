export function validateNewsletterUrl(input) {
    try {
        const url = new URL(input);

        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return { valid: false, message: "URL must start with http:// or https://" };
        }

        const host = url.hostname.toLowerCase();

        const isSubstack = host.endsWith("substack.com");
        const isBeehiiv = host.endsWith("beehiiv.com");

        if (!isSubstack && !isBeehiiv) {
            return { valid: false, message: "URL must be a Substack or Beehiiv newsletter link." };
        }

        const parts = host.split(".");
        if (parts.length < 3) {
            return { valid: false, message: "URL must point to a specific newsletter." };
        }

        return { valid: true, message: "Valid newsletter URL." };

    } catch (e) {
        return { valid: false, message: "Invalid URL format." };
    }
}
