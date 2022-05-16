import fetch from 'node-fetch';
export * from './types.js';
const domain = 'https://colornames.org';
export async function latest() {
    const url = new URL('/fresh/json', domain);
    const res = await fetch(url.href);
    const array = await res.json();
    return array;
}
export async function lookup(hex) {
    const url = new URL('/search/json', domain);
    url.searchParams.set('hex', hex);
    const res = await fetch(url.href);
    const info = await res.json();
    return info;
}
export async function random() {
    const url = new URL('/random/json', domain);
    const res = await fetch(url.href);
    const info = await res.json();
    return info;
}
export async function nameCount(name) {
    const url = new URL('/ajax/nameCount/', domain);
    const formData = new URLSearchParams();
    formData.append('proposedName', name);
    const res = await fetch(url.href, {
        method: 'POST',
        body: formData,
    });
    const count = parseInt(await res.text());
    return count;
}
export async function stats() {
    const url = new URL('/ajax/stats.json', domain);
    const res = await fetch(url.href);
    const raw = await res.json();
    const stats = {
        totalColors: raw.colorCount,
        namedColors: raw.nameCount,
        portionNamed: raw.nameCount / raw.colorCount,
    };
    return stats;
}
function createVoter(type) {
    return async function vote(nameID) {
        const url = new URL(`/ajax/${type}/`, domain);
        const formData = new URLSearchParams();
        formData.append('naming', String(nameID));
        const res = await fetch(url.href, {
            method: 'POST',
            headers: {
                referer: domain
            },
            body: formData,
        });
        const result = await res.text();
        switch (result) {
            case 'Success':
                return true;
            case 'Already voted':
                return false;
            case 'Unable to determine color':
                throw new Error(`NameID ${nameID} not found.`);
            case 'Vauge error':
            default:
                throw new Error(`Tried to ${type} nameID ${nameID}, got an error: "${result}"`);
        }
    };
}
export const upvote = createVoter('upvote');
export const downvote = createVoter('downvote');
export const report = createVoter('report');
