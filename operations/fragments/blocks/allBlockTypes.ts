import { gql } from '@apollo/client';
import { GL_BRAND_BANNER_BLOCK_FRAGMENT } from './GLBrandBannerBlock';
import { GL_BRAND_LIST_BLOCK_FRAGMENT } from './GLBrandListBlock';
import { GL_CAROUSEL_BANNER_BLOCK_FRAGMENT } from './GLCarouselBannerBlock';
import { GL_CATEGORY_LISTING_BLOCK_FRAGMENT } from './GLCategoryListingBlock';
import { GL_COLUMN_BANNER_BLOCK_FRAGMENT } from './GLColumnBannerBlock';
import { GL_CONTACT_FORM_BLOCK_FRAGMENT } from './GLContactFormBlock';
import { GL_CUSTOMER_REGISTRATION_BLOCK_FRAGMENT } from './GLCustomerRegistrationBlock';
import { GL_EDITOR_BLOCK_FRAGMENT } from './GLEditorBlock';
import { GL_EMPTY_BLOCK_FRAGMENT } from './GLEmptyBlock';
import { GL_FEATURED_PRODUCTS_BANNER_BLOCK_FRAGMENT } from './GLFeaturedProductsBannerBlock';
import { GL_FULL_WIDTH_BANNER_BLOCK_FRAGMENT } from './GLFullWidthBannerBlock';
import { GL_GRID_BANNER_BLOCK_FRAGMENT } from './GLGridBannerBlock';
import { GL_HERO_BANNER_BLOCK_FRAGMENT } from './GLHeroBannerBlock';
import { GL_LINK_LISTING_BLOCK_FRAGMENT } from './GLLinkListingBlock';
import { GL_MONO_BANNER_BLOCK_FRAGMENT } from './GLMonoBannerBlock';
import { GL_PRODUCT_CATEGORY_BLOCK_FRAGMENT } from './GLProductCategoryBlock';
import { GL_PRODUCT_LISTING_BLOCK_FRAGMENT } from './GLProductListingBlock';
import { GL_REQUEST_QUOTE_FORM_BLOCK_FRAGMENT } from './GLRequestQuoteFormBlock';
import { GL_TESTIMONIALS_BLOCK_FRAGMENT } from './GLTestimonialsBlock';
import { GL_TEXT_BLOCK_FRAGMENT } from './GLTextBlock';
import { PRODUCTS_BLOCK_FRAGMENT } from './product';

export const ALL_BLOCK_TYPES_FRAGMENT = gql`
  fragment AllBlockTypes on IBlock {
    __typename
    ... on IBlockItem {
      systemId
    }

    ...BannerBlock
    ...ProductsBlock
    ...GLTextBlock
    ...GLEmptyBlock
    ...GLColumnBannerBlock
    ...GLFeaturedProductsBannerBlock
    ...GLMonoBannerBlock
    ...GLHeroBannerBlock
    ...GLGridBannerBlock
    ...GLFullWidthBannerBlock
    ...GLRequestQuoteFormBlock
    ...GLContactFormBlock
    ...GLCustomerRegistrationBlock
    ...GLEditorBlock
    ...GLProductCategoryBlock
    ...GLProductListingBlock
    ...GLBrandListBlock
    ...GLCarouselBannerBlock
    ...GLBrandBannerBlock
    ...GLCategoryListingBlock
    ...GLLinkListingBlock
    ...GLTestimonialsBlock
  }

  ${PRODUCTS_BLOCK_FRAGMENT}
${GL_TEXT_BLOCK_FRAGMENT}
${GL_EMPTY_BLOCK_FRAGMENT}
${GL_COLUMN_BANNER_BLOCK_FRAGMENT}
${GL_FEATURED_PRODUCTS_BANNER_BLOCK_FRAGMENT}
${GL_MONO_BANNER_BLOCK_FRAGMENT}
${GL_HERO_BANNER_BLOCK_FRAGMENT}
${GL_GRID_BANNER_BLOCK_FRAGMENT}
${GL_FULL_WIDTH_BANNER_BLOCK_FRAGMENT}
${GL_REQUEST_QUOTE_FORM_BLOCK_FRAGMENT}
${GL_CONTACT_FORM_BLOCK_FRAGMENT}
${GL_CUSTOMER_REGISTRATION_BLOCK_FRAGMENT}
${GL_EDITOR_BLOCK_FRAGMENT}
${GL_PRODUCT_CATEGORY_BLOCK_FRAGMENT}
${GL_PRODUCT_LISTING_BLOCK_FRAGMENT}
${GL_BRAND_LIST_BLOCK_FRAGMENT}
${GL_CAROUSEL_BANNER_BLOCK_FRAGMENT}
${GL_BRAND_BANNER_BLOCK_FRAGMENT}
${GL_CATEGORY_LISTING_BLOCK_FRAGMENT}
${GL_LINK_LISTING_BLOCK_FRAGMENT}
${GL_TESTIMONIALS_BLOCK_FRAGMENT}
`;
