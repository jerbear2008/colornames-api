import fetch from 'node-fetch'
import type { color, name } from './types.js'
const domain = 'https://colornames.org'


export async function latest() {
  const url = new URL('/fresh/json', domain)
  const res = await fetch(url.href)
  
  const array = await res.json() as Array<name>
  return array
}

export async function lookup(hex: string) {
  const url = new URL('/search/json', domain)
  url.searchParams.set('hex', hex)
  const res = await fetch(url.href)
  
  const info = await res.json() as color
  return info
}

export async function random() {
  const url = new URL('/random/json', domain)
  const res = await fetch(url.href)
  
  const info = await res.json() as color
  return info
}