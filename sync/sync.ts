/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import { getContentType, getContentfulEntries, getContentfulEntryString } from "./contentful.ts";
// @ts-ignore
import { getKeywords, getServiceSummary } from "./chatGPT.ts";
// @ts-ignore
import { ensureSchema, upsertDocument } from "./typesense.ts";
import { FieldType } from "typesense/lib/Typesense/Collection";

const ITEM_LIMIT =100;
const contentfulServices = await getContentfulEntries('service', ITEM_LIMIT)
const contentfulPersons = await getContentfulEntries('person', ITEM_LIMIT)

const serviceContentTypeFields = (await getContentType('service')).fields.map(field => ({
  name: field.name.toLowerCase(),
  type: 'string' as FieldType,
  facet: false,
  optional:true
}))

const personContentTypeFields = (await getContentType('person')).fields.map(field => ({
  name: field.name.toLowerCase(),
  type: 'string' as FieldType,
  facet: false,
  optional:true
}))

await ensureSchema('service', [
  ...serviceContentTypeFields, {
    name: 'summary',
    facet: true,
    type: 'string',
    optional:true
  }, {
    name: 'keywords',
    facet: true,
    type: 'string[]',
    optional:true
  }])

  await ensureSchema('person', [
    ...personContentTypeFields])

contentfulServices.forEach(async entry => {
  //console.log(JSON.stringify(entry, null, 2))
  const entryAsString = getContentfulEntryString(entry)
  const keywords = await getKeywords(entryAsString)
  const summary = await getServiceSummary(entryAsString)
  const indexDocument: Record<string, string | string[]> = {
    name: entry.name,
  }
  entry.content.forEach(field => {
    if (field.fieldValue && field.fieldValue.length > 0) {
      indexDocument[field.fieldName.toLowerCase()] = field.fieldValue
    }
  })
  if (summary) {
    indexDocument['summary'] = summary
  }
  if (keywords) {
    indexDocument['keywords'] = keywords
  }
  await upsertDocument('service', indexDocument)
  //console.log(entry.name, JSON.stringify(indexDocument, null, 2))
})

contentfulPersons.forEach(async entry => {
  //console.log(JSON.stringify(entry, null, 2))
  const indexDocument: Record<string, string | string[]> = {
    name: entry.name,
  }
  entry.content.forEach(field => {
    if (field.fieldValue && field.fieldValue.length > 0) {
      indexDocument[field.fieldName.toLowerCase()] = field.fieldValue
    }
  })
  console.log(indexDocument)
  await upsertDocument('person', indexDocument)
  //console.log(entry.name, JSON.stringify(indexDocument, null, 2))
})

console.log(`found ${contentfulServices.length} service documents`)
console.log(`found ${contentfulPersons.length} person documents`)