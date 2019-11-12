// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateConference = `subscription OnCreateConference {
  onCreateConference {
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
export const onUpdateConference = `subscription OnUpdateConference {
  onUpdateConference {
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
export const onDeleteConference = `subscription OnDeleteConference {
  onDeleteConference {
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
export const onCreatePuppy = `subscription OnCreatePuppy {
  onCreatePuppy {
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
export const onUpdatePuppy = `subscription OnUpdatePuppy {
  onUpdatePuppy {
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
export const onDeletePuppy = `subscription OnDeletePuppy {
  onDeletePuppy {
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
