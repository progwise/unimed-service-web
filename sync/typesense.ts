import { Client } from 'typesense'
import { FieldType } from 'typesense/lib/Typesense/Collection';
const client = new Client({
  nodes: [
    {
      host: process.env.FGE_TYPESENSE_API_HOST ?? '',
      port: Number.parseInt(process.env.FGE_TYPESENSE_API_PORT ?? '0'),
      protocol: process.env.FGE_TYPESENSE_API_PROTOCOL ?? '',
    },
  ],
  apiKey: process.env.FGE_TYPESENSE_API_KEY ?? '',
})

console.log(process.env)

export const ensureSchema = async (name: string, fields: Array<{ name: string; type: FieldType; facet: boolean}>) => {
  name = name.toLowerCase()
  fields = fields.map(field => ({...field, name: field.name.toLowerCase()}))
  const exists = await client.collections(name).exists()
  if (exists) {
    await client.collections(name).delete()
  }

  await client.collections().create({name, fields})
}

export const createSchema = async (name: string, fields: Array<{ name: string; type: FieldType; facet: boolean}>) => {
  await client.collections().create({name, fields})
}

export const upsertDocument = async (schemaName: string, item: Record<string, string | string[]>) => {
  
  await client.collections(schemaName).documents().upsert(item)
}

// const upsertCollection = async (
//   name: string,
//   schemaFields: Array<{ name: string; type: FieldType; facet: boolean}>,
//   data: Array<Record<string, string>>
// ) => {
//   const schema = {name, fields: schemaFields}
//   // const exists = await client.collections(name).exists()
//   // if (exists) {
//   //   await client.collections(name).delete()
//   // }
//   await client.collections().create(schema)

//   const upsertPromises = data.map(document => client.collections(name).documents().upsert(document))
//   await upsertPromises
// }

// await upsertCollection('test1', [
//   {
//     name: 'name',
//     facet: true,
//     type: 'string'
//   },],
//   [
//     {
//       name: 'test1',
//     }
//   ]
// )