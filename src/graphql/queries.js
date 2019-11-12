// eslint-disable
// this is an auto generated file. This will be overwritten

export const getConference = `query GetConference($id: ID!) {
  getConference(id: $id) {
    id
    title
    category
    date
    summary
    image {
      bucket
      region
      key
    }
    video
    description
    link
  }
}
`;
export const listConferences = `query ListConferences(
  $filter: ModelConferenceFilterInput
  $limit: Int
  $nextToken: String
) {
  listConferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      category
      date
      summary
      image {
        bucket
        region
        key
      }
      video
      description
      link
    }
    nextToken
  }
}
`;
export const getPuppy = `query GetPuppy($id: ID!) {
  getPuppy(id: $id) {
    id
    name
    image {
      bucket
      region
      key
    }
    description
    fact
    video
  }
}
`;
export const listPuppys = `query ListPuppys(
  $filter: ModelPuppyFilterInput
  $limit: Int
  $nextToken: String
) {
  listPuppys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      image {
        bucket
        region
        key
      }
      description
      fact
      video
    }
    nextToken
  }
}
`;
