import { gql } from '@apollo/client';

export const GL_REQUEST_QUOTE_FORM_BLOCK_FRAGMENT = gql`
  fragment GLRequestQuoteFormBlock on GLRequestQuoteFormBlock {
    systemId
    fields {
      blockTitle
      multiLangEditor
      formFields {
        name
        value
      }
      formReceiverEmail {
        name
        value
      }
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
