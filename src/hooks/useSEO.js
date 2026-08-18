import { useEffect } from 'react';

const SITE_URL = 'https://loyalstudio.in';
const SITE_NAME = 'Loyal Studio';
const DEFAULT_IMAGE = `${SITE_URL}/logo-240.webp`;

function setMetaByName(name, content) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

function setCanonical(href) {
    let tag = document.querySelector('link[rel="canonical"]');
    if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', 'canonical');
        document.head.appendChild(tag);
    }
    tag.setAttribute('href', href);
}

/**
 * Updates document title, meta description, canonical URL, and Open
 * Graph/Twitter tags for the current route. Runs on mount and whenever
 * inputs change, so each page overwrites the previous page's tags.
 */
export function useSEO({ title, description, path = '/', image = DEFAULT_IMAGE }) {
    useEffect(() => {
        const fullTitle = title || SITE_NAME;
        const url = `${SITE_URL}${path}`;

        document.title = fullTitle;

        setMetaByName('description', description);
        setCanonical(url);

        setMetaByProperty('og:title', fullTitle);
        setMetaByProperty('og:description', description);
        setMetaByProperty('og:url', url);
        setMetaByProperty('og:image', image);
        setMetaByProperty('og:type', 'website');
        setMetaByProperty('og:site_name', SITE_NAME);

        setMetaByName('twitter:card', 'summary_large_image');
        setMetaByName('twitter:title', fullTitle);
        setMetaByName('twitter:description', description);
        setMetaByName('twitter:image', image);
    }, [title, description, path, image]);
}
