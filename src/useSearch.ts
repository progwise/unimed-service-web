import { useEffect, useState } from 'react'
import { Client } from 'typesense'

console.log(process.env)
const clientConfig = {
  nodes: [
    {
      host: process.env['FGE_TYPESENSE_API_HOST'] ?? 'localhost',
      port: parseInt(process.env['FGE_TYPESENSE_API_HOST'] ?? '8108'),
      protocol: process.env['FGE_TYPESENSE_API_PROTOCOL'] ?? 'http',
    },
  ],
  apiKey: process.env['FGE_TYPESENSE_API_KEY'] ?? 'xyz',
}
const client = new Client(clientConfig)

export interface UseSearchResult {
  fetching: boolean
  result: Array<Record<string, string>>
}

const getSearchParams = (catalog: 'service' | 'person', term: string) => {
  const baseParams = {
    q: `${term.length > 0 ? term : '*'}`,
    query_by: 'name',
    sort_by: '_text_match:asc',
    include_fields: 'summary',
    page: '1',
    per_page: 4
  }

  if (catalog === 'service') {
    return {
      ...baseParams,
      query_by: 'name, keywords, summary, stichworte, kurzbeschreibung, ansprechpartner, stichworte, keywords, faq, email, telefonnummer',
      include_fields: 'name, summary, keywords, stichworte, kurzbeschreibung, ansprechpartner, "link zum service", faq, avatar, telefonnummer',
    }
  } else if (catalog === 'person') {
    return { ...baseParams, query_by: 'vorname, nachname, telefonnummer, schlagworte', include_fields: 'vorname, nachname, telefonnummer, schlagworte' }
  }
  return baseParams
}

export const useSearch = (catalog: 'service' | 'person', term: string): UseSearchResult => {
  const [fetching, setFetching] = useState(false)
  const [result, setResult] = useState<Array<any>>([])

  useEffect(() => {
    setFetching(true)
    client
      .collections(catalog)
      .documents()
      .search(getSearchParams(catalog, term))
      .then((result) => {
        // console.log(result)
        if (result.hits) {
          setResult(result.hits.map((hit) => hit.document))
        }
      })
      .finally(() => setFetching(false))
  }, [catalog, term])

  return {
    fetching,
    result,
  }
}
