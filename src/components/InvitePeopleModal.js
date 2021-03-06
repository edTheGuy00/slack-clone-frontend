import React from 'react';
import { Button, Input, Form, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import normalizeErrors from '../normalizeErrors';

const InvitePeopleModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors,
}) => (
  <Modal size="tiny" open={open} onClose={onClose}>
    <Modal.Header>Add a new team member</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input value={values.email} onChange={handleChange} onBlur={handleBlur} name="email" fluid placeholder="User Email" />
        </Form.Field>
        {touched.email && errors.email ? errors.email[0] : null}
        <Form.Group>
          <Button disabled={isSubmitting} fluid onClick={onClose}>Cancel</Button>
          <Button disabled={isSubmitting} onClick={handleSubmit} fluid>Add User</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    // Submission handler
    handleSubmit: async (
      values,
      {
        props: { onClose, teamId, mutate },
        setSubmitting,
        setErrors,
      },
    ) => {
      const response = await mutate({
        variables: { teamId, email: values.email },
      });
      const { ok, errors } = response.data.addTeamMember;
      if (ok) {
        onClose();
        setSubmitting(false);
      } else {
        setSubmitting(false);
        setErrors(normalizeErrors(errors));
      }
    },
  }),
)(InvitePeopleModal);
