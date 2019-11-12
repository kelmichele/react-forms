// eslint-disable
// this is an auto generated file. This will be overwritten

export const createConference = `mutation CreateConference($input: CreateConferenceInput!) {
  createConference(input: $input) {
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
export const updateConference = `mutation UpdateConference($input: UpdateConferenceInput!) {
  updateConference(input: $input) {
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
export const deleteConference = `mutation DeleteConference($input: DeleteConferenceInput!) {
  deleteConference(input: $input) {
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
export const createPuppy = `mutation CreatePuppy($input: CreatePuppyInput!) {
  createPuppy(input: $input) {
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
export const updatePuppy = `mutation UpdatePuppy($input: UpdatePuppyInput!) {
  updatePuppy(input: $input) {
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
export const deletePuppy = `mutation DeletePuppy($input: DeletePuppyInput!) {
  deletePuppy(input: $input) {
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
