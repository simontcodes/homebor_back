// This function takes a string and converts it into a URL-friendly slug.
export function slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')  // remove special chars
      .replace(/\s+/g, '-')          // replace spaces with dashes
      .replace(/-+/g, '-');          // collapse multiple dashes
  }
  