import React from 'react';
import { Button, Input, Form, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
    createChannel(teamId: $teamId, name: $name)
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
      const response = await mutate({ variables: { teamId, name: values.name } });
      console.log(response);
      onClose();
      setSubmitting(false);
    },
  }),
)(AddChannelModal);
