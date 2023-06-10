/* eslint-disable @typescript-eslint/ban-ts-comment */
import contentful from 'contentful'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
})

export type contentType = 'service' | 'person'

export interface ContentfulItem {
  name: string
  content: Array<{ fieldName: string; fieldValue: string | undefined }>
}

export const getContentType = async (name: contentType) => await contentfulClient.getContentType(name)

const getSelectFields = (type: contentType) => {
  if (type === 'service') {
    return ['name', 'avatar', 'farbe', 'benutzerfreundlicherTitel', 'kurzbeschreibung', 'telefonnummer', 'ansprechpartner', 'stichworte', 'faq', 'linkZumService']
  }
  if (type === 'person') {
    return ['vorname', 'nachname', 'telefonnummer', 'schlagworte', 'organisationseinheitOe', 'ttigkeitfunktion']
  }
  return []
}

export const getContentfulEntries = async (type: contentType, limit: number): Promise<ContentfulItem[]> => {
  const response = await contentfulClient.getEntries({
    content_type: type,
    limit,
    // @ts-ignore
    select: getSelectFields(type)?.map(field => `fields.${field}`).join(',')
  })
  console.log(JSON.stringify(response.items, null, 2))
  return response.items.map((entry) => ({
    // @ts-expect-error wrong type
    name: entry.fields.name?.toString() ?? documentToPlainTextString(entry.fields.name),
    content: Object.keys(entry.fields).map((key) => ({
      fieldName: key,
      // @ts-expect-error wrong type
      fieldValue: documentToPlainTextString(entry.fields[key]).length > 0 ? documentToPlainTextString(entry.fields[key]) : entry.fields[key]?.toString(),
    })),
  }))
}
export const getContentfulEntryString = (entry: ContentfulItem) => {
  return JSON.stringify(entry, null, 2)
}
