import fetch from 'node-fetch';
import * as types from './types.js';
export * from './types.js';
const domain = 'https://colornames.org';
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
export async function latest() {
    const url = new URL('/fresh/json', domain);
    const res = await fetch(url.href);
    const rawArray = await res.json();
    const array = rawArray.map(obj => {
        return {
            hexCode: obj.hexCode,
            name: obj.name,
            nameID: obj.nameId,
        };
    });
    return array;
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
    return async function vote(name) {
        if (typeof name === 'object')
            name = name.nameID;
        const url = new URL(`/ajax/${type}/`, domain);
        const formData = new URLSearchParams();
        formData.append('naming', String(name));
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
                throw new Error(`NameID ${name} not found.`);
            case 'Vauge error':
            default:
                throw new Error(`Tried to ${type} nameID ${name}, got an error: "${result}"`);
        }
    };
}
export const upvote = createVoter('upvote');
export const downvote = createVoter('downvote');
export const report = createVoter('report');
export default {
    lookup,
    random,
    latest,
    nameCount,
    stats,
    upvote,
    downvote,
    report,
    ...types,
};
