import React from 'react';
import { Button, Input, Form, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import findIndex from 'lodash/findIndex';

import { meQuery } from '../graphql/team';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Modal size="tiny" open={open} onClose={onClose}>
    <Modal.Header>Create a new channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" fluid placeholder="Channel Name" />
        </Form.Field>
        <Form.Group>
          <Button disabled={isSubmitting} fluid onClick={onClose}>Cancel</Button>
          <Button disabled={isSubmitting} onClick={handleSubmit} fluid>Create Channel</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    // Submission handler
    handleSubmit: async (
      values,
      {
        props: { onClose, teamId, mutate },
        setSubmitting,
      },
    ) => {
      await mutate({
        variables: { teamId, name: values.name },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          const data = store.readQuery({ query: meQuery });
          const teamIdx = findIndex(data.me.teams, ['id', teamId]);
          data.me.teams[teamIdx].channels.push(channel);
          store.writeQuery({ query: meQuery, data });
        },
      });
      onClose();
      setSubmitting(false);
    },
  }),
)(AddChannelModal);
