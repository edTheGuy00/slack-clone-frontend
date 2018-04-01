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

  handleCloseChannelModal = () => {
    this.setState({ opendAddChannelModal: false });
  }

  handleAddChannelClick = () => {
    this.setState({ opendAddChannelModal: true });
  }

  handleInvitePeopleClick = () => {
    this.setState({ openInvitePeopleModal: true });
  }

  handleCloseInvitePeopleModal = () => {
    this.setState({ openInvitePeopleModal: false });
  }

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
        onAddChannelClick={this.handleAddChannelClick}
        onInvitePeopleClick={this.handleInvitePeopleClick}
      />,
      <AddChannelModal
        teamId={team.id}
        onClose={this.handleCloseChannelModal}
        open={opendAddChannelModal}
        key="sidebar-add-channel-modal"
      />,
      <InvitePeopleModal
        teamId={team.id}
        onClose={this.handleCloseInvitePeopleModal}
        open={openInvitePeopleModal}
        key="sidebar-invite-people-modal"
      />,
    ];
  }
}

