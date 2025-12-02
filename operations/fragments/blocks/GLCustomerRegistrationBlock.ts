import { gql } from '@apollo/client';

export const GL_CUSTOMER_REGISTRATION_BLOCK_FRAGMENT = gql`
  fragment GLCustomerRegistrationBlock on GLCustomerRegistrationBlock {
    systemId
    fields {
      _name
      blockTitle
      multiLangEditor
      customerRegistrationFields {
        name
        value
      }
      formReceiverEmail {
        name
        value
      }
      termsPageUrl {
        item {
          url
          id
        }
      }
      privacyPageUrl {
        item {
          url
          id
        }
      }
      successMessage
      titleFontColor {
        name
        value
      }
      fontColor
      backgroundColor {
        name
        value
      }
      isFullWidth
    }
  }
`;
