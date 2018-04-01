import gql from 'graphql-tag';

export const allTeamQuery = gql`
  {
    allTeams{
    id
    owner
    name
    channels {
        id
        name
      }
    }
    teamInvites{
      id
      owner
      name
      channels {
          id
          name
        }
      }
  }
`;

export const idk = {};
