import { gql } from '@apollo/client';

export const GL_CONTACT_FORM_BLOCK_FRAGMENT = gql`
  fragment GLContactFormBlock on GLContactFormBlock {
    fields {
      _name
      multiLangEditor
      title
      titleFontColor {
        name
        value
      }
      fontColor
      formFields {
        name
        value
      }
      formReceiverEmail {
        name
        value
      }
      isFullWidth
      backgroundColor {
        name
        value
      }
    }
  }
`;
