import React from 'react';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

export default class Sidebar extends React.Component {
  state = {
    opendAddChannelModal: false,
    openInvitePeopleModal: false,
  }

  toggleAddChanneModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({ opendAddChannelModal: !state.opendAddChannelModal }));
  };

  toggleInvitePeopleModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({ openInvitePeopleModal: !state.openInvitePeopleModal }));
  };

  render() {
    const { teams, team } = this.props;

    const { opendAddChannelModal, openInvitePeopleModal } = this.state;

    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      // eslint-disable-next-line prefer-destructuring
      username = user.username;
    } catch (error) {
      console.log(error);
    }

    return [
      <Teams
        key="team-sidebar"
        teams={teams}
      />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        onAddChannelClick={this.toggleAddChanneModal}
        onInvitePeopleClick={this.toggleInvitePeopleModal}
      />,
      <AddChannelModal
        teamId={team.id}
        onClose={this.toggleAddChanneModal}
        open={opendAddChannelModal}
        key="sidebar-add-channel-modal"
      />,
      <InvitePeopleModal
        teamId={team.id}
        onClose={this.toggleInvitePeopleModal}
        open={openInvitePeopleModal}
        key="sidebar-invite-people-modal"
      />,
    ];
  }
}

